import React, { useState } from 'react';
import { Crown, BookOpen, Scroll, Swords, FlaskConical, Scale } from 'lucide-react';
import './index.css';
import Reveal from './Reveal.jsx';
import RevFrancesa from './RevFrancesa.jsx';
import ChatAssistant from './ChatAssistant.jsx';

/* ─── Inglesa data ─── */
const questionBank = [
  { id: 1,  text: "O que os Atos de Navegação de 1651 determinavam?",              options: ["Comércio com a Espanha","Fim da marinha","Transporte apenas em navios ingleses ou produtores","Venda de terras"],                          correct: 2 },
  { id: 2,  text: "Qual política a Rainha Elizabeth I adotou associando-se a corsários?", options: ["Absolutismo Religioso","Política Mercantilista","Feudalismo Agrário","Comunismo Primitivo"],                                       correct: 1 },
  { id: 3,  text: "O que foi a prática do 'Cercamento'?",                          options: ["Criação de novos impostos","Fechamento da Câmara","Expulsão de camponeses para criar ovelhas","Divisão do parlamento"],                   correct: 2 },
  { id: 4,  text: "Qual religião o Rei Jaime I tentou impor aos seus súditos?",    options: ["Puritanismo","Catolicismo","Anglicanismo","Luteranismo"],                                                                                   correct: 2 },
  { id: 5,  text: "Quem estava na Câmara dos Comuns?",                             options: ["Alta nobreza","Representantes do Rei","Representantes da burguesia e da gentry","Militares"],                                              correct: 2 },
  { id: 6,  text: "Qual era a crença principal dos Puritanos?",                    options: ["Agir conforme a Bíblia e Igreja independente do Estado","O Chefe da Igreja é o próprio Rei","Abolição da propriedade","Poder monárquico é divino"], correct: 0 },
  { id: 7,  text: "Qual foi o imposto que Carlos I tornou nacional?",              options: ["Dízimo","Atos de Navegação","Ship Money","Imposto do Selo"],                                                                                correct: 2 },
  { id: 8,  text: "O que desencadeou a Guerra Civil no reinado de Carlos I?",      options: ["Invasão da câmara dos comuns pelo rei","Aliança com corsários","Morte de Jaime I","Ataque holandês"],                                     correct: 0 },
  { id: 9,  text: "Qual foi a inovação de Cromwell no 'New Model Army'?",          options: ["Cavalaria exclusiva","Promoção por competência (merecimento)","Promoção por nascimento","Abolição de generais"],                         correct: 1 },
  { id: 10, text: "Qual foi o destino do Rei Carlos I?",                           options: ["Exilado","Primeiro-Ministro","Condenado à morte e executado","Fugiu"],                                                                     correct: 2 },
  { id: 11, text: "O que os Niveladores defendiam?",                               options: ["Poder absolutista","Fim da Câmara dos Lordes e direito de voto","Reforma agrária radical","Apoio holandês"],                              correct: 1 },
  { id: 12, text: "O que os Cavadores exigiam?",                                   options: ["Fim do comércio","Poder ao rei","Reforma agrária radical com entrega de terras","Novos impostos"],                                         correct: 2 },
  { id: 13, text: "Quem sucedeu Oliver Cromwell em 1658?",                         options: ["Jaime I","Seu filho Ricardo","Carlos II","Rainha Elizabeth I"],                                                                            correct: 1 },
  { id: 14, text: "O que aconteceu em 1660 com Carlos II?",                        options: ["Guerra Civil","Atos de Navegação","Execução","A Monarquia foi restaurada"],                                                               correct: 3 },
  { id: 15, text: "Para onde iam os camponeses expulsos de suas terras?",          options: ["Escócia","Cidades, sobretudo Londres","América","Exército de Cromwell"],                                                                   correct: 1 },
];

