/**
 * ChatAssistant.jsx
 * Assistente de IA de História — widget independente
 * Integrado com Google Gemini 2.0 Flash
 */
import React, {
  useState, useRef, useEffect, useCallback
} from 'react';
import DOMPurify from 'dompurify';

/* ─── Config ─── */
// O site agora usa um proxy seguro em /api/chat para esconder a chave.


const SYSTEM_PROMPT = `Você é um assistente educacional especializado em História para estudantes de 11 a 17 anos. Siga estas regras sempre:
- Responda EXCLUSIVAMENTE em português brasileiro.
- Use linguagem simples, clara e didática. Evite termos difíceis sem explicar o significado.
- Seja organizado: use parágrafos curtos, listas quando útil e destaque datas importantes em negrito.
- Suas especialidades são: História do Brasil e História Geral (Antiga, Medieval, Moderna e Contemporânea).
- Respostas padrão: máximo 250 palavras. Resumos: máximo 120 palavras. Explicações simples: como se o aluno tivesse 10 anos.
- Se o usuário pedir "Resumir", faça um resumo bem curto do que foi explicado.
- Se pedir "Explicar simples", reexplique com palavras de criança e uma analogia do dia a dia.
- Se pedir "Gerar quiz", crie 3 perguntas de múltipla escolha (A, B, C, D) com a resposta correta no final.
- Se pedir "Dar exemplo", dê um exemplo prático, concreto e atual que ilustre o conceito.
- Se a pergunta não for sobre história, diga educadamente que só pode ajudar com história.
- Nunca invente fatos. Se não souber, diga claramente.`;

const SUGGESTIONS = [
  'O que foi a Revolução Francesa?',
  'Quem foi Dom Pedro I?',
  'O que foi a Segunda Guerra Mundial?',
  'O que foi a Revolução Industrial?',
  'O que foi a escravidão no Brasil?',
  'O que foi a Ditadura Militar brasileira?',
];

const QUICK_ACTIONS = [
  { label: '📝 Resumir',         prompt: 'Agora faça um resumo bem curto do que acabou de explicar.' },
  { label: '👶 Explicar simples', prompt: 'Explique o mesmo assunto de forma bem simples, como se eu tivesse 10 anos, usando uma analogia do dia a dia.' },
  { label: '🎯 Gerar quiz',       prompt: 'Crie 3 perguntas de múltipla escolha (A, B, C, D) sobre o que acabou de explicar, com as respostas corretas no final.' },
  { label: '💡 Dar exemplo',      prompt: 'Dê um exemplo prático e concreto que ajude a entender melhor o que foi explicado.' },
];

/* ─── Dots animation ─── */
function TypingDots() {
  return (
    <span className="ai-typing-dots">
      <span />
      <span />
      <span />
    </span>
  );
}

/* ─── Single message bubble ─── */
function Message({ msg, onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
    onCopy?.();
  };

  if (msg.typing) {
    return (
      <div className="ai-msg ai-msg--bot">
        <div className="ai-bubble ai-bubble--bot">
          <TypingDots />
        </div>
      </div>
    );
  }

  return (
    <div className={`ai-msg ai-msg--${msg.role}`}>
      <div className={`ai-bubble ai-bubble--${msg.role}`}>
        {/* render simple markdown: **bold** and newlines */}
        <span dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
        {msg.role === 'bot' && (
          <button
            className="ai-copy-btn"
            onClick={handleCopy}
            title="Copiar resposta"
          >
            {copied ? '✓ Copiado' : '📋 Copiar'}
          </button>
        )}
      </div>
    </div>
  );
}

function formatText(text) {
  const raw = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
  return DOMPurify.sanitize(raw, {
    ALLOWED_TAGS: ['strong', 'em', 'br'],
    ALLOWED_ATTR: [],
  });
}

