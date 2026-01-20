
import { TheologicalPerspective, Quote, TimelineEvent, Message, ViewMode } from './types';
import { 
  BookOpen, 
  Map as MapIcon, 
  Clock, 
  Brain, 
  Users, 
  Trophy, 
  Library,
  Settings as SettingsIcon,
  PenTool,
  Languages,
  GraduationCap
} from 'lucide-react';

export const TRANSLATIONS: Record<string, any> = {
  'pt-br': {
    nav: {
      BIBLE: 'Bíblia',
      THEOLOGY: 'Teologia',
      LEXICON: 'Léxico & Sabedoria',
      AI_ASSISTANT: 'Mentor IA',
      MAPS: 'Mapas',
      TIMELINE: 'Linha do Tempo',
      COMMUNITY: 'Comunidade',
      GAMIFICATION: 'Jornada',
      MY_STUDIES: 'Meus Estudos',
      SETTINGS: 'Ajustes',
      ACADEMY: 'Academia'
    },
    common: {
      search: 'Pesquisar...',
      save: 'Salvar',
      close: 'Fechar',
      loading: 'Carregando...',
      xp_gained: 'XP Ganho',
      level: 'Nível'
    }
  },
  'en-us': {
    nav: {
      BIBLE: 'Bible',
      THEOLOGY: 'Theology',
      LEXICON: 'Lexicon & Wisdom',
      AI_ASSISTANT: 'AI Mentor',
      MAPS: 'Maps',
      TIMELINE: 'Timeline',
      COMMUNITY: 'Community',
      GAMIFICATION: 'Journey',
      MY_STUDIES: 'My Studies',
      SETTINGS: 'Settings',
      ACADEMY: 'Academy'
    },
    common: {
      search: 'Search...',
      save: 'Save',
      close: 'Close',
      loading: 'Loading...',
      xp_gained: 'XP Gained',
      level: 'Level'
    }
  }
};

export const THEME_CONFIG = {
  accents: {
    amber: { name: 'Ouro Logos', hex: '#f59e0b', tailwind: 'bg-[#f59e0b]' },
    crimson: { name: 'Carmesim', hex: '#e11d48', tailwind: 'bg-[#e11d48]' },
    purple: { name: 'Púrpura Real', hex: '#9333ea', tailwind: 'bg-[#9333ea]' },
    emerald: { name: 'Verde Éden', hex: '#10b981', tailwind: 'bg-[#10b981]' },
    sky: { name: 'Céu de Israel', hex: '#0ea5e9', tailwind: 'bg-[#0ea5e9]' },
    rose: { name: 'Rose Gold', hex: '#fb7185', tailwind: 'bg-[#fb7185]' }
  },
  themes: {
    dark: { name: 'Noite Profunda', bg: '#020617', soft: '#0f172a', text: '#f8fafc', border: '#1e293b' },
    sepia: { name: 'Manuscrito Sépia', bg: '#1a1714', soft: '#2a241f', text: '#e5e1da', border: '#3d342d' },
    gothic: { name: 'Catedral Azul', bg: '#050a14', soft: '#0a1428', text: '#d1d5db', border: '#1e293b' },
    light: { name: 'Monte Sinai', bg: '#f8fafc', soft: '#f1f5f9', text: '#0f172a', border: '#e2e8f0' },
    oasis: { name: 'Oásis', bg: '#064e3b', soft: '#065f46', text: '#ecfdf5', border: '#059669' },
    imperial: { name: 'Imperial', bg: '#0c0a09', soft: '#1c1917', text: '#fafaf9', border: '#d6d3d1' },
    papyrus: { name: 'Papirus', bg: '#fdf6e3', soft: '#eee8d5', text: '#657b83', border: '#93a1a1' }
  },
  sizes: {
    small: { label: 'Compacto', val: '14px' },
    medium: { label: 'Padrão', val: '16px' },
    large: { label: 'Focado', val: '20px' }
  },
  fonts: {
    serif: { name: 'Serifado Sagrado', family: "'Playfair Display', serif" },
    sans: { name: 'Moderno Logos', family: "'Inter', sans-serif" }
  }
};