const timelineNodes = [
  { year: 'Séc. XVI',    title: 'Elizabeth I',      side: 'left',  text: 'Monarquia absolutista com política mercantilista. Associação a corsários enriqueceu a burguesia. Os cercamentos expulsaram camponeses do campo.' },
  { year: '1603',        title: 'Jaime I',           side: 'right', text: 'Início da dinastia Stuart. Conflitos religiosos entre Puritanos e Anglicanos. Tentativa de impor absolutismo de direito divino e fechamento do Parlamento.' },
  { year: '1625–1649',   title: 'Carlos I',          side: 'left',  text: 'Tornou o ship money imposto nacional e invadiu a Câmara dos Comuns — ato que desencadeou a Guerra Civil contra as tropas parlamentares.' },
  { year: '1649–1658',   title: 'Oliver Cromwell',  side: 'right', text: 'Líder puritano que remodelou o exército (New Model Army). Executou o Rei, proclamou a República e promulgou os Atos de Navegação.' },
  { year: '1660',        title: 'Restauração',       side: 'left',  text: 'Após a morte de Cromwell e pressão dos movimentos populares, o Parlamento destituiu Ricardo Cromwell e restaurou a monarquia com Carlos II.' },
];

const glossaryTerms = [
  { icon: <BookOpen size={16}/>,     title: 'Puritanos',      desc: 'Defendiam agir conforme a Bíblia e que a igreja devia ser independente do Estado, opondo-se ao absolutismo.' },
  { icon: <Crown size={16}/>,        title: 'Anglicanos',     desc: 'Religião referendada pelo alto clero e pela alta nobreza na qual o chefe supremo da igreja é o próprio Rei.' },
  { icon: <Scale size={16}/>,        title: 'Gentry',         desc: 'A pequena nobreza rural inglesa e proprietários que enriqueceram exportando tecidos e alimentos para o mundo.' },
  { icon: <Scroll size={16}/>,       title: 'Niveladores',    desc: 'Movimento que defendia a dissolução da Câmara dos Lordes, direito de voto a todos os homens e fim dos monopólios.' },
  { icon: <FlaskConical size={16}/>, title: 'Cavadores',      desc: 'Radicais que exigiam reforma agrária radical com o confisco de terras da igreja e governo para entrega aos mais pobres.' },
  { icon: <Swords size={16}/>,       title: 'New Model Army', desc: 'Exército remodelado por Oliver Cromwell onde soldados passavam a ser promovidos com base na competência e no merecimento.' },
];