/* ─── Main ChatAssistant component ─── */
export default function ChatAssistant() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([]);   // { id, role:'user'|'bot', text, typing? }
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showSuggs, setShowSuggs] = useState(true);
  const [lastBotIdx, setLastBotIdx] = useState(-1);  // index of last bot msg for quick actions

  const bodyRef        = useRef(null);
  const inputRef       = useRef(null);
  const historyRef     = useRef([]);  // conversation history
  const lastSendTime   = useRef(0);   // rate limiting
  const messageCount   = useRef(0);   // session message cap

  const MAX_INPUT_LENGTH  = 500;   // max chars per message
  const MIN_SEND_INTERVAL = 2000;  // ms between messages
  const MAX_SESSION_MSGS  = 50;    // max messages per session
  const MAX_DISPLAY_MSGS  = 100;   // max messages kept in UI

  /* auto-scroll */
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  /* focus input when opening */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  /* welcome message on first open */
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'bot',
        text: 'Olá! 👋 Sou seu **Assistente de História**. Pode me perguntar sobre história do Brasil, história geral, guerras, revoluções, personalidades históricas e muito mais!\n\nComo posso te ajudar hoje?',
      }]);
    }
  }, [open]);

  /* ─── Call Proxy API (Groq) ─── */
  const callAI = useCallback(async (userText) => {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...historyRef.current,
      { role: 'user', content: userText }
    ];

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Erro HTTP ${res.status}`);
    }

    const data = await res.json();
    const answer = data?.choices?.[0]?.message?.content;

    if (!answer || answer.trim().length === 0) {
      throw new Error('A IA retornou uma resposta vazia. Tente novamente.');
    }

    // persist history for multi-turn (OpenAI format)
    historyRef.current = [
      ...historyRef.current,
      { role: 'user',  content: userText },
      { role: 'assistant', content: answer }
    ];

    // keep history bounded (last 20 turns)
    if (historyRef.current.length > 20) {
      historyRef.current = historyRef.current.slice(-20);
    }

    return answer;
  }, []);

  /* ─── Send message ─── */
  const send = useCallback(async (text) => {
    let trimmed = text.trim();
    if (!trimmed || loading) return;

    // ── Rate limiting ──
    const now = Date.now();
    if (now - lastSendTime.current < MIN_SEND_INTERVAL) return;

    // ── Session message cap ──
    if (messageCount.current >= MAX_SESSION_MSGS) {
      setMessages(prev => [
        ...prev,
        { id: `sys-${now}`, role: 'bot', text: '⚠️ **Limite de mensagens atingido.** Recarregue a página para iniciar uma nova sessão.' },
      ]);
      return;
    }

    // ── Input length cap ──
    if (trimmed.length > MAX_INPUT_LENGTH) {
      trimmed = trimmed.slice(0, MAX_INPUT_LENGTH);
    }

    lastSendTime.current = now;
    messageCount.current += 1;

    setShowSuggs(false);
    setInput('');

    const userId = `u-${now}`;
    const botId  = `b-${now}`;

    // add user msg + typing placeholder, bound total display messages
    setMessages(prev => {
      const updated = [
        ...prev,
        { id: userId, role: 'user', text: trimmed },
        { id: botId,  role: 'bot',  text: '',  typing: true },
      ];
      return updated.length > MAX_DISPLAY_MSGS ? updated.slice(-MAX_DISPLAY_MSGS) : updated;
    });
    setLoading(true);

    try {
      const answer = await callAI(trimmed);
      setMessages(prev =>
        prev.map(m => m.id === botId
          ? { ...m, text: answer, typing: false }
          : m
        )
      );
      setLastBotIdx(prev => prev + 1);  // trigger quick actions refresh
    } catch (err) {
      setMessages(prev =>
        prev.map(m => m.id === botId
          ? { ...m, text: `❌ Erro ao conectar com a IA: **${err.message}**\n\nVerifique sua chave de API e conexão com a internet.`, typing: false }
          : m
        )
      );
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [loading, callAI]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const handleQuick = (action) => send(action.prompt);
  const handleSugg  = (s)      => send(s);

  /* ─── Last bot message index for quick-actions ─── */
  const lastBotMsgIdx = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'bot' && !messages[i].typing) return i;
    }
    return -1;
  })();

  return (
    <>
      {/* ── Floating button ── */}
      <button
        id="ai-chat-fab"
        className={`ai-fab ${open ? 'ai-fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Abrir assistente de história"
        title="Assistente de História com IA"
      >
        <span className="ai-fab-icon">{open ? '✕' : '🎓'}</span>
        {!open && <span className="ai-fab-pulse" />}
      </button>

      {/* ── Chat window ── */}
      <div className={`ai-window ${open ? 'ai-window--open' : ''}`} role="dialog" aria-label="Assistente de História">

        {/* Header */}
        <div className="ai-header">
          <div className="ai-header-left">
            <span className="ai-header-icon">🎓</span>
            <div>
              <div className="ai-header-title">Assistente de História</div>
              <div className="ai-header-sub">
                <span className={`ai-status-dot ${loading ? 'ai-status-dot--busy' : ''}`} />
                {loading ? 'Digitando…' : 'Online · IA ativa'}
              </div>
            </div>
          </div>
          <button
            className="ai-header-close"
            onClick={() => setOpen(false)}
            aria-label="Fechar chat"
          >✕</button>
        </div>

        {/* Messages area */}
        <div className="ai-body" ref={bodyRef}>

          {messages.map((msg, i) => (
            <React.Fragment key={msg.id}>
              <Message msg={msg} />

              {/* Quick actions after the LAST bot message */}
              {msg.role === 'bot' && !msg.typing && i === lastBotMsgIdx && i > 0 && (
                <div className="ai-quick-actions">
                  {QUICK_ACTIONS.map(a => (
                    <button
                      key={a.label}
                      className="ai-quick-btn"
                      onClick={() => handleQuick(a)}
                      disabled={loading}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Suggestions (only before first user message) */}
          {showSuggs && messages.length <= 1 && (
            <div className="ai-suggestions">
              <p className="ai-suggestions-label">💡 Sugestões de perguntas:</p>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  className="ai-sugg-btn"
                  onClick={() => handleSugg(s)}
                  disabled={loading}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="ai-footer">
          <textarea
            ref={inputRef}
            id="ai-chat-input"
            className="ai-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Digite sua pergunta de história…"
            rows={1}
            maxLength={MAX_INPUT_LENGTH}
            disabled={loading}
          />
          <button
            id="ai-send-btn"
            className={`ai-send-btn ${loading ? 'ai-send-btn--loading' : ''}`}
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            aria-label="Enviar mensagem"
          >
            {loading ? <span className="ai-spin">⟳</span> : '➤'}
          </button>
        </div>

        {/* Footer note */}
        <div className="ai-disclaimer">
          Powered by Google Gemini 1.5 Flash · Respostas podem conter erros — sempre verifique
        </div>
      </div>
    </>
  );
}
