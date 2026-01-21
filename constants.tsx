
import { TheologicalPerspective, Quote, TimelineEvent, Message, ViewMode, StrongEntry } from './types.ts';
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
  GraduationCap,
  Scan,
  Mic,
  Split,
  Box,
  GitMerge,
  Gavel,
  Share2,
  Wind,
  Music,
  Zap,
  ShoppingBag,
  BookMarked
} from 'lucide-react';

export const THEME_CONFIG = {
  themes: {
    light: { name: 'Luz Divina' },
    dark: { name: 'Escuridão Profunda' },
    sepia: { name: 'Papiro Antigo' },
    midnight: { name: 'Abissal (OLED)' },
    forest: { name: 'Éden (Verde)' },
    royal: { name: 'Majestade (Roxo)' },
    ocean: { name: 'Oceano (Azul)' }
  },
  fonts: {
    serif: { name: 'Clássica (Serif)' },
    sans: { name: 'Moderna (Sans)' }
  }
};

export const NAV_ITEMS = [
  { id: 'BIBLE', label: 'Bíblia', icon: BookOpen },
  { id: 'PRISM', label: 'DABAR Prism', icon: Zap },
  { id: 'THEOLOGY', label: 'Teologia & Livraria', icon: Library },
  { id: 'DEBATES', label: 'Concílio Virtual', icon: Gavel },
  { id: 'NETWORK', label: 'Teia do Logos', icon: Share2 },
  { id: 'ATLAS', label: 'Atlas Imersivo', icon: Wind },
  { id: 'MELOS', label: 'DABAR Melos', icon: Music },
  { id: 'VISION', label: 'DABAR Vision', icon: Scan },
  { id: 'VOICE', label: 'DABAR Voice', icon: Mic },
  { id: 'HARMONY', label: 'Harmonia Evangelhos', icon: GitMerge },
  { id: 'VARIANTS', label: 'Variantes', icon: Split },
  { id: 'ARCHEOLOGY_360', label: 'Imersão 360', icon: Box },
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

export const MY_EBOOKS = [
  { id: 1, title: "Babilônia: Do Império à Queda Final", price: "Consulte", link: "https://clubedeautores.com.br/livro/babilonia-do-imperio-a-queda-final", cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400", description: "Análise profética sobre o sistema babilônico na história." },
  { id: 2, title: "Astronauteens", price: "Consulte", link: "https://clubedeautores.com.br/livro/astronauteens", cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400", description: "Fé e ciência em uma jornada pelo cosmos." },
  { id: 3, title: "O Celular é o Meu Pastor 2", price: "Consulte", link: "https://clubedeautores.com.br/livro/o-celular-e-o-meu-pastor-2", cover: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400", description: "Espiritualidade na era da hiperconexão." },
  { id: 4, title: "Transforme suas Ações em Adoração", price: "Consulte", link: "https://clubedeautores.com.br/livro/transforme-suas-acoes-em-adoracao", cover: "https://images.unsplash.com/photo-1529070532901-ba8c1825528a?auto=format&fit=crop&q=80&w=400", description: "Guia prático para uma vida consagrada." },
  { id: 5, title: "Salmo 119: Verso por Verso", price: "Consulte", link: "https://clubedeautores.com.br/livro/salmo-119-verso-por-verso", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400", description: "Exegese profunda do maior capítulo da Bíblia." }
];

export const THEOLOGICAL_PERSPECTIVES: TheologicalPerspective[] = [
  { id: 'reformada', name: 'Reforma Protestante', description: 'Centrada nas cinco Solas e na soberania absoluta de Deus.', keyPrinciples: ['Sola Scriptura', 'Graça Irresistível', 'Predestinação'], notableFigures: ['Calvino', 'Lutero'] },
  { id: 'pentecostal', name: 'Pentecostalismo Clássico', description: 'Ênfase no batismo no Espírito Santo e dons espirituais.', keyPrinciples: ['Glosolalia', 'Atualidade dos Dons', 'Avivamento'], notableFigures: ['Seymour', 'Parham'] },
  { id: 'patristica', name: 'Patrística', description: 'O pensamento dos Pais da Igreja dos primeiros séculos.', keyPrinciples: ['Ortodoxia', 'Credos Ecumênicos', 'Apostolicidade'], notableFigures: ['Agostinho', 'Irineu'] },
  { id: 'arminiana', name: 'Arminianismo', description: 'Foco no livre-arbítrio e na graça preveniente de Deus.', keyPrinciples: ['Livre Escolha', 'Expiação Ilimitada', 'Resistibilidade'], notableFigures: ['Arminius', 'Wesley'] },
  { id: 'dispensacionalista', name: 'Dispensacionalismo', description: 'Visão da história dividida em eras ou dispensações.', keyPrinciples: ['Distinção Israel/Igreja', 'Arrebatamento', 'Escatologia Literal'], notableFigures: ['Darby', 'Scofield'] },
];

export const HISTORICAL_QUOTES: Quote[] = [
  { author: 'Charles Spurgeon', text: 'A Bíblia não é a luz do mundo, é a luz da Igreja.', category: 'Bíblia' },
  { author: 'Martinho Lutero', text: 'A Bíblia é uma erva; quanto mais você a manuseia, mais fragrância ela exala.', category: 'Bíblia' },
  { author: 'João Calvino', text: 'O coração do homem é uma fábrica de ídolos.', category: 'Coração' },
  { author: 'Santo Agostinho', text: 'Fizeste-nos para Ti, e o nosso coração está inquieto enquanto não descansar em Ti.', category: 'Descanso' },
];

export const BIBLE_BOOKS = [
  { name: 'Gênesis', chapters: 50, verses: 1533, testament: 'AT', genre: 'Pentateuco', author: 'Moisés', year: '~1445 AC', position: 1 },
  { name: 'Êxodo', chapters: 40, verses: 1213, testament: 'AT', genre: 'Pentateuco', author: 'Moisés', year: '~1440 AC', position: 2 },
  { name: 'Mateus', chapters: 28, verses: 1071, testament: 'NT', genre: 'Evangelho', author: 'Mateus', year: '~60 DC', position: 40 },
  { name: 'Apocalipse', chapters: 22, verses: 404, testament: 'NT', genre: 'Profecia', author: 'João', year: '~95 DC', position: 66 },
];

export const TRANSLATIONS: Record<string, any> = {
  'pt-br': {
    nav: {
      BIBLE: 'Bíblia', THEOLOGY: 'Teologia & Livraria', LEXICON: 'Léxico & Sabedoria',
      AI_ASSISTANT: 'Mentor IA', MAPS: 'Mapas', TIMELINE: 'Linha do Tempo',
      COMMUNITY: 'Comunidade', GAMIFICATION: 'Jornada', MY_STUDIES: 'Scriptorium',
      SETTINGS: 'Ajustes', ACADEMY: 'Academia', VISION: 'DABAR Vision',
      VOICE: 'DABAR Voice', VARIANTS: 'Variantes', ARCHEOLOGY_360: 'Imersão 360',
      HARMONY: 'Harmonia', DEBATES: 'Concílios', NETWORK: 'Conexões',
      ATLAS: 'Atlas Imersivo', MELOS: 'DABAR Melos', PRISM: 'DABAR Prism'
    },
    common: { search: 'Pesquisar...', save: 'Salvar', close: 'Fechar', loading: 'Carregando...', xp_gained: 'XP Ganho', level: 'Nível' }
  }
};

export const STRONGS_DICTIONARY: Record<string, StrongEntry> = {
  'G3056': { word: 'Logos', original: 'λόγος', pronunciation: 'log-os', number: 'G3056', definition: 'A palavra, o Verbo divino, razão expressa ou o pensamento manifestado através da fala.', etymology: 'Do grego "lego" (falar).' },
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  // 1. INOCÊNCIA (Gênesis 1:1 - 3:7)
  { year: '4004 AC', title: 'Criação e o Éden', description: 'Deus estabelece o homem em perfeição. Início da dispensação da Inocência.', category: 'Biblical', dispensation: 'Innocence', covenant: 'Pacto Adâmico' },
  { year: '4004 AC', title: 'A Queda', description: 'A entrada do pecado e a expulsão do Éden. Promessa do Redentor (Gn 3:15).', category: 'Biblical', dispensation: 'Innocence' },

  // 2. CONSCIÊNCIA (Gênesis 3:8 - 8:22)
  { year: '3875 AC', title: 'Caim e Abel', description: 'O primeiro homicídio revela a corrupção da consciência humana sem o governo divino direto.', category: 'Biblical', dispensation: 'Conscience' },
  { year: '3017 AC', title: 'Trasladação de Enoque', description: 'Enoque caminha com Deus e é levado, tipificando o arrebatamento.', category: 'Biblical', dispensation: 'Conscience' },
  { year: '2348 AC', title: 'O Grande Dilúvio', description: 'Juízo universal sobre a maldade humana. Preservação da família de Noé.', category: 'Biblical', dispensation: 'Conscience' },

  // 3. GOVERNO HUMANO (Gênesis 9:1 - 11:32)
  { year: '2347 AC', title: 'Aliança Noética', description: 'Estabelecimento do Governo Humano e a promessa do arco-íris.', category: 'Biblical', dispensation: 'Human Government', covenant: 'Pacto Noético' },
  { year: '2247 AC', title: 'Torre de Babel', description: 'Soberba humana e confusão das línguas. Origem das nações.', category: 'Biblical', dispensation: 'Human Government' },
  { year: '2100 AC', title: 'Zigurates de Ur', description: 'Registros arqueológicos confirmam o desenvolvimento de centros religiosos na Mesopotâmia.', category: 'Archaeological', dispensation: 'Human Government' },

  // 4. PROMESSA (Gênesis 12:1 - Êxodo 18:27)
  { year: '1996 AC', title: 'Chamado de Abraão', description: 'Início da dispensação da Promessa. Deus escolhe um povo.', category: 'Biblical', dispensation: 'Promise', covenant: 'Pacto Abraâmico' },
  { year: '1850 AC', title: 'Patriarcas em Canaã', description: 'Isaque e Jacó consolidam a herança da terra prometida.', category: 'Biblical', dispensation: 'Promise' },
  { year: '1706 AC', title: 'José no Egito', description: 'A providência de Deus preserva o povo de Israel durante a fome.', category: 'Biblical', dispensation: 'Promise' },

  // 5. LEI (Êxodo 19:1 - Atos 1:26)
  { year: '1446 AC', title: 'O Êxodo e o Sinai', description: 'Entrega da Lei e o Tabernáculo. Israel se torna uma teocracia.', category: 'Biblical', dispensation: 'Law', covenant: 'Pacto Mosaicista' },
  { year: '1010 AC', title: 'Reino de Davi', description: 'Unificação de Israel e a promessa de um trono eterno para o Messias.', category: 'Biblical', dispensation: 'Law', covenant: 'Pacto Davídico' },
  { year: '586 AC', title: 'Exílio Babilônico', description: 'Juízo sobre Israel e Judá. Destruição do Primeiro Templo.', category: 'Historical', dispensation: 'Law' },
  { year: '167 AC', title: 'Revolta Macabeia', description: 'Luta pela purificação do Templo contra a profanação helênica.', category: 'Historical', dispensation: 'Law' },

  // 6. GRAÇA (Atos 2:1 - Apocalipse 19:21)
  { year: '5 AC', title: 'Nascimento de Cristo', description: 'A encarnação do Logos. O cumprimento das profecias messiânicas.', category: 'Biblical', dispensation: 'Grace' },
  { year: '30 DC', title: 'Morte e Ressurreição', description: 'Consumação da obra redentora. Início da Nova Aliança.', category: 'Biblical', dispensation: 'Grace', covenant: 'Nova Aliança' },
  { year: '30 DC', title: 'Pentecostes', description: 'Descida do Espírito Santo e nascimento da Igreja.', category: 'Biblical', dispensation: 'Grace' },
  { year: '1517 DC', title: 'Reforma Protestante', description: 'Resgate da Sola Scriptura e Sola Fide na Europa.', category: 'Historical', dispensation: 'Grace' },
  { year: '1948 DC', title: 'Restauração de Israel', description: 'Renascimento do Estado de Israel, preparando o cenário escatológico.', category: 'Historical', dispensation: 'Grace' },

  // 7. REINO (Apocalipse 20:1 - 20:15)
  { year: 'Iminente', title: 'O Arrebatamento', description: 'Esperança da Igreja. A remoção dos santos antes da Grande Tribulação.', category: 'Biblical', dispensation: 'Kingdom' },
  { year: 'Futuro', title: 'O Milênio', description: 'Reinado literal de 1000 anos de Cristo sobre a terra a partir de Jerusalém.', category: 'Biblical', dispensation: 'Kingdom' },
  { year: 'Eterno', title: 'Novos Céus e Nova Terra', description: 'A consumação final e a habitação eterna de Deus com o Seu povo.', category: 'Biblical', dispensation: 'Kingdom' }
];

export const COMMUNITY_MESSAGES: Message[] = [
  { id: '1', user: 'Logos Bot', text: 'Bem-vindo ao centro do Logos! Aqui compartilhamos sabedoria.', timestamp: 'Agora', avatar: 'https://i.pravatar.cc/150?u=bot' }
];
