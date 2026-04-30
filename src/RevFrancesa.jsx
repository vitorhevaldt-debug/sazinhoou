import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import { frQuestionBank, frTimelineNodes, frGlossaryTerms } from './dataFrancesa.js';
import Reveal from './Reveal.jsx';

/* ─── shared helpers ─── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function RevFrancesa() {
  const [quizState, setQuizState] = useState('idle');
  const [session, setSession]     = useState([]);
  const [qIdx, setQIdx]           = useState(0);
  const [score, setScore]         = useState(0);
  const [selected, setSelected]   = useState(null);
  const [checked, setChecked]     = useState(false);
  const [quizOpen, setQuizOpen]   = useState(false);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const startQuiz = () => {
    setSession(shuffle(frQuestionBank).slice(0, 5));
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
          Revolução<br/>Francesa
        </h1>
        <p className="fade-up-d2" style={{fontFamily:'var(--font-serif)',fontStyle:'italic',fontSize:'clamp(1.1rem,2.5vw,1.5rem)',color:'var(--cream-dim)',maxWidth:'520px',marginBottom:'3rem'}}>
          Liberdade, Igualdade, Fraternidade — a queda do absolutismo e o nascimento dos direitos modernos.
        </p>
        <div className="fade-up-d3" style={{display:'flex',gap:'1rem',flexWrap:'wrap',justifyContent:'center'}}>
          <button style={btnOutline}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--gold)';e.currentTarget.style.color='var(--gold-light)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(201,168,76,0.5)';e.currentTarget.style.color='var(--cream)';}}
            onClick={()=>scrollTo('fr-leitura')}>Modo Leitura</button>
          <button style={btnSolid}
            onMouseEnter={e=>e.currentTarget.style.opacity='0.85'}
            onMouseLeave={e=>e.currentTarget.style.opacity='1'}
            onClick={()=>scrollTo('fr-timeline')}>Explorar Período</button>
        </div>
      </section>

      {/* ── Contexto ── */}
      <section id="fr-leitura" className="section reading-bg">
        <div className="section-inner">
          <Reveal>
            <span className="section-eyebrow">Contexto Histórico</span>
            <h2 className="section-title">O Prelúdio da Revolução</h2>
            <div className="title-rule" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="reading-prose">
              <p>No século XVIII, a França era governada pelo rei Luís XVI sob um regime absolutista chamado <em>Antigo Regime</em>. O rei concentrava todo o poder político e era considerado governante por direito divino — acima da lei. A sociedade estava rigidamente dividida em três grupos, os <em>Estados</em>: o Primeiro Estado (clero), o Segundo Estado (nobreza) e o Terceiro Estado, que reunia cerca de 97% da população — camponeses, artesãos e a burguesia.</p>
              <p>Apenas o Terceiro Estado pagava impostos. Clero e nobreza gozavam de imensos privilégios, isenções fiscais e poder político, enquanto o povo comum vivia sob pesada carga tributária. A situação ficou insustentável: más colheitas nos anos de 1788–1789 provocaram escassez de alimentos, fome generalizada e inflação elevada.</p>
              <p>Ao mesmo tempo, as ideias do <em>Iluminismo</em> se espalhavam pela França. Filósofos como Voltaire, Rousseau e Montesquieu questionavam o poder absoluto dos reis, defendiam a razão, a liberdade individual e a separação dos poderes. Essas ideias influenciaram profundamente a burguesia, que liderou o movimento revolucionário.</p>
              <p>A crise financeira do Estado francês foi o estopim. Luís XVI convocou os <em>Estados Gerais</em> — assembleia de representantes dos três Estados — em maio de 1789 para aprovar novos impostos. O Terceiro Estado exigiu reformas e, ao ser ignorado, declarou-se <em>Assembleia Nacional Constituinte</em>, desafiando abertamente o poder real.</p>
              <p>Em 14 de julho de 1789, o povo de Paris, furioso com a possibilidade de repressão militar pelo rei, invadiu e tomou a <em>Bastilha</em>, prisão símbolo do absolutismo. O evento sacudiu a França e marcou o início oficial da Revolução. Em agosto do mesmo ano, a Assembleia Nacional proclamou a <em>Declaração dos Direitos do Homem e do Cidadão</em>, consagrando princípios de liberdade, igualdade e fraternidade.</p>
              <p>A monarquia foi abolida em 1792 e a Primeira República proclamada. Luís XVI foi julgado, condenado por traição e guilhotinado em janeiro de 1793. O período seguinte ficou conhecido como o <em>Terror</em>: sob a liderança de Robespierre e do Comitê de Salvação Pública, milhares de suspeitos foram executados. O próprio Robespierre acabou guilhotinado em 1794, encerrando essa fase de violência.</p>
              <p>Em 1799, o general <em>Napoleão Bonaparte</em> derrubou o governo do Diretório no golpe do 18 Brumário, encerrando a fase revolucionária. Napoleão instaurou o Consulado e depois o Império, mas preservou e exportou muitas conquistas da Revolução — o Código Civil napoleônico, a abolição do feudalismo e os princípios de igualdade perante a lei — transformando o mundo moderno.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section id="fr-timeline" className="section timeline-section">
        <div className="section-inner">
          <Reveal>
            <span className="section-eyebrow" style={{display:'block',textAlign:'center'}}>Eixo Cronológico</span>
            <h2 className="section-title" style={{textAlign:'center'}}>Os Grandes Momentos</h2>
            <div className="title-rule center" />
          </Reveal>
          <div className="timeline-wrap">
            <div className="timeline-line" />
            {frTimelineNodes.map((node, i) => (
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
      <section id="fr-conceitos" className="section cards-section">
        <div className="section-inner">
          <Reveal>
            <span className="section-eyebrow">Glossário</span>
            <h2 className="section-title">Termos Essenciais</h2>
            <div className="title-rule" />
          </Reveal>
          <div className="cards-grid">
            {frGlossaryTerms.map((term, i) => (
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
      <section id="fr-resumo" className="section reading-bg">
        <div className="section-inner">
          <Reveal>
            <span className="section-eyebrow">Revisão</span>
            <h2 className="section-title">Resumo para a Prova</h2>
            <div className="title-rule" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="summary-box">
              <h3>📌 Causas da Revolução</h3>
              <ul>
                <li>Desigualdade social extrema — Terceiro Estado pagava todos os impostos sem privilégios</li>
                <li>Crise econômica e fome causadas por má colheita em 1788</li>
                <li>Gastos excessivos da corte de Luís XVI e dívida pública enorme</li>
                <li>Influência do Iluminismo questionando o absolutismo e defendendo os direitos naturais</li>
                <li>Inspiração na Independência americana (1776)</li>
              </ul>

              <h3>⚡ Principais Acontecimentos</h3>
              <ul>
                <li><strong style={{color:'var(--cream)'}}>1789</strong> — Tomada da Bastilha (14 de julho); Declaração dos Direitos do Homem</li>
                <li><strong style={{color:'var(--cream)'}}>1792</strong> — Abolição da monarquia; proclamação da República</li>
                <li><strong style={{color:'var(--cream)'}}>1793</strong> — Execução de Luís XVI na guilhotina</li>
                <li><strong style={{color:'var(--cream)'}}>1793–1794</strong> — Período do Terror com Robespierre; execução em massa de opositores</li>
                <li><strong style={{color:'var(--cream)'}}>1794</strong> — Queda e guilhotinamento de Robespierre; fim do Terror</li>
                <li><strong style={{color:'var(--cream)'}}>1799</strong> — Golpe do 18 Brumário; Napoleão assume o poder</li>
              </ul>

              <h3>🌍 Consequências</h3>
              <ul>
                <li>Fim do Antigo Regime e do absolutismo monárquico na França</li>
                <li>Proclamação dos direitos universais do ser humano</li>
                <li>Ascensão da burguesia ao poder político</li>
                <li>Inspiração para revoluções e movimentos de independência em todo o mundo</li>
                <li>Difusão dos princípios de liberdade, igualdade e fraternidade</li>
                <li>Código Civil napoleônico codificou conquistas revolucionárias e influenciou sistemas jurídicos modernos</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Quiz ── */}
      <section id="fr-quiz" className="section quiz-section">
        <div className="section-inner" style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}}>
          <Reveal>
            <span className="section-eyebrow">Avaliação</span>
            <h2 className="section-title">Teste Seus Conhecimentos</h2>
            <p className="section-subtitle" style={{marginBottom:'3rem'}}>5 perguntas aleatórias sobre a Revolução Francesa</p>
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
                    <h3 className="quiz-panel">{session[qIdx].text}</h3>
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
