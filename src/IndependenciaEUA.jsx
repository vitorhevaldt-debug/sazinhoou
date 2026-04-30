import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import { indQuestionBank, indTimelineNodes, indGlossaryTerms } from './dataIndependencia.jsx';
import Reveal from './Reveal.jsx';

/* ─── helpers ─── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function IndependenciaEUA() {
  const [quizState, setQuizState] = useState('idle');
  const [session, setSession]     = useState([]);
  const [qIdx, setQIdx]           = useState(0);
  const [score, setScore]         = useState(0);
  const [selected, setSelected]   = useState(null);
  const [checked, setChecked]     = useState(false);
  const [quizOpen, setQuizOpen]   = useState(false);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const startQuiz = () => {
    setSession(shuffle(indQuestionBank).slice(0, 5));
    setQIdx(0); setScore(0); setSelected(null); setChecked(false);
    setQuizState('playing'); setQuizOpen(true);
  };

  const pick = (idx) => {
    if (checked) return;
    setSelected(idx); setChecked(true);
    if (idx === session[qIdx].correct) setScore(s => s + 1);
  };

  const next = () => {
    if (qIdx < 4) { setQIdx(q => q + 1); setSelected(null); setChecked(false); }
    else setQuizState('finished');
  };

  const optClass = (idx) => {
    if (!checked) return 'quiz-option';
    if (idx === session[qIdx].correct) return 'quiz-option correct';
    if (idx === selected) return 'quiz-option wrong';
    return 'quiz-option';
  };

  const btnOutline = {
    fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600,
    letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream)',
    background: 'transparent', border: '1px solid rgba(201,168,76,0.5)',
    padding: '0.95rem 2.25rem', borderRadius: '2px', cursor: 'pointer', transition: 'all 0.25s ease',
  };
  const btnSolid = {
    ...btnOutline,
    color: 'var(--bg-deep)',
    background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
    border: '1px solid var(--gold)',
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <Crown size={58} className="hero-crown fade-up" style={{color:'var(--gold)'}} fill="var(--gold)" />
        <div className="hero-divider fade-up-d1" />
        <h1 className="fade-up-d1" style={{fontFamily:'var(--font-title)',fontSize:'clamp(3rem,8vw,7rem)',fontWeight:700,color:'var(--cream)',letterSpacing:'0.06em',lineHeight:1.05,marginBottom:'1rem'}}>
          Independência<br/>dos EUA
        </h1>
        <p className="fade-up-d2" style={{fontFamily:'var(--font-serif)',fontStyle:'italic',fontSize:'clamp(1.1rem,2.5vw,1.5rem)',color:'var(--cream-dim)',maxWidth:'520px',marginBottom:'3rem'}}>
          Da colônia à nação — como 13 colônias desafiaram um império e fundaram um país livre.
        </p>
        <div className="fade-up-d3" style={{display:'flex',gap:'1rem',flexWrap:'wrap',justifyContent:'center'}}>
          <button style={btnOutline}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold-light)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(201,168,76,0.5)';e.currentTarget.style.color='var(--cream)';}}
            onClick={()=>scrollTo('ind-leitura')}>Modo Leitura</button>
          <button style={btnSolid}
            onMouseEnter={e=>e.currentTarget.style.opacity='0.85'}
            onMouseLeave={e=>e.currentTarget.style.opacity='1'}
            onClick={()=>scrollTo('ind-timeline')}>Explorar Período</button>
        </div>
      </section>

      {/* ── Contexto / Leitura ── */}
      <section id="ind-leitura" className="section reading-bg">
        <div className="section-inner">
          <Reveal>
            <span className="section-eyebrow">Contexto Histórico</span>
            <h2 className="section-title">A Independência dos Estados Unidos</h2>
            <div className="title-rule" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="reading-prose">

              {/* INTRODUÇÃO */}
              <p>A Independência dos Estados Unidos foi um dos acontecimentos mais importantes da história mundial. Ela marcou o momento em que 13 colônias inglesas na América do Norte deixaram de obedecer à Inglaterra e formaram um novo país: os Estados Unidos da América. Esse processo envolveu protestos, guerras, grandes pensadores e ideais de liberdade que ainda influenciam o mundo até hoje.</p>
              <p>Para entender como isso aconteceu, é preciso conhecer como viviam essas colônias, por que os colonos se revoltaram e quais ideias inspiraram a criação de um país inteiramente novo — baseado na liberdade e na participação política do povo.</p>

              {/* SEÇÃO 1: AS 13 COLÔNIAS */}
              <h3 style={{fontFamily:'var(--font-title)',color:'var(--gold-light)',fontSize:'1.3rem',marginTop:'2.5rem',marginBottom:'0.75rem',letterSpacing:'0.04em'}}>🔹 Como eram as 13 Colônias</h3>
              <p>As 13 colônias foram criadas pela Inglaterra ao longo da costa leste da América do Norte. Nelas, os colonos trabalhavam na agricultura, realizavam comércio e construíam suas comunidades. A maioria era de origem europeia — ingleses, irlandeses, alemães e outros — que foram para a América em busca de oportunidades e liberdade religiosa.</p>
              <p>Apesar de todo o esforço dos colonos, as decisões políticas mais importantes não eram tomadas por eles. Eram tomadas pelo rei da Inglaterra, que ficava do outro lado do oceano Atlântico. Os colonos não tinham representantes no Parlamento inglês e não podiam votar nas leis que regiam suas vidas. Ou seja, eram obrigados a obedecer a regras que ajudavam a criar, mas às quais nunca foram consultados.</p>

              {/* SEÇÃO 2: O PROBLEMA DOS IMPOSTOS */}
              <h3 style={{fontFamily:'var(--font-title)',color:'var(--gold-light)',fontSize:'1.3rem',marginTop:'2.5rem',marginBottom:'0.75rem',letterSpacing:'0.04em'}}>🔹 O Problema dos Impostos</h3>
              <p>Após a <em>Guerra dos Sete Anos</em> (1756–1763), a Inglaterra saiu vitoriosa, mas com uma dívida enorme. Para pagar essas dívidas, o governo inglês tomou uma decisão que irritou profundamente os colonos americanos: aumentar os impostos nas colônias.</p>
              <p>O problema era que os colonos não tinham nenhum representante no Parlamento inglês — o órgão que criava as leis e aprovava os impostos. Como poderiam ser obrigados a pagar impostos de um governo no qual não tinham voz? Dessa situação surgiu a famosa frase: <em>"Sem representação, sem impostos"</em>. Ela resumia perfeitamente o sentimento de injustiça dos colonos: se não podemos votar e decidir, não vamos pagar.</p>
              <p>A tensão chegou ao ponto máximo em 1773, com o episódio conhecido como <em>Festa do Chá de Boston</em>. Colonos disfarçados de indígenas invadiram navios ingleses no porto de Boston e jogaram centenas de caixas de chá inglês no mar. Não foi uma brincadeira — foi um ato político poderoso, que demonstrava que os colonos estavam dispostos a ir além das palavras para defender seus direitos.</p>

              {/* SEÇÃO 3: A LUTA CONTRA A INGLATERRA */}
              <h3 style={{fontFamily:'var(--font-title)',color:'var(--gold-light)',fontSize:'1.3rem',marginTop:'2.5rem',marginBottom:'0.75rem',letterSpacing:'0.04em'}}>🔹 A Luta Contra a Inglaterra</h3>
              <p>Os protestos e a resistência cresceram até que, em 1775, a situação explodiu em guerra. As 13 colônias se uniram e formaram um exército continental — um exército que representava todas as colônias juntas — liderado pelo general <em>George Washington</em>.</p>
              <p>Essa guerra não foi fácil. Os colonos enfrentavam o exército britânico, um dos mais poderosos e treinados do mundo da época. O exército colonial era menor, menos equipado e muitas vezes passava por condições durísimas, como falta de alimentos e frio intenso no inverno. Ainda assim, os colonos lutaram com determinação, motivados pelo desejo de liberdade e pela crença em sua causa.</p>

              {/* SEÇÃO 4: A DECLARAÇÃO DE INDEPENDÊNCIA */}
              <h3 style={{fontFamily:'var(--font-title)',color:'var(--gold-light)',fontSize:'1.3rem',marginTop:'2.5rem',marginBottom:'0.75rem',letterSpacing:'0.04em'}}>🔹 A Declaração de Independência</h3>
              <p>Em 4 de julho de 1776 — enquanto a guerra ainda acontecia — os representantes das 13 colônias aprovaram a <em>Declaração de Independência dos Estados Unidos</em>. O documento explicava claramente as razões da separação da Inglaterra e proclamava que as colônias formavam agora um país livre e independente.</p>
              <p>A Declaração foi muito mais do que um anúncio político. Ela representou um marco na história da humanidade, pois afirmava que nenhum governo tem o direito de oprimir seu povo e que os cidadãos podem e devem se defender quando seus direitos fundamentais são desrespeitados.</p>

              {/* SEÇÃO 5: IDEIAS DE LIBERDADE E DIREITOS */}
              <h3 style={{fontFamily:'var(--font-title)',color:'var(--gold-light)',fontSize:'1.3rem',marginTop:'2.5rem',marginBottom:'0.75rem',letterSpacing:'0.04em'}}>🔹 Ideias de Liberdade e Direitos</h3>
              <p>A Declaração de Independência foi profundamente influenciada pelo <em>Iluminismo</em> — um movimento intelectual europeu do século XVIII que defendia a razão, a liberdade individual e a igualdade entre os seres humanos. Os filósofos iluministas questionavam o poder absoluto dos reis e argumentavam que os governos deveriam existir para servir ao povo, não para dominá-lo.</p>
              <p>O conceito de <em>direitos naturais</em> — a ideia de que todo ser humano nasce com certos direitos que não podem ser tirados por nenhum governo — foi central para o documento. Seu principal autor, <em>Thomas Jefferson</em>, expressou isso de forma que se tornou uma das frases mais famosas da história: todos os homens nascem com o direito à <strong>vida, à liberdade e à busca da felicidade</strong>.</p>

              {/* SEÇÃO 6: O NASCIMENTO DE UM PAÍS */}
              <h3 style={{fontFamily:'var(--font-title)',color:'var(--gold-light)',fontSize:'1.3rem',marginTop:'2.5rem',marginBottom:'0.75rem',letterSpacing:'0.04em'}}>🔹 O Nascimento de um País</h3>
              <p>A guerra continuou por mais alguns anos após a Declaração, até que, em 1783, foi assinado o <em>Tratado de Paris</em>. Por meio dele, a Inglaterra reconheceu oficialmente a derrota e aceitou a independência das 13 colônias. Nascia assim, oficialmente, os <em>Estados Unidos da América</em>.</p>
              <p>O novo país foi fundado sobre ideias inovadoras para a época: um governo eleito pelo povo, uma constituição escrita para limitar o poder dos governantes, e o respeito aos direitos individuais. Esse modelo inspirou revoluções e movimentos de independência em todo o mundo, inclusive na América Latina.</p>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section id="ind-timeline" className="section timeline-section">
        <div className="section-inner">
          <Reveal>
            <span className="section-eyebrow" style={{display:'block',textAlign:'center'}}>Eixo Cronológico</span>
            <h2 className="section-title" style={{textAlign:'center'}}>Os Grandes Momentos</h2>
            <div className="title-rule center" />
          </Reveal>
          <div className="timeline-wrap">
            <div className="timeline-line" />
            {indTimelineNodes.map((node, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`timeline-row ${node.side}`}>
                  <div className="timeline-node">
                    <span className="timeline-year">{node.year}</span>
                    <h3>{node.title}</h3>
                    <p>{node.text}</p>
                  </div>
                  <div className="timeline-dot" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Conceitos / Glossário ── */}
      <section id="ind-conceitos" className="section cards-section">
        <div className="section-inner">
          <Reveal>
            <span className="section-eyebrow">Glossário</span>
            <h2 className="section-title">Termos Essenciais</h2>
            <div className="title-rule" />
          </Reveal>
          <div className="cards-grid">
            {indGlossaryTerms.map((term, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="concept-card">
                  <div className="card-icon">{term.icon}</div>
                  <h3>{term.title}</h3>
                  <p>{term.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resumo ── */}
      <section id="ind-resumo" className="section reading-bg">
        <div className="section-inner">
          <Reveal>
            <span className="section-eyebrow">Revisão</span>
            <h2 className="section-title">Resumo para a Prova</h2>
            <div className="title-rule" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="summary-box">
              <h3>📌 Causas da Independência</h3>
              <ul>
                <li>As 13 colônias eram controladas pela Inglaterra sem ter representação política</li>
                <li>Após a Guerra dos Sete Anos, a Inglaterra aumentou os impostos nas colônias</li>
                <li>Os colonos recusaram pagar impostos sem ter voz no governo: <em>"Sem representação, sem impostos"</em></li>
                <li>Protestos como a Festa do Chá de Boston mostraram a crescente resistência colonial</li>
                <li>Ideias iluministas de liberdade e direitos naturais inspiraram os colonos a buscar independência</li>
              </ul>

              <h3>⚡ Principais Acontecimentos</h3>
              <ul>
                <li><strong style={{color:'var(--cream)'}}>Séc. XVII–XVIII</strong> — Formação das 13 colônias inglesas na costa leste da América</li>
                <li><strong style={{color:'var(--cream)'}}>1763</strong> — Fim da Guerra dos Sete Anos; Inglaterra aumenta impostos nas colônias</li>
                <li><strong style={{color:'var(--cream)'}}>1773</strong> — Festa do Chá de Boston: colonos jogam chá inglês no mar em protesto</li>
                <li><strong style={{color:'var(--cream)'}}>1775</strong> — Início da guerra; George Washington lidera o exército colonial</li>
                <li><strong style={{color:'var(--cream)'}}>1776</strong> — Declaração de Independência, redigida por Thomas Jefferson em 4 de julho</li>
                <li><strong style={{color:'var(--cream)'}}>1783</strong> — Tratado de Paris; Inglaterra reconhece a independência americana</li>
              </ul>

              <h3>🌍 Consequências</h3>
              <ul>
                <li>Surgimento dos Estados Unidos da América como nação independente</li>
                <li>Criação da primeira república moderna baseada em princípios iluministas</li>
                <li>Inspiração para a Revolução Francesa (1789) e movimentos de independência na América Latina</li>
                <li>Difusão dos direitos naturais — vida, liberdade e busca da felicidade — como valores universais</li>
                <li>Modelo de constituição escrita que limitava o poder do governo e protegia o cidadão</li>
              </ul>

              <h3>💡 Resumo Final</h3>
              <p style={{marginTop:'0.5rem',lineHeight:'1.9'}}>
                As 13 colônias eram controladas pela Inglaterra, mas se revoltaram contra os impostos e a falta de participação política. Isso levou a protestos, guerra e, em 1776, à Declaração de Independência. Influenciados pelo Iluminismo, os colonos conquistaram sua independência em 1783, formando um novo país baseado em ideias de liberdade, representação e direitos naturais.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Quiz ── */}
      <section id="ind-quiz" className="section quiz-section">
        <div className="section-inner" style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}}>
          <Reveal>
            <span className="section-eyebrow">Avaliação</span>
            <h2 className="section-title">Teste Seus Conhecimentos</h2>
            <p className="section-subtitle" style={{marginBottom:'3rem'}}>5 perguntas aleatórias sobre a Independência dos EUA</p>
          </Reveal>
          <Reveal delay={0.15}>
            <button className="quiz-cta-btn" onClick={()=>{ if(quizState==='idle') startQuiz(); else setQuizOpen(o=>!o); }}>
              <Crown size={16} />
              {quizState==='idle' ? 'Iniciar Avaliação' : (quizOpen ? 'Ocultar Quiz' : 'Exibir Quiz')}
            </button>
          </Reveal>

          {quizState!=='idle' && quizOpen && (
            <div style={{marginTop:'3rem',width:'100%',display:'flex',justifyContent:'center',animation:'fadeUp 0.4s ease both'}}>
              <div className="quiz-panel">
                {quizState==='playing' && session.length>0 && (
                  <>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem',paddingBottom:'1rem',borderBottom:'1px solid var(--border-soft)'}}>
                      <span className="quiz-label">Pergunta {qIdx+1} de 5</span>
                      <span className="quiz-score">Pontos: {score*3}</span>
                    </div>
                    <h3>{session[qIdx].text}</h3>
                    <div style={{marginBottom:'1.5rem'}}>
                      {session[qIdx].options.map((opt,idx)=>(
                        <button key={idx} className={optClass(idx)} disabled={checked} onClick={()=>pick(idx)}>{opt}</button>
                      ))}
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'1rem',borderTop:'1px solid var(--border-soft)'}}>
                      {checked ? <button className="quiz-next-btn" onClick={next}>{qIdx<4?'Próxima →':'Ver Resultado'}</button> : <div/>}
                      <span className="quiz-score" style={{fontSize:'0.85rem'}}>Score: {score}/5</span>
                    </div>
                  </>
                )}
                {quizState==='finished' && (
                  <div style={{textAlign:'center',padding:'2rem 0'}}>
                    <span className="section-eyebrow" style={{display:'block'}}>Resultado Final</span>
                    <div className="quiz-result-score">{score}<span style={{fontSize:'3rem',color:'var(--cream-dim)'}}>/ 5</span></div>
                    <p style={{fontFamily:'var(--font-serif)',fontStyle:'italic',color:'var(--cream-dim)',margin:'1rem 0 2.5rem'}}>
                      {score>=4?'Excelente domínio histórico!':score>=2?'Bom desempenho. Continue estudando!':'Revise o conteúdo e tente novamente.'}
                    </p>
                    <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
                      <button className="quiz-next-btn" onClick={startQuiz}>Novo Quiz Aleatório</button>
                      <button
                        onClick={()=>{setQIdx(0);setScore(0);setSelected(null);setChecked(false);setQuizState('playing');}}
                        style={{fontFamily:'var(--font-sans)',fontSize:'0.75rem',fontWeight:600,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--cream)',background:'transparent',border:'1px solid var(--border)',padding:'0.85rem 2rem',borderRadius:'2px',cursor:'pointer'}}
                        onMouseEnter={e=>e.currentTarget.style.borderColor='var(--gold)'}
                        onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}
                      >Refazer Este Quiz</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