export const BIBLE_BOOKS = [
  { name: 'Gênesis', chapters: 50, verses: 1533, testament: 'AT', genre: 'Pentateuco (Lei)', position: 1 },
  { name: 'Êxodo', chapters: 40, verses: 1213, testament: 'AT', genre: 'Pentateuco (Lei)', position: 2 },
  { name: 'Levítico', chapters: 27, verses: 859, testament: 'AT', genre: 'Pentateuco (Lei)', position: 3 },
  { name: 'Números', chapters: 36, verses: 1288, testament: 'AT', genre: 'Pentateuco (Lei)', position: 4 },
  { name: 'Deuteronômio', chapters: 34, verses: 959, testament: 'AT', genre: 'Pentateuco (Lei)', position: 5 },
  { name: 'Josué', chapters: 24, verses: 658, testament: 'AT', genre: 'História', position: 6 },
  { name: 'Juízes', chapters: 21, verses: 618, testament: 'AT', genre: 'História', position: 7 },
  { name: 'Rute', chapters: 4, verses: 85, testament: 'AT', genre: 'História', position: 8 },
  { name: '1 Samuel', chapters: 31, verses: 810, testament: 'AT', genre: 'História', position: 9 },
  { name: '2 Samuel', chapters: 24, verses: 695, testament: 'AT', genre: 'História', position: 10 },
  { name: '1 Reis', chapters: 22, verses: 816, testament: 'AT', genre: 'História', position: 11 },
  { name: '2 Reis', chapters: 25, verses: 719, testament: 'AT', genre: 'História', position: 12 },
  { name: '1 Crônicas', chapters: 29, verses: 942, testament: 'AT', genre: 'História', position: 13 },
  { name: '2 Crônicas', chapters: 36, verses: 822, testament: 'AT', genre: 'História', position: 14 },
  { name: 'Esdras', chapters: 10, verses: 280, testament: 'AT', genre: 'História', position: 15 },
  { name: 'Neemias', chapters: 13, verses: 406, testament: 'AT', genre: 'História', position: 16 },
  { name: 'Ester', chapters: 10, verses: 167, testament: 'AT', genre: 'História', position: 17 },
  { name: 'Jó', chapters: 42, verses: 1070, testament: 'AT', genre: 'Poesia/Sabedoria', position: 18 },
  { name: 'Salmos', chapters: 150, verses: 2461, testament: 'AT', genre: 'Poesia/Sabedoria', position: 19 },
  { name: 'Provérbios', chapters: 31, verses: 915, testament: 'AT', genre: 'Poesia/Sabedoria', position: 20 },
  { name: 'Eclesiastes', chapters: 12, verses: 222, testament: 'AT', genre: 'Poesia/Sabedoria', position: 21 },
  { name: 'Cânticos', chapters: 8, verses: 117, testament: 'AT', genre: 'Poesia/Sabedoria', position: 22 },
  { name: 'Isaías', chapters: 66, verses: 1292, testament: 'AT', genre: 'Profecia (Maiores)', position: 23 },
  { name: 'Jeremias', chapters: 52, verses: 1364, testament: 'AT', genre: 'Profecia (Maiores)', position: 24 },
  { name: 'Lamentações', chapters: 5, verses: 154, testament: 'AT', genre: 'Profecia (Maiores)', position: 25 },
  { name: 'Ezequiel', chapters: 48, verses: 1273, testament: 'AT', genre: 'Profecia (Maiores)', position: 26 },
  { name: 'Daniel', chapters: 12, verses: 357, testament: 'AT', genre: 'Profecia (Maiores)', position: 27 },
  { name: 'Oseias', chapters: 14, verses: 197, testament: 'AT', genre: 'Profecia (Menores)', position: 28 },
  { name: 'Joel', chapters: 3, verses: 73, testament: 'AT', genre: 'Profecia (Menores)', position: 29 },
  { name: 'Amós', chapters: 9, verses: 146, testament: 'AT', genre: 'Profecia (Menores)', position: 30 },
  { name: 'Obadias', chapters: 1, verses: 21, testament: 'AT', genre: 'Profecia (Menores)', position: 31 },
  { name: 'Jonas', chapters: 4, verses: 48, testament: 'AT', genre: 'Profecia (Menores)', position: 32 },
  { name: 'Miqueias', chapters: 7, verses: 105, testament: 'AT', genre: 'Profecia (Menores)', position: 33 },
  { name: 'Naum', chapters: 3, verses: 47, testament: 'AT', genre: 'Profecia (Menores)', position: 34 },
  { name: 'Habacuque', chapters: 3, verses: 56, testament: 'AT', genre: 'Profecia (Menores)', position: 35 },
  { name: 'Sofonias', chapters: 3, verses: 53, testament: 'AT', genre: 'Profecia (Menores)', position: 36 },
  { name: 'Ageu', chapters: 2, verses: 38, testament: 'AT', genre: 'Profecia (Menores)', position: 37 },
  { name: 'Zacarias', chapters: 14, verses: 211, testament: 'AT', genre: 'Profecia (Menores)', position: 38 },
  { name: 'Malaquias', chapters: 4, verses: 55, testament: 'AT', genre: 'Profecia (Menores)', position: 39 },
  { name: 'Mateus', chapters: 28, verses: 1071, testament: 'NT', genre: 'Evangelho', position: 40 },
  { name: 'Marcos', chapters: 16, verses: 678, testament: 'NT', genre: 'Evangelho', position: 41 },
  { name: 'Lucas', chapters: 24, verses: 1151, testament: 'NT', genre: 'Evangelho', position: 42 },
  { name: 'João', chapters: 21, verses: 879, testament: 'NT', genre: 'Evangelho', position: 43 },
  { name: 'Atos', chapters: 28, verses: 1007, testament: 'NT', genre: 'História da Igreja', position: 44 },
  { name: 'Romanos', chapters: 16, verses: 433, testament: 'NT', genre: 'Epístola Paulina', position: 45 },
  { name: '1 Coríntios', chapters: 16, verses: 437, testament: 'NT', genre: 'Epístola Paulina', position: 46 },
  { name: '2 Coríntios', chapters: 13, verses: 257, testament: 'NT', genre: 'Epístola Paulina', position: 47 },
  { name: 'Gálatas', chapters: 6, verses: 149, testament: 'NT', genre: 'Epístola Paulina', position: 48 },
  { name: 'Efésios', chapters: 6, verses: 155, testament: 'NT', genre: 'Epístola Paulina', position: 49 },
  { name: 'Filipenses', chapters: 4, verses: 104, testament: 'NT', genre: 'Epístola Paulina', position: 50 },
  { name: 'Colossenses', chapters: 4, verses: 95, testament: 'NT', genre: 'Epístola Paulina', position: 51 },
  { name: '1 Tessalonicenses', chapters: 5, verses: 89, testament: 'NT', genre: 'Epístola Paulina', position: 52 },
  { name: '2 Tessalonicenses', chapters: 3, verses: 47, testament: 'NT', genre: 'Epístola Paulina', position: 53 },
  { name: '1 Timóteo', chapters: 6, verses: 113, testament: 'NT', genre: 'Epístola Paulina', position: 54 },
  { name: '2 Timóteo', chapters: 4, verses: 83, testament: 'NT', genre: 'Epístola Paulina', position: 55 },
  { name: 'Tito', chapters: 3, verses: 46, testament: 'NT', genre: 'Epístola Paulina', position: 56 },
  { name: 'Filemon', chapters: 1, verses: 25, testament: 'NT', genre: 'Epístola Paulina', position: 57 },
  { name: 'Hebreus', chapters: 13, verses: 303, testament: 'NT', genre: 'Epístola Geral', position: 58 },
  { name: 'Tiago', chapters: 5, verses: 108, testament: 'NT', genre: 'Epístola Geral', position: 59 },
  { name: '1 Pedro', chapters: 5, verses: 105, testament: 'NT', genre: 'Epístola Geral', position: 60 },
  { name: '2 Pedro', chapters: 3, verses: 61, testament: 'NT', genre: 'Epístola Geral', position: 61 },
  { name: '1 João', chapters: 5, verses: 105, testament: 'NT', genre: 'Epístola Geral', position: 62 },
  { name: '2 João', chapters: 1, verses: 13, testament: 'NT', genre: 'Epístola Geral', position: 63 },
  { name: '3 João', chapters: 1, verses: 14, testament: 'NT', genre: 'Epístola Geral', position: 64 },
  { name: 'Judas', chapters: 1, verses: 25, testament: 'NT', genre: 'Epístola Geral', position: 65 },
  { name: 'Apocalipse', chapters: 22, verses: 404, testament: 'NT', genre: 'Profecia/Apocalíptica', position: 66 },
];

