import { BookOpen, Crown, Scale, Scroll, FlaskConical, Swords, Flame, Globe } from 'lucide-react';
import React from 'react';

export const frQuestionBank = [
  { id: 1, text: "Em que ano ocorreu a Tomada da Bastilha?", options: ["1776","1789","1804","1815"], correct: 1 },
  { id: 2, text: "Qual era o rei da França durante a Revolução?", options: ["Luís XIV","Napoleão","Luís XVI","Carlos X"], correct: 2 },
  { id: 3, text: "O que era o Antigo Regime?", options: ["O governo republicano","A ordem social e política antes da Revolução","O exército napoleônico","A aliança entre França e Inglaterra"], correct: 1 },
  { id: 4, text: "Quais eram os três Estados da sociedade francesa?", options: ["Nobreza, Clero e Burguesia","Clero, Nobreza e Povo Comum","Rei, Nobreza e Camponeses","Clero, Burguesia e Militares"], correct: 1 },
  { id: 5, text: "O que foi o Período do Terror?", options: ["A invasão napoleônica da Rússia","A fase violenta com guilhotinamentos em massa liderada por Robespierre","A guerra contra a Áustria","O bloqueio naval britânico"], correct: 1 },
  { id: 6, text: "Qual filósofo iluminista ficou famoso pela defesa da liberdade e crítica à Igreja?", options: ["Rousseau","Montesquieu","Voltaire","Locke"], correct: 2 },
  { id: 7, text: "O que a Declaração dos Direitos do Homem e do Cidadão proclamou?", options: ["O fim da propriedade privada","Os direitos naturais de liberdade, igualdade e fraternidade","A criação do Império","A aliança militar entre países"], correct: 1 },
  { id: 8, text: "Como Luís XVI foi executado?", options: ["Envenenado","Por fuzilamento","Na guilhotina","Afogado no Sena"], correct: 2 },
  { id: 9, text: "Qual foi o golpe de Napoleão que encerrou a fase revolucionária?", options: ["18 Brumário","Golpe da Bastilha","Coup de Paris","Decreto de Vendéia"], correct: 0 },
  { id: 10, text: "Quem liderou o Período do Terror?", options: ["Napoleão Bonaparte","Jean-Paul Marat","Maximilien Robespierre","Georges Danton"], correct: 2 },
  { id: 11, text: "A Bastilha era principalmente:", options: ["Um palácio real","Uma prisão símbolo do absolutismo","Um mercado popular","Um templo religioso"], correct: 1 },
  { id: 12, text: "O Terceiro Estado representava aproximadamente qual parcela da população?", options: ["10%","50%","75%","97%"], correct: 3 },
  { id: 13, text: "Qual lema sintetizou os ideais da Revolução Francesa?", options: ["Deus, Pátria e Família","Liberdade, Igualdade, Fraternidade","Honra, Coragem e Fidelidade","Trabalho, Terra e Paz"], correct: 1 },
  { id: 14, text: "Qual evento marcou o fim da monarquia e início da República na França?", options: ["Tomada da Bastilha","Declaração dos Direitos do Homem","Abolição da monarquia em 1792","Execução de Robespierre"], correct: 2 },
  { id: 15, text: "O Iluminismo defendia principalmente:", options: ["O poder absoluto do rei","A razão, a ciência e os direitos individuais","A supremacia da Igreja","O feudalismo e a tradição"], correct: 1 },
];

export const frTimelineNodes = [
  { year: 'Antes de 1789', title: 'Antigo Regime', side: 'left', text: 'A França vivia sob monarquia absolutista com Luís XVI. A sociedade era dividida em três Estados: Clero, Nobreza e Povo. O Terceiro Estado (97% da população) pagava todos os impostos.' },
  { year: '1789', title: 'Tomada da Bastilha', side: 'right', text: 'Em 14 de julho de 1789, o povo de Paris invadiu e tomou a Bastilha, prisão símbolo do absolutismo. O evento marcou o início oficial da Revolução Francesa.' },
  { year: 'Agosto 1789', title: 'Declaração dos Direitos', side: 'left', text: 'A Assembleia Nacional proclamou a Declaração dos Direitos do Homem e do Cidadão, defendendo liberdade, igualdade e fraternidade como direitos universais.' },
  { year: '1792', title: 'Fim da Monarquia', side: 'right', text: 'A Assembleia Nacional aboliu a monarquia e proclamou a Primeira República Francesa, encerrando séculos de poder real absoluto.' },
  { year: 'Janeiro 1793', title: 'Execução de Luís XVI', side: 'left', text: 'O rei Luís XVI foi julgado, condenado por traição e guilhotinado em praça pública. Sua execução chocou as monarquias europeias e intensificou as guerras externas.' },
  { year: '1793–1794', title: 'Período do Terror', side: 'right', text: 'Robespierre e o Comitê de Salvação Pública instauraram o Período do Terror: milhares de suspeitos de traição foram guilhotinados. Terminou com a execução do próprio Robespierre.' },
  { year: '1799', title: 'Ascensão de Napoleão', side: 'left', text: 'O general Napoleão Bonaparte derrubou o Diretório no golpe do 18 Brumário, encerrando a fase revolucionária e abrindo o período napoleônico.' },
];

export const frGlossaryTerms = [
  { icon: React.createElement(Crown, {size:16}), title: 'Antigo Regime', desc: 'Sistema político e social da França antes da Revolução, baseado no absolutismo monárquico e nos privilégios da nobreza e do clero.' },
  { icon: React.createElement(FlaskConical, {size:16}), title: 'Iluminismo', desc: 'Movimento filosófico do séc. XVIII que valorizava a razão, a ciência e os direitos naturais do ser humano, questionando o poder absoluto e a Igreja.' },
  { icon: React.createElement(Globe, {size:16}), title: 'Burguesia', desc: 'Classe social formada por comerciantes, banqueiros e profissionais liberais que, excluída dos privilégios da nobreza, liderou a Revolução.' },
  { icon: React.createElement(Swords, {size:16}), title: 'Monarquia Absolutista', desc: 'Forma de governo em que o rei concentra todo o poder — executivo, legislativo e judiciário — sem limite legal ou constitucional.' },
  { icon: React.createElement(Scale, {size:16}), title: 'República', desc: 'Sistema de governo em que o poder emana do povo, sem monarca hereditário. Proclamada na França em 1792 após a queda de Luís XVI.' },
  { icon: React.createElement(Flame, {size:16}), title: 'Bastilha', desc: 'Fortaleza-prisão de Paris, símbolo do poder absolutista. Sua tomada em 14 de julho de 1789 marcou o início da Revolução Francesa.' },
  { icon: React.createElement(Scroll, {size:16}), title: 'Período do Terror', desc: 'Fase (1793–1794) em que o governo revolucionário guilhotinou milhares de suspeitos de traição. Terminou com a queda e execução de Robespierre.' },
  { icon: React.createElement(BookOpen, {size:16}), title: 'Terceiro Estado', desc: 'Parcela da sociedade francesa (≈97% da população) formada por camponeses, artesãos e burguesia. Pagava todos os impostos e não tinha privilégios políticos.' },
];