/* ─── helpers ─── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Inglesa page ─── */
function RevInglesaPage() {
  const [quizState, setQuizState] = useState('idle');
  const [session, setSession]     = useState([]);
  const [qIdx, setQIdx]           = useState(0);
  const [score, setScore]         = useState(0);
  const [selected, setSelected]   = useState(null);
  const [checked, setChecked]     = useState(false);
  const [quizOpen, setQuizOpen]   = useState(false);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const startQuiz = () => {
    setSession(shuffle(questionBank).slice(0, 5));
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

  const btnOutline = { fontFamily:'var(--font-sans)',fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--cream)',background:'transparent',border:'1px solid rgba(201,168,76,0.5)',padding:'0.95rem 2.25rem',borderRadius:'2px',cursor:'pointer',transition:'all 0.25s ease' };
  const btnSolid   = { ...btnOutline, color:'var(--bg-deep)', background:'linear-gradient(135deg,var(--gold-light),var(--gold))', border:'1px solid var(--gold)' };

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <Crown size={58} className="hero-crown fade-up" style={{color:'var(--gold)'}} fill="var(--gold)" />
        <div className="hero-divider fade-up-d1" />
        <h1 className="fade-up-d1" style={{fontFamily:'var(--font-title)',fontSize:'clamp(3rem,8vw,7rem)',fontWeight:700,color:'var(--cream)',letterSpacing:'0.06em',lineHeight:1.05,marginBottom:'1rem'}}>
          Revolução<br/>Inglesa
        </h1>
        <p className="fade-up-d2" style={{fontFamily:'var(--font-serif)',fontStyle:'italic',fontSize:'clamp(1.1rem,2.5vw,1.5rem)',color:'var(--cream-dim)',maxWidth:'520px',marginBottom:'3rem'}}>
          Do Absolutismo à Restauração — a queda de um rei, o nascimento do Parlamento.
        </p>
        <div className="fade-up-d3" style={{display:'flex',gap:'1rem',flexWrap:'wrap',justifyContent:'center'}}>
          <button id="btn-leitura" style={btnOutline}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold-light)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(201,168,76,0.5)';e.currentTarget.style.color='var(--cream)';}}
            onClick={()=>scrollTo('ing-leitura')}>Modo Leitura</button>
          <button id="btn-cronologia" style={btnSolid}
            onMouseEnter={e=>e.currentTarget.style.opacity='0.85'}
            onMouseLeave={e=>e.currentTarget.style.opacity='1'}
            onClick={()=>scrollTo('ing-timeline')}>Explorar Período</button>
        </div>
      </section>

      {/* Contexto */}
      <section id="ing-leitura" className="section reading-bg">
        <div className="section-inner">
          <Reveal><span className="section-eyebrow">Contexto Histórico</span><h2 className="section-title">O Prelúdio da Revolução</h2><div className="title-rule" /></Reveal>
          <Reveal delay={0.1}>
            <div className="reading-prose">
              <p>No século XVI a monarquia inglesa era absolutista — seus governantes detinham poder quase ilimitado. A Rainha Elizabeth I adotou uma política mercantilista, associando-se a corsários e transformando a Inglaterra numa grande potência econômica e naval. Sob seu reinado prosperou a burguesia comercial, a <em>gentry</em> rural e os pequenos proprietários, que exportavam lã e alimentos para o mundo.</p>
              <p>No campo, a agricultura de subsistência cedeu lugar à comercial: proprietários cercaram suas terras para criar ovelhas e extrair lã, expulsando famílias de camponeses. Essa prática — o <em>cercamento</em> — lançou multidões às estradas, que convergiam para Londres em busca de trabalho por salários mínimos.</p>
              <p>Com a morte de Elizabeth I, seu primo Jaime, Rei da Escócia, assumiu o trono como Jaime I, inaugurando a dinastia Stuart. O período seria marcado por intensos conflitos religiosos entre Puritanos e Anglicanos, e entre a Coroa e o Parlamento. Puritanos defendiam que cada um deveria agir conforme a Bíblia, com a Igreja independente do Estado; Anglicanos reconheciam o Rei como chefe supremo da Igreja.</p>
              <p>Considerando-se Rei por direito divino, Jaime I tentou impor o anglicanismo a todos os súditos, criou novos impostos e fechou o Parlamento quando este resistiu. Carlos I, seu sucessor, aprofundou o absolutismo: tornou nacional o <em>ship money</em> e, quando a oposição cresceu, invadiu a Câmara dos Comuns com a guarda pessoal — ato que acendeu a Guerra Civil.</p>
              <p>O deputado puritano Oliver Cromwell remodelou o exército — o New Model Army — substituindo o critério de nascimento pelo de competência. Com esse exército venceu o rei na Batalha de Naseby. Carlos I foi condenado à morte e executado; a República foi proclamada.</p>
              <p>Cromwell governou combatendo inimigos internos e externos. Em 1651 promulgou os Atos de Navegação, que reservavam o transporte de mercadorias inglesas a navios britânicos — medida que prejudicou os holandeses, desencadeando uma guerra que a Inglaterra venceu, tornando-se a maior potência naval: a "Rainha dos Mares".</p>
              <p>Após a morte de Cromwell em 1658, seu filho Ricardo enfrentou forte oposição dos <em>Niveladores</em> e dos <em>Cavadores</em>. O Parlamento destituiu Ricardo Cromwell e, em 1660, restaurou a monarquia com Carlos II, devolvendo o trono à dinastia Stuart.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section id="ing-timeline" className="section timeline-section">
        <div className="section-inner">
          <Reveal><span className="section-eyebrow" style={{display:'block',textAlign:'center'}}>Eixo Cronológico</span><h2 className="section-title" style={{textAlign:'center'}}>Os Protagonistas da Era</h2><div className="title-rule center" /></Reveal>
          <div className="timeline-wrap">
            <div className="timeline-line" />
            {timelineNodes.map((node, i) => (
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

      {/* Conceitos */}
      <section id="ing-conceitos" className="section cards-section">
        <div className="section-inner">
          <Reveal><span className="section-eyebrow">Glossário</span><h2 className="section-title">Mural de Conceitos</h2><div className="title-rule" /></Reveal>
          <div className="cards-grid">
            {glossaryTerms.map((term, i) => (
              <Reveal key={i} delay={i * 0.08}>
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

      {/* Quiz */}
      <section id="ing-quiz" className="section quiz-section">
        <div className="section-inner" style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}}>
          <Reveal>
            <span className="section-eyebrow">Avaliação</span>
            <h2 className="section-title">Teste Seus Conhecimentos</h2>
            <p className="section-subtitle" style={{marginBottom:'3rem'}}>5 perguntas aleatórias sobre a Revolução Inglesa</p>
          </Reveal>
          <Reveal delay={0.15}>
            <button id="quiz-start-btn" className="quiz-cta-btn" onClick={()=>{ if(quizState==='idle') startQuiz(); else setQuizOpen(o=>!o); }}>
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
                        <button key={idx} id={`quiz-opt-${idx}`} className={optClass(idx)} disabled={checked} onClick={()=>pick(idx)}>{opt}</button>
                      ))}
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'1rem',borderTop:'1px solid var(--border-soft)'}}>
                      {checked ? <button id="quiz-next-btn" className="quiz-next-btn" onClick={next}>{qIdx<4?'Próxima →':'Ver Resultado'}</button> : <div/>}
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
                      <button id="quiz-retry-btn" className="quiz-next-btn" onClick={startQuiz}>Novo Quiz Aleatório</button>
                      <button id="quiz-redo-btn"
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