export const THEOLOGICAL_PERSPECTIVES: TheologicalPerspective[] = [
  { id: 'systematic', name: 'Teologia Sistemática', description: 'Organização racional e temática das verdades cristãs. Busca a coesão lógica entre os diversos dogmas.', keyPrinciples: ['Bibliologia', 'Antropologia Teológica', 'Soteriologia'], notableFigures: ['Wayne Grudem', 'Louis Berkhof', 'Charles Hodge'] },
  { id: 'biblical', name: 'Teologia Bíblica', description: 'Foca no progresso histórico da revelação. Analisa como Deus se revelou organicamente através das eras.', keyPrinciples: ['História da Redenção', 'Tipologia Adâmica', 'Teologia das Alianças'], notableFigures: ['Geerhardus Vos', 'G.K. Beale', 'Herman Ridderbos'] },
  { id: 'historical', name: 'Teologia Histórica', description: 'O estudo da gênese e desenvolvimento do dogma. Como a Igreja respondeu a heresias através dos concílios.', keyPrinciples: ['Credo Apostólico', 'Patrística de Niceia', 'Escolástica Medieval'], notableFigures: ['Justo González', 'Jaroslav Pelikan', 'Alister McGrath'] },
  { id: 'practical', name: 'Teologia Prática', description: 'A intersecção entre a verdade divina e a práxis humana. Envolve liturgia, educação e ética ministerial.', keyPrinciples: ['Homilética Exegética', 'Cuidado de Almas', 'Missiologia Urbana'], notableFigures: ['Richard Baxter', 'Friedrich Schleiermacher'] },
  { id: 'pastoral', name: 'Teologia Pastoral', description: 'A arte do pastoreio. Foca na liderança serva, aconselhamento bíblico e administração eclesiástica.', keyPrinciples: ['Poimênica', 'Mentoramento Espiritual', 'Liderança Orgânica'], notableFigures: ['Eugene Peterson', 'John Bunyan', 'Gregório o Grande'] },
  { id: 'moral', name: 'Teologia Moral', description: 'O estudo dos princípios éticos que regem a conduct humana sob a luz da revelação bíblica.', keyPrinciples: ['Virtudes Cardinais', 'Lei Natural', 'Bioética Cristã'], notableFigures: ['Tomás de Aquino', 'Santo Agostinho'] },
  { id: 'dogmatic', name: 'Teologia Dogmática', description: 'A apresentação oficial e confessional das doutrinas de uma igreja ou tradição específica.', keyPrinciples: ['Confessionalismo', 'Símbolos de Fé', 'Cânon Normativo'], notableFigures: ['Karl Barth', 'Francis Turretin', 'Herman Bavinck'] },
  { id: 'liturgical', name: 'Teologia Litúrgica', description: 'Reflexão teológica sobre a oração pública, sacramentos e o ritmo de adoração da comunidade.', keyPrinciples: ['Eucaristologia', 'Ano Litúrgico', 'Simbologia Cúltica'], notableFigures: ['Alexander Schmemann', 'Prosper Guéranger'] },
  { id: 'spiritual', name: 'Teologia Espiritual', description: 'Caminho para a união com Deus. Foca na vida interior, disciplinas espirituais e contemplação.', keyPrinciples: ['Ascetismo', 'Via Illuminativa', 'Oração Contemplativa'], notableFigures: ['João da Cruz', 'Teresa de Ávila', 'Thomas Merton'] },
  { id: 'patristic', name: 'Teologia Patrística', description: 'O pensamento dos primeiros séculos. A fundação trinitária e cristológica da igreja primitiva.', keyPrinciples: ['Homoousios', 'Theotokos', 'União Hipostática'], notableFigures: ['Atanásio', 'Basílio o Grande', 'Orígenes'] },
  { id: 'reformed', name: 'Teologia Reformada', description: 'Herança de Calvino e Knox. Enfatiza a soberania absoluta de Deus e a depravação total do homem.', keyPrinciples: ['Cinco Solas', 'TULIP', 'Teologia da Aliança'], notableFigures: ['João Calvino', 'R.C. Sproul', 'John Knox'] },
  { id: 'pentecostal', name: 'Teologia Pentecostal', description: 'Ênfase na contemporaneidade dos dons e na experiência direta com o Espírito Santo.', keyPrinciples: ['Batismo no Espírito', 'Glossolalia', 'Restauracionismo'], notableFigures: ['William J. Seymour', 'Donald Gee', 'Gordon Fee'] },
  { id: 'catholic', name: 'Teologia Católica', description: 'Tradição, Magistério e Escritura. Uma visão sacramental da realidade e sucessão apostólica.', keyPrinciples: ['Infalibilidade Papal', 'Purgatório', 'Mariologia'], notableFigures: ['Bento XVI', 'Karl Rahner', 'Hans Urs von Balthasar'] },
  { id: 'orthodox', name: 'Teologia Ortodoxa', description: 'A teologia oriental focada na beleza, mistério e na deificação do ser humano (Theosis).', keyPrinciples: ['Theosis', 'Iconologia', 'Energias Incriadas'], notableFigures: ['Gregório Palamas', 'Vladimir Lossky'] },
  { id: 'contextual', name: 'Teologia Contextual', description: 'A análise da fé a partir das realidades socioculturais e políticas locais.', keyPrinciples: ['Enculturação', 'Interculturalidade', 'Locus Teológico'], notableFigures: ['Stephen Bevans', 'Robert Schreiter'] },
  { id: 'feminist', name: 'Teologia Feminista', description: 'Releitura das escrituras focada na dignidade, igualdade e papel profético da mulher.', keyPrinciples: ['Justiça de Gênero', 'Sophia-Deus', 'Hermenêutica da Suspeita'], notableFigures: ['Elisabeth Schüssler Fiorenza', 'Mary Daly'] },
  { id: 'liberation', name: 'Teologia da Libertação', description: 'A fé lida a partir do sofrimento dos pobres. Busca a libertação integral do ser humano.', keyPrinciples: ['Opção pelos Pobres', 'Práxis Libertadora', 'Estruturas de Pecado'], notableFigures: ['Gustavo Gutiérrez', 'Leonardo Boff', 'Jon Sobrino'] },
  { id: 'apologetic', name: 'Teologia Apologética', description: 'A defesa intelectual da fé cristã contra objeções filosóficas e científicas.', keyPrinciples: ['Evidencialismo', 'Pressuposicionalismo', 'Teodiceia'], notableFigures: ['C.S. Lewis', 'William Lane Craig', 'Cornelius Van Til'] },
  { id: 'eschatological', name: 'Teologia Escatológica', description: 'O estudo da esperança final. Morte, juízo e a restauração de todas as coisas.', keyPrinciples: ['Milênio', 'Parousia', 'Novo Céu e Nova Terra'], notableFigures: ['Jürgen Moltmann', 'N.T. Wright'] },
  { id: 'missiological', name: 'Teologia Missiolária', description: 'A natureza missionária da Igreja. Estratégias para a proclamação do evangelho globalmente.', keyPrinciples: ['Missio Dei', 'Contextualização', 'Plantagem de Igrejas'], notableFigures: ['Lesslie Newbigin', 'David Bosch'] },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  // DISPENSAÇÃO DA INOCÊNCIA
  { 
    year: '4004 AC', 
    title: 'Criação e Queda', 
    description: 'Início da humanidade e a entrada do pecado no mundo.', 
    category: 'Biblical',
    dispensation: 'Innocence',
    covenant: 'Aliança Adâmica',
    sources: [
      { type: 'Biblical', title: 'Gênesis 1-3', reference: 'A criação e a expulsão do Éden.' }
    ]
  },
  // DISPENSAÇÃO DA CONSCIÊNCIA
  { 
    year: '3870 AC', 
    title: 'Caim e Abel', 
    description: 'O primeiro homicídio e a divisão das linhagens humanas.', 
    category: 'Biblical',
    dispensation: 'Conscience',
    sources: [{ type: 'Biblical', title: 'Gênesis 4', reference: 'O sacrifício e a queda de Caim.' }]
  },
  { 
    year: '2348 AC', 
    title: 'O Dilúvio', 
    description: 'Juízo universal de Deus e o recomeço através da família de Noé.', 
    category: 'Biblical',
    dispensation: 'Conscience',
    covenant: 'Aliança Noética',
    sources: [{ type: 'Biblical', title: 'Gênesis 6-9', reference: 'A arca e o sinal do arco-íris.' }]
  },
  // DISPENSAÇÃO DO GOVERNO HUMANO
  { 
    year: '2200 AC', 
    title: 'Torre de Babel', 
    description: 'A confusão das línguas e a dispersão das nações pelo mundo.', 
    category: 'Biblical',
    dispensation: 'Human Government',
    sources: [{ type: 'Biblical', title: 'Gênesis 11', reference: 'O julgamento contra a soberba humana.' }]
  },
  // DISPENSAÇÃO DA PROMESSA
  { 
    year: '2100 AC', 
    title: 'Chamada de Abraão', 
    description: 'Início da linhagem de Israel através de Ur dos Caldeus.', 
    category: 'Biblical',
    dispensation: 'Promise',
    covenant: 'Aliança Abraâmica',
    sources: [
      { type: 'Biblical', title: 'Gênesis 12', reference: 'A promessa da terra e da descendência.' },
      { type: 'Archaeological', title: 'Ur dos Caldeus', reference: 'Sir Leonard Woolley (Escavações sumérias).' }
    ]
  },
  { 
    year: '1876 AC', 
    title: 'Descida ao Egito', 
    description: 'José no Egito e a preservação do povo escolhido durante a fome.', 
    category: 'Biblical',
    dispensation: 'Promise',
    sources: [{ type: 'Biblical', title: 'Gênesis 37-50', reference: 'A providência divina no Egito.' }]
  },
  // DISPENSAÇÃO DA LEI
  { 
    year: '1446 AC', 
    title: 'O Êxodo', 
    description: 'Libertação do Egito e a entrega dos Dez Mandamentos no Sinai.', 
    category: 'Biblical',
    dispensation: 'Law',
    covenant: 'Aliança Mosaica',
    sources: [{ type: 'Biblical', title: 'Êxodo 1-20', reference: 'A Páscoa e a Lei.' }]
  },
  { 
    year: '1010 AC', 
    title: 'Reinado de Davi', 
    description: 'Estabelecimento da monarquia em Jerusalém.', 
    category: 'Biblical',
    dispensation: 'Law',
    covenant: 'Aliança Davídica',
    sources: [{ type: 'Archaeological', title: 'Tel Dan Stele', reference: 'Menciona a Casa de Davi.' }]
  },
  { 
    year: '586 AC', 
    title: 'Cativeiro Babilônico', 
    description: 'Destruição do primeiro templo e o exílio em Babilônia.', 
    category: 'Historical',
    dispensation: 'Law',
    sources: [{ type: 'Historical', title: 'Nabopolassar Chronicles', reference: 'Registros oficiais da conquista.' }]
  },
  { 
    year: '400 AC', 
    title: 'Período Intertestamentário', 
    description: '400 anos de silêncio profético entre Malaquias e Mateus.', 
    category: 'Historical',
    dispensation: 'Law',
    sources: [{ type: 'Historical', title: 'Macabeus', reference: 'A revolta contra os selêucidas.' }]
  },
  // DISPENSAÇÃO DA GRAÇA
  { 
    year: '4 AC', 
    title: 'Nascimento de Cristo', 
    description: 'A encarnação do Verbo e o cumprimento das promessas messiânicas.', 
    category: 'Biblical',
    dispensation: 'Grace',
    covenant: 'Nova Aliança',
    sources: [{ type: 'Biblical', title: 'Mateus 1, Lucas 2', reference: 'O nascimento em Belém.' }]
  },
  { 
    year: '30 DC', 
    title: 'Pentecoste', 
    description: 'A descida do Espírito Santo e o início da Igreja.', 
    category: 'Biblical',
    dispensation: 'Grace',
    sources: [{ type: 'Biblical', title: 'Atos 2', reference: 'O nascimento espiritual do Corpo de Cristo.' }]
  },
  { 
    year: '1517 DC', 
    title: 'Reforma Protestante', 
    description: 'Recuperação da doutrina da Sola Fide por Martinho Lutero.', 
    category: 'Historical',
    dispensation: 'Grace',
    sources: [{ type: 'Academic', title: '95 Teses', reference: 'Martinho Lutero.' }]
  },
  // DISPENSAÇÃO DO REINO (PROFÉTICO)
  { 
    year: 'Futuro', 
    title: 'Milênio', 
    description: 'O reinado de 1000 anos de Cristo sobre a Terra.', 
    category: 'Biblical',
    dispensation: 'Kingdom',
    sources: [{ type: 'Biblical', title: 'Apocalipse 20', reference: 'O reinado messiânico final.' }]
  },
];

