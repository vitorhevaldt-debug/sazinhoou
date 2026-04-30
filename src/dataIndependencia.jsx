import React from 'react';
import { BookOpen, Crown, Scroll, Swords, FlaskConical, Scale } from 'lucide-react';

/* ─── Timeline ─── */
export const indTimelineNodes = [
  {
    year: 'Séc. XVII–XVIII',
    title: 'As 13 Colônias',
    side: 'left',
    text: 'A Inglaterra criou 13 colônias na costa leste da América do Norte. Os colonos trabalhavam, plantavam e comercializavam, mas todas as decisões políticas importantes eram tomadas pelo rei da Inglaterra, sem qualquer participação colonial.',
  },
  {
    year: '1763',
    title: 'Fim da Guerra dos Sete Anos',
    side: 'right',
    text: 'A Inglaterra saiu vitoriosa da Guerra dos Sete Anos, mas endividada. Para cobrir os gastos, a Coroa decidiu aumentar os impostos sobre as 13 colônias americanas, acendendo o estopim do conflito.',
  },
  {
    year: '1773',
    title: 'Festa do Chá de Boston',
    side: 'left',
    text: 'Colonos disfarçados de indígenas jogaram carregamentos inteiros de chá inglês no mar do porto de Boston. O protesto ficou conhecido como "Festa do Chá de Boston" e simbolizou a recusa dos colonos em pagar impostos sem ter representação no governo inglês.',
  },
  {
    year: '1775',
    title: 'Início da Guerra',
    side: 'right',
    text: 'A tensão entre colonos e soldados ingleses se transformou em guerra aberta. As 13 colônias uniram forças e formaram um exército continental, liderado pelo general George Washington, para enfrentar o poderoso exército britânico.',
  },
  {
    year: '1776',
    title: 'Declaração de Independência',
    side: 'left',
    text: 'Em 4 de julho de 1776, foi proclamada a Declaração de Independência dos Estados Unidos. Redigida principalmente por Thomas Jefferson e influenciada pelos ideais iluministas, o documento afirmava que todos os homens têm direito à vida, à liberdade e à busca da felicidade.',
  },
  {
    year: '1783',
    title: 'Vitória e Novo País',
    side: 'right',
    text: 'Com o Tratado de Paris, a Inglaterra reconheceu oficialmente a independência das 13 colônias. Nascia assim os Estados Unidos da América — a primeira república moderna do mundo, fundada sobre ideais de liberdade, representação política e direitos individuais.',
  },
];

/* ─── Glossário / Conceitos ─── */
export const indGlossaryTerms = [
  {
    icon: <Crown size={16} />,
    title: 'Colônias',
    desc: 'Territórios controlados por uma nação estrangeira. As 13 colônias americanas eram dominadas pela Inglaterra, que determinava suas leis e cobrava impostos sem dar-lhes direito de voto.',
  },
  {
    icon: <Scale size={16} />,
    title: 'Sem Representação, Sem Impostos',
    desc: 'Frase símbolo da revolta colonial. Os colonos exigiam que, se teriam de pagar impostos, deveriam ter representantes no Parlamento inglês para defender seus interesses.',
  },
  {
    icon: <Swords size={16} />,
    title: 'Festa do Chá de Boston',
    desc: 'Protesto de 1773 em que colonos jogaram caixas de chá inglês no mar de Boston. Foi um ato de desobediência direta contra os impostos impostos pela Inglaterra sem consentimento colonial.',
  },
  {
    icon: <BookOpen size={16} />,
    title: 'Iluminismo',
    desc: 'Movimento intelectual que defendia razão, liberdade, igualdade e direitos naturais. Suas ideias influenciaram diretamente a Declaração de Independência e a formação dos Estados Unidos.',
  },
  {
    icon: <Scroll size={16} />,
    title: 'Declaração de Independência',
    desc: 'Documento de 1776 que proclamou a separação das 13 colônias da Inglaterra. Afirmou que todos os homens nascem com direitos inalienáveis: vida, liberdade e busca da felicidade.',
  },
  {
    icon: <FlaskConical size={16} />,
    title: 'Thomas Jefferson',
    desc: 'Principal autor da Declaração de Independência. Político e pensador iluminista americano, Jefferson defendia que os governos existem para proteger os direitos naturais dos cidadãos.',
  },
];

/* ─── Quiz ─── */
export const indQuestionBank = [
  {
    id: 1,
    text: 'Quantas colônias se uniram para formar os Estados Unidos?',
    options: ['7 colônias', '10 colônias', '13 colônias', '15 colônias'],
    correct: 2,
  },
  {
    id: 2,
    text: 'Por que a Inglaterra aumentou os impostos nas colônias após 1763?',
    options: [
      'Para construir novas cidades',
      'Para pagar as dívidas da Guerra dos Sete Anos',
      'Para financiar uma nova frota naval',
      'Para criar escolas nas colônias',
    ],
    correct: 1,
  },
  {
    id: 3,
    text: 'O que foi a "Festa do Chá de Boston"?',
    options: [
      'Uma celebração da amizade entre colonos e ingleses',
      'Uma reunião de negociantes de chá',
      'Um protesto em que colonos jogaram chá inglês no mar',
      'Uma festa popular organizada pelo rei',
    ],
    correct: 2,
  },
  {
    id: 4,
    text: 'Qual era o significado da frase "Sem representação, sem impostos"?',
    options: [
      'Os colonos queriam não pagar qualquer imposto',
      'Os colonos queriam representantes no governo inglês se fossem taxados',
      'Os colonos queriam criar seu próprio sistema tributário',
      'Os colonos pediam isenção total de impostos',
    ],
    correct: 1,
  },
  {
    id: 5,
    text: 'Quem liderou o exército colonial durante a guerra contra a Inglaterra?',
    options: [
      'Thomas Jefferson',
      'Benjamin Franklin',
      'George Washington',
      'John Adams',
    ],
    correct: 2,
  },
  {
    id: 6,
    text: 'Em que ano foi proclamada a Declaração de Independência dos Estados Unidos?',
    options: ['1773', '1775', '1776', '1783'],
    correct: 2,
  },
  {
    id: 7,
    text: 'Qual movimento intelectual influenciou a Declaração de Independência?',
    options: ['Romantismo', 'Iluminismo', 'Mercantilismo', 'Absolutismo'],
    correct: 1,
  },
  {
    id: 8,
    text: 'Quem foi o principal autor da Declaração de Independência?',
    options: ['George Washington', 'Benjamin Franklin', 'Thomas Jefferson', 'John Hancock'],
    correct: 2,
  },
  {
    id: 9,
    text: 'Quando terminou a guerra entre as colônias e a Inglaterra?',
    options: ['1776', '1780', '1783', '1789'],
    correct: 2,
  },
  {
    id: 10,
    text: 'Quais direitos Thomas Jefferson afirmou que todos os homens possuem?',
    options: [
      'Trabalho, moradia e educação',
      'Vida, liberdade e busca da felicidade',
      'Voto, propriedade e comércio',
      'Igualdade, fraternidade e liberdade',
    ],
    correct: 1,
  },
];
