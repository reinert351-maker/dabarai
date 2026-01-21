
import { TheologicalPerspective, Quote, TimelineEvent, Message, ViewMode, StrongEntry } from './types';
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
  // 1. INOCÊNCIA (Da Criação à Queda)
  { year: '4004 AC', title: 'Criação do Éden', description: 'Deus estabelece o homem em estado de perfeição original e comunhão direta no Jardim.', category: 'Biblical', dispensation: 'Innocence' },
  { year: '4004 AC', title: 'A Queda do Homem', description: 'Entrada do pecado no mundo. Promessa do Redentor (Gênesis 3:15).', category: 'Biblical', dispensation: 'Innocence' },

  // 2. CONSCIÊNCIA (Da Queda ao Dilúvio)
  { year: '3875 AC', title: 'Caim e Abel', description: 'O primeiro homicídio revela a corrupção da consciência humana sem Deus.', category: 'Biblical', dispensation: 'Conscience' },
  { year: '3317 AC', title: 'Metusalém', description: 'O homem que mais viveu na história bíblica (969 anos).', category: 'Biblical', dispensation: 'Conscience' },
  { year: '3017 AC', title: 'Trasladação de Enoque', description: 'Enoque caminha com Deus e é levado para o céu sem ver a morte.', category: 'Biblical', dispensation: 'Conscience' },
  { year: '2348 AC', title: 'O Grande Dilúvio', description: 'Juízo universal sobre a maldade humana. Preservação da família de Noé.', category: 'Biblical', dispensation: 'Conscience' },

  // 3. GOVERNO HUMANO (Do Dilúvio a Babel)
  { year: '2347 AC', title: 'Aliança Noética', description: 'Estabelecimento do arco-íris como sinal de que a terra não seria mais destruída por água.', category: 'Biblical', dispensation: 'Human Government' },
  { year: '2247 AC', title: 'Torre de Babel', description: 'Soberba humana e confusão das línguas. Origem das nações e culturas.', category: 'Biblical', dispensation: 'Human Government' },
  { year: '2100 AC', title: 'Zigurates Sumérios', description: 'Registros arqueológicos de torres similares à de Babel na Mesopotâmia.', category: 'Archaeological', dispensation: 'Human Government' },

  // 4. PROMESSA (De Abraão ao Egito)
  { year: '1996 AC', title: 'Chamado de Abraão', description: 'Deus inicia uma linhagem específica através da fé. Promessa de terra e descendência.', category: 'Biblical', dispensation: 'Promise' },
  { year: '1897 AC', title: 'Juízo sobre Sodoma', description: 'Destruição das cidades da planície devido à corrupção moral extrema.', category: 'Biblical', dispensation: 'Promise' },
  { year: '1800 AC', title: 'Código de Hamurabi', description: 'Março histórico legal contemporâneo ao período dos patriarcas.', category: 'Historical', dispensation: 'Promise' },
  { year: '1706 AC', title: 'Israel no Egito', description: 'Jacó e seus filhos descem ao Egito sob a providência de José.', category: 'Biblical', dispensation: 'Promise' },

  // 5. LEI (Do Sinai a Cristo)
  { year: '1446 AC', title: 'O Êxodo', description: 'Libertação miraculosa de Israel do Egito através das Dez Pragas.', category: 'Biblical', dispensation: 'Law' },
  { year: '1446 AC', title: 'A Lei no Sinai', description: 'Entrega dos Dez Mandamentos e o sistema sacrificial do Tabernáculo.', category: 'Biblical', dispensation: 'Law' },
  { year: '1406 AC', title: 'Conquista de Canaã', description: 'Queda de Jericó e estabelecimento das 12 tribos sob Josué.', category: 'Biblical', dispensation: 'Law' },
  { year: '1208 AC', title: 'Estela de Merneptah', description: 'Primeira menção arqueológica externa da nação de Israel.', category: 'Archaeological', dispensation: 'Law' },
  { year: '1010 AC', title: 'Império Davídico', description: 'Era de ouro de Israel. Estabelecimento do pacto com a casa de Davi.', category: 'Biblical', dispensation: 'Law' },
  { year: '960 AC', title: 'Templo de Salomão', description: 'Construção do Primeiro Templo, centro da adoração teocrática.', category: 'Biblical', dispensation: 'Law' },
  { year: '586 AC', title: 'Exílio Babilônico', description: 'Destruição de Jerusalém por Nabucodonosor. Fim do Reino de Judá.', category: 'Historical', dispensation: 'Law' },
  { year: '400 AC', title: 'Silêncio Profético', description: 'Período intertestamentário entre Malaquias e João Batista.', category: 'Historical', dispensation: 'Law' },

  // 6. GRAÇA (De Pentecostes ao Arrebatamento)
  { year: '5 AC', title: 'Nascimento do Logos', description: 'Encarnação de Jesus Cristo em Belém. Cumprimento das profecias.', category: 'Biblical', dispensation: 'Grace' },
  { year: '30 DC', title: 'A Cruz e Ressurreição', description: 'Obra consumada de redenção. Fim do domínio da Lei e início da Graça.', category: 'Biblical', dispensation: 'Grace' },
  { year: '30 DC', title: 'Pentecostes', description: 'Descida do Espírito Santo e nascimento da Igreja Primitiva.', category: 'Biblical', dispensation: 'Grace' },
  { year: '70 DC', title: 'Diáspora Judaica', description: 'Destruição do Segundo Templo por Roma sob o general Tito.', category: 'Historical', dispensation: 'Grace' },
  { year: '325 DC', title: 'Concílio de Niceia', description: 'Definição doutrinária da divindade de Cristo contra o Arianismo.', category: 'Historical', dispensation: 'Grace' },
  { year: '1517 DC', title: 'Reforma Protestante', description: 'Resgate das doutrinas da Sola Fide e Sola Scriptura por Lutero.', category: 'Historical', dispensation: 'Grace' },
  { year: '1947 DC', title: 'Manuscritos de Qumran', description: 'A maior descoberta arqueológica bíblica no Mar Morto.', category: 'Archaeological', dispensation: 'Grace' },
  { year: '1948 DC', title: 'Renascimento de Israel', description: 'Restauração política de Israel, preparando o cenário escatológico.', category: 'Historical', dispensation: 'Grace' },

  // 7. REINO (Milênio e Eternidade)
  { year: 'Iminente', title: 'Arrebatamento', description: 'Encontro da Igreja com Cristo nos ares antes da Tribulação.', category: 'Biblical', dispensation: 'Kingdom' },
  { year: 'Futuro', title: 'Grande Tribulação', description: 'Período de 7 anos de juízos divinos sobre a rebelião humana.', category: 'Biblical', dispensation: 'Kingdom' },
  { year: 'Futuro', title: 'O Milênio', description: 'Reinado literal de 1000 anos de Cristo sobre a terra a partir de Jerusalém.', category: 'Biblical', dispensation: 'Kingdom' },
  { year: 'Futuro', title: 'Estado Eterno', description: 'Novos Céus e Nova Terra. Comunhão eterna de Deus com Seu povo.', category: 'Biblical', dispensation: 'Kingdom' }
];

export const COMMUNITY_MESSAGES: Message[] = [
  { id: '1', user: 'Logos Bot', text: 'Bem-vindo ao centro do Logos! Aqui compartilhamos sabedoria.', timestamp: 'Agora', avatar: 'https://i.pravatar.cc/150?u=bot' }
];