export const NAV_ITEMS = [
  { id: 'BIBLE', label: 'Bíblia', icon: BookOpen },
  { id: 'THEOLOGY', label: 'Teologia', icon: Library },
  { id: 'LEXICON', label: 'Léxico & Sabedoria', icon: Languages },
  { id: 'ACADEMY', label: 'Academia', icon: GraduationCap },
  { id: 'AI_ASSISTANT', label: 'Mentor IA', icon: Brain },
  { id: 'MAPS', label: 'Mapas', icon: MapIcon },
  { id: 'TIMELINE', label: 'Linha do Tempo', icon: Clock },
  { id: 'COMMUNITY', label: 'Comunidade', icon: Users },
  { id: 'GAMIFICATION', label: 'Jornada', icon: Trophy },
  { id: 'MY_STUDIES', label: 'Meus Estudos', icon: PenTool },
  { id: 'SETTINGS', label: 'Ajustes', icon: SettingsIcon },
];

export const STRONGS_DICTIONARY: Record<string, any> = {
  "G3056": {
    word: "Logos",
    original: "λόγος logos",
    pronunciation: "ló-gos",
    number: "G3056",
    definition: "Palavra, verbo, discurso, a expression do pensamento inteligente. Em João 1:1, refere-se à segunda pessoa da Trindade.",
    etymology: "Da raiz 'legó' (falar, contar, organizar)."
  },
  "G26": {
    word: "Agapé",
    original: "ἀγάπη agapē",
    pronunciation: "a-ga-pe",
    number: "G26",
    definition: "Amor sacrificial, incondicional, a natureza essencial de Deus. Distinto de eros ou philia.",
    etymology: "Da raiz 'agapaó' (estimar profundamente)."
  },
  "G4151": {
    word: "Pneuma",
    original: "πνεῦμα pneuma",
    pronunciation: "pnév-ma",
    number: "G4151",
    definition: "Espírito, fôlego, vento, a parte imaterial do homem. Usado para o Espírito Santo (Hagios Pneuma).",
    etymology: "De 'pneó' (soprar)."
  },
  "G5485": {
    word: "Charis",
    original: "χάρις charis",
    pronunciation: "khá-ris",
    number: "G5485",
    definition: "Graça, favor imerecido, benevolência divina que traz salvação e sustento.",
    etymology: "De 'chairó' (alegrar-se)."
  },
  "G2842": {
    word: "Koinonia",
    original: "κοινωνία koinōnia",
    pronunciation: "koi-no-ní-a",
    number: "G2842",
    definition: "Comunhão, participação mútua, parceria espiritual íntima.",
    etymology: "De 'koinos' (comum)."
  },
  "G1577": {
    word: "Ekklesia",
    original: "ἐκκλησία ekklēsia",
    pronunciation: "ek-kle-sí-a",
    number: "G1577",
    definition: "Assembleia, igreja, os chamados para fora do mundo para Deus.",
    etymology: "De 'ek' (fora) e 'kaleó' (chamar)."
  },
  "H7225": {
    word: "Bereshit",
    original: "בְּרֵאשִׁית",
    pronunciation: "be-re-shít",
    number: "H7225",
    definition: "No princípio, primazia, o começo de uma série histórica ou ontológica.",
    etymology: "De 'rosh' (cabeça, topo, primeiro)."
  },
  "H430": {
    word: "Elohim",
    original: "אֱλֹhím",
    pronunciation: "e-lo-hím",
    number: "H430",
    definition: "Deus, Juiz, Supremo, Criador. Usado no plural majestático para indicar plenitude de poder.",
    etymology: "De 'Eloah' (poderoso)."
  },
  "H7706": {
    word: "Shaddai",
    original: "שַׁדַּי",
    pronunciation: "sha-dái",
    number: "H7706",
    definition: "Todo-Poderoso, Auto-Suficiente. Frequentemente usado como El Shaddai.",
    etymology: "Possivelmente de 'shad' (seio/sustento) ou 'shadad' (poder)."
  },
  "H7965": {
    word: "Shalom",
    original: "שָׁלוֹם",
    pronunciation: "sha-lóm",
    number: "H7965",
    definition: "Paz, integridade, bem-estar, prosperidade, ausência de conflito.",
    etymology: "De 'shalam' (ser completo)."
  },
  "H5769": {
    word: "Olam",
    original: "עוֹλָם",
    pronunciation: "o-lám",
    number: "H5769",
    definition: "Eternidade, perpétuo, tempo imemorial, mundo.",
    etymology: "De 'alam' (esconder/obscuro)."
  },
  "H1254": {
    word: "Bara",
    original: "בָּרָא",
    pronunciation: "ba-rá",
    number: "H1254",
    definition: "Criar, produzir a partir do nada (ex-nihilo). Atividade exclusiva de Deus nas Escrituras.",
    etymology: "Raiz primitiva."
  }
};