/* ─── NAV link sets ─── */
const navLinks = {
  inglesa:  [
    { label: 'Contexto',   id: 'ing-leitura'  },
    { label: 'Cronologia', id: 'ing-timeline'  },
    { label: 'Conceitos',  id: 'ing-conceitos' },
    { label: 'Avaliação',  id: 'ing-quiz'      },
  ],
  francesa: [
    { label: 'Contexto',   id: 'fr-leitura'  },
    { label: 'Cronologia', id: 'fr-timeline'  },
    { label: 'Glossário',  id: 'fr-conceitos' },
    { label: 'Resumo',     id: 'fr-resumo'    },
    { label: 'Avaliação',  id: 'fr-quiz'      },
  ],
};

/* ─── Root App ─── */
export default function App() {
  const [tab, setTab] = useState('inglesa');

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const switchTab = (t) => {
    setTab(t);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Topnav ── */}
      <nav className="topnav">
        <span className="topnav-logo">História</span>
        <ul className="topnav-links">
          {navLinks[tab].map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={e => { e.preventDefault(); scrollTo(l.id); }}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Tab bar ── */}
      <div className="tab-bar">
        <button className={`tab-btn ${tab === 'inglesa'  ? 'active' : ''}`} onClick={() => switchTab('inglesa')}>
          Revolução Inglesa
        </button>
        <button className={`tab-btn ${tab === 'francesa' ? 'active' : ''}`} onClick={() => switchTab('francesa')}>
          Revolução Francesa
        </button>
      </div>

      {/* ── Pages ── */}
      {tab === 'inglesa'  && <RevInglesaPage />}
      {tab === 'francesa' && <RevFrancesa    />}

      {/* ── AI Chat Assistant ── */}
      <ChatAssistant />
    </>
  );
}