export const HISTORICAL_QUOTES: Quote[] = [
  { author: 'Charles Spurgeon', text: 'A Bíblia não é a luz do mundo, é a luz da Igreja. Mas o mundo não pode viver sem a luz da Igreja.' },
  { author: 'Charles Spurgeon', text: 'O discernimento não é apenas saber a diferença entre o certo e o errado, mas entre o certo e o quase certo.' },
  { author: 'A.W. Tozer', text: 'O que vem à nossa mente quando pensamos sobre Deus é a coisa mais importante sobre nós.' },
  { author: 'Martinho Lutero', text: 'Fiz muitas coisas por mim mesmo, mas tudo o que fiz para Deus, Ele mesmo fez através de mim.' },
  { author: 'Agostinho de Hipona', text: 'Fizeste-nos para Ti, Senhor, e o nosso coração está inquieto enquanto não repousar em Ti.' },
  { author: 'C.S. Lewis', text: 'Acredito no Cristianismo como acredito que o sol nasceu: não apenas porque o vejo, mas porque por meio dele vejo tudo o mais.' }
];

export const COMMUNITY_MESSAGES: Message[] = [
  { id: '1', user: 'Pr. André', text: 'Bom dia a todos! O que vocês acham da expressão "Abba" em Romanos 8:15?', timestamp: '09:00', avatar: 'https://i.pravatar.cc/150?u=andre' },
  { id: '2', user: 'Maria S.', text: 'É uma expressão de intimidade profunda, quase como "Papai" em português.', timestamp: '09:05', avatar: 'https://i.pravatar.cc/150?u=maria' },
  { id: '3', user: 'João Silva', text: 'Exatamente. Mostra nossa adoção como filhos de Deus.', timestamp: '09:10', avatar: 'https://i.pravatar.cc/150?u=joao' },
];
