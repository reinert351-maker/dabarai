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
  { id: 'luterana', name: 'Luteranismo', description: 'A teologia da cruz e a distinção entre Lei e Evangelho.', keyPrinciples: ['Justificação pela Fé', 'Consubstanciação', 'Dois Reinos'], notableFigures: ['Lutero', 'Melanchthon'] },
  { id: 'anglicana', name: 'Anglicanismo', description: 'A Via Media entre o catolicismo e o protestantismo.', keyPrinciples: ['Book of Common Prayer', 'Episcopado', 'Liturgia'], notableFigures: ['Cranmer', 'C.S. Lewis'] },
  { id: 'anabatista', name: 'Anabatismo', description: 'Radicalismo na separação entre Igreja e Estado.', keyPrinciples: ['Credobatismo', 'Pacifismo', 'Comunidade'], notableFigures: ['Menno Simons'] },
  { id: 'escolastica', name: 'Escolástica', description: 'A síntese entre a foi cristã e a lógica aristotélica.', keyPrinciples: ['Razão e Fé', 'Tomismo', 'Lógica'], notableFigures: ['Tomás de Aquino'] },
  { id: 'puritanismo', name: 'Puritanismo', description: 'Busca pela pureza doutrinária e piedade extrema.', keyPrinciples: ['Piedade Solene', 'Sabatismo', 'Covenant'], notableFigures: ['John Owen', 'Bunyan'] },
  { id: 'neoortodoxia', name: 'Neo-Ortodoxia', description: 'Foco no encontro existencial com a Palavra de Deus.', keyPrinciples: ['Transcendência', 'Kerygma', 'Crise'], notableFigures: ['Karl Barth'] },
  { id: 'wesleyana', name: 'Santidade Wesleyana', description: 'A busca pela perfeição cristã e amor social.', keyPrinciples: ['Inteira Santificação', 'Graça Preveniente', 'Missão'], notableFigures: ['John Wesley'] },
  { id: 'batista', name: 'Tradição Batista', description: 'Autonomia da igreja local e liberdade religiosa.', keyPrinciples: ['Autonomia Local', 'Imersão', 'Liberdade'], notableFigures: ['Spurgeon', 'Rice'] },
  { id: 'ortodoxa', name: 'Ortodoxia Oriental', description: 'Foco na Theosis (divinização) e no mistério.', keyPrinciples: ['Theosis', 'Ícones', 'Tradição'], notableFigures: ['Crisóstomo'] },
  { id: 'pacto', name: 'Teologia do Pacto', description: 'Estrutura a Bíblia através de pactos históricos.', keyPrinciples: ['Pacto da Graça', 'Sinal do Pacto', 'Unidade'], notableFigures: ['Witsius'] },
  { id: 'exegética', name: 'Teologia Bíblica', description: 'Estudo orgânico da revelação no texto.', keyPrinciples: ['Progressão', 'Tipologia', 'Contexto'], notableFigures: ['Vos'] },
  { id: 'catolica', name: 'Catolicismo Romano', description: 'Tradição apostólica mediada pelo Magistério.', keyPrinciples: ['Sucessão', 'Sacramentos', 'Igreja'], notableFigures: ['Bento XVI'] },
  { id: 'carismatica', name: 'Movimento Carismático', description: 'Renovação espiritual focada na experiência.', keyPrinciples: ['Louvor', 'Cura', 'Atualidade'], notableFigures: ['Bennett'] },
  { id: 'fundamentalista', name: 'Fundamentalismo', description: 'Defesa das doutrinas básicas contra o liberalismo.', keyPrinciples: ['Inerrância', 'Literalismo', 'Virginal'], notableFigures: ['Machen'] },
  { id: 'contextual', name: 'Teologia Contextual', description: 'Interpretação da fé a partir da realidade social.', keyPrinciples: ['Práxis', 'Libertação', 'Justiça'], notableFigures: ['Gutiérrez'] }
];

export const HISTORICAL_QUOTES: Quote[] = [
  { author: 'Charles Spurgeon', text: 'A Bíblia não é a luz do mundo, é a luz da Igreja.', category: 'Bíblia' },
  { author: 'Charles Spurgeon', text: 'O discernimento não é saber a diferença entre o certo e o errado. É saber a diferença entre o certo e o quase certo.', category: 'Sabedoria' },
  { author: 'Charles Spurgeon', text: 'Defenda a Bíblia? Eu preferiria defender um leão. Solte-o e ele se defenderá sozinho.', category: 'Bíblia' },
  { author: 'Martinho Lutero', text: 'A Bíblia é uma erva; quanto mais você a manuseia, mais fragrância ela exala.', category: 'Bíblia' },
  { author: 'Martinho Lutero', text: 'Fé é uma confiança viva e audaciosa na graça de Deus.', category: 'Fé' },
  { author: 'João Calvino', text: 'O coração do homem é uma fábrica de ídolos.', category: 'Coração' },
  { author: 'Santo Agostinho', text: 'Fizeste-nos para Ti, e o nosso coração está inquieto enquanto não descansar em Ti.', category: 'Descanso' },
  { author: 'C.S. Lewis', text: 'Acredito no cristianismo como acredito que o sol nasceu.', category: 'Fé' },
  { author: 'C.S. Lewis', text: 'A dor é o megafone de Deus para despertar um mundo surdo.', category: 'Sofrimento' },
  { author: 'A.W. Tozer', text: 'O que vem à nossa mente quando pensamos sobre Deus é a coisa mais importante.', category: 'Deus' },
  { author: 'John Wesley', text: 'Faça todo o bem que puder, por todos os meios que puder.', category: 'Santidade' },
  { author: 'Billy Graham', text: 'Não li o final do livro ainda, mas sei que ganhamos.', category: 'Esperança' }
];

export const BIBLE_BOOKS = [
  { name: 'Gênesis', chapters: 50, verses: 1533, testament: 'AT', genre: 'Pentateuco', author: 'Moisés', year: '~1445 AC', position: 1 },
  { name: 'Êxodo', chapters: 40, verses: 1213, testament: 'AT', genre: 'Pentateuco', author: 'Moisés', year: '~1440 AC', position: 2 },
  { name: 'Levítico', chapters: 27, verses: 859, testament: 'AT', genre: 'Pentateuco', author: 'Moisés', year: '~1445 AC', position: 3 },
  { name: 'Números', chapters: 36, verses: 1288, testament: 'AT', genre: 'Pentateuco', author: 'Moisés', year: '~1405 AC', position: 4 },
  { name: 'Deuteronômio', chapters: 34, verses: 959, testament: 'AT', genre: 'Pentateuco', author: 'Moisés', year: '~1405 AC', position: 5 },
  { name: 'Mateus', chapters: 28, verses: 1071, testament: 'NT', genre: 'Evangelho', author: 'Mateus', year: '~60 DC', position: 40 },
  { name: 'Marcos', chapters: 16, verses: 678, testament: 'NT', genre: 'Evangelho', author: 'Marcos', year: '~55 DC', position: 41 },
  { name: 'Lucas', chapters: 24, verses: 1151, testament: 'NT', genre: 'Evangelho', author: 'Lucas', year: '~60 DC', position: 42 },
  { name: 'João', chapters: 21, verses: 879, testament: 'NT', genre: 'Evangelho', author: 'João', year: '~90 DC', position: 43 },
  { name: 'Atos', chapters: 28, verses: 1007, testament: 'NT', genre: 'Histórico', author: 'Lucas', year: '~62 DC', position: 44 },
  { name: 'Romanos', chapters: 16, verses: 433, testament: 'NT', genre: 'Epístola', author: 'Paulo', year: '~57 DC', position: 45 },
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
  'G3056': { word: 'Logos', original: 'λόγος', pronunciation: 'log-os', number: 'G3056', definition: 'A palavra, o Verbo divino, razão expressa ou o pensamento manifestado através da fala. Em João 1:1, refere-se a Cristo.', etymology: 'Do grego "lego" (falar).' },
  'H7225': { word: 'Reshit', original: 'רֵאשִׁית', pronunciation: 'ray-sheeth', number: 'H7225', definition: 'Início, primícias, a melhor parte ou o primeiro no tempo, lugar ou ordem. Usado em Gênesis 1:1.', etymology: 'Do hebraico "rosh" (cabeça).' }
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  // INNOCÊNCIA
  { year: '4004 AC', title: 'Criação do Cosmos', description: 'Deus cria os céus e a terra e estabelece o homem no Éden em estado de perfeição original.', category: 'Biblical', dispensation: 'Innocence' },
  
  // CONSCIÊNCIA
  { year: '4004 AC', title: 'A Queda do Homem', description: 'A entrada do pecado no mundo e o início da responsabilidade humana através da consciência moral.', category: 'Biblical', dispensation: 'Conscience' },
  { year: '3875 AC', title: 'Caim e Abel', description: 'O primeiro conflito humano registrado, demonstrando a depravação da consciência após a queda.', category: 'Biblical', dispensation: 'Conscience' },
  { year: '2348 AC', title: 'O Grande Dilúvio', description: 'Deus purifica a terra através de um dilúvio global, preservando a linhagem de Noé ante a corrupção total.', category: 'Biblical', dispensation: 'Conscience' },
  
  // GOVERNO HUMANO
  { year: '2247 AC', title: 'Torre de Babel', description: 'A rebelião organizada da humanidade e a subsequente confusão das línguas, estabelecendo o governo das nações.', category: 'Biblical', dispensation: 'Human Government' },
  
  // PROMESSA
  { year: '1996 AC', title: 'O Chamado de Abraão', description: 'Deus estabelece um pacto incondicional com Abraão, prometendo uma terra, descendência e bênção universal.', category: 'Biblical', dispensation: 'Promise' },
  { year: '1898 AC', title: 'José no Egito', description: 'A providência divina movendo a linhagem da promessa para o Egito para preservação durante a fome.', category: 'Biblical', dispensation: 'Promise' },
  
  // LEI
  { year: '1446 AC', title: 'O Êxodo do Egito', description: 'A libertação miraculosa de Israel sob a liderança de Moisés, marcando o nascimento nacional de Israel.', category: 'Biblical', dispensation: 'Law' },
  { year: '1446 AC', title: 'A Lei no Sinai', description: 'Deus entrega os Dez Mandamentos e o sistema sacrificial, governando a vida teocrática de Israel.', category: 'Biblical', dispensation: 'Law' },
  { year: '1208 AC', title: 'Estela de Merneptah', description: 'Primeira menção arqueológica de Israel fora da Bíblia, confirmando sua presença em Canaã.', category: 'Archaeological', dispensation: 'Law' },
  { year: '1010 AC', title: 'Reinado de Davi', description: 'A era de ouro de Israel e o estabelecimento do pacto davídico sobre o trono eterno de Jerusalém.', category: 'Biblical', dispensation: 'Law' },
  { year: '586 AC', title: 'Queda de Jerusalém', description: 'O exílio babilônico e a destruição do Primeiro Templo como consequência da desobediência à Lei.', category: 'Biblical', dispensation: 'Law' },
  
  // GRAÇA
  { year: '5 AC', title: 'Encarnação do Logos', description: 'O nascimento de Jesus Cristo, o cumprimento de todas as sombras e promessas do Antigo Testamento.', category: 'Biblical', dispensation: 'Grace' },
  { year: '30 DC', title: 'Crucificação e Ressurreição', description: 'A obra consumada de Cristo, provendo salvação gratuita mediante a fé, encerrando o domínio da Lei.', category: 'Biblical', dispensation: 'Grace' },
  { year: '30 DC', title: 'Pentecostes', description: 'A descida do Espírito Santo e o início da Igreja, o corpo místico de Cristo composto de judeus e gentios.', category: 'Biblical', dispensation: 'Grace' },
  { year: '95 DC', title: 'O Apocalipse de João', description: 'O apóstolo João recebe a revelação final sobre o fim dos tempos e a glória futura na ilha de Patmos.', category: 'Biblical', dispensation: 'Grace' },
  { year: '1517 DC', title: 'Reforma Protestante', description: 'O grande retorno às Escrituras e à doutrina da justificação pela fé sob a liderança de Lutero.', category: 'Historical', dispensation: 'Grace' },
  { year: '1947 DC', title: 'Manuscritos do Mar Morto', description: 'A descoberta em Qumran que confirmou a precisão milenar na transmissão do texto bíblico.', category: 'Archaeological', dispensation: 'Grace' },
  
  // REINO (MILÊNIO)
  { year: 'Futuro', title: 'A Segunda Vinda', description: 'O retorno glorioso de Cristo em poder para julgar as nações e estabelecer Seu governo literal.', category: 'Biblical', dispensation: 'Kingdom' },
  { year: 'Futuro', title: 'O Milênio', description: 'O reinado de mil anos de Cristo sobre a terra a partir de Jerusalém, restaurando a criação.', category: 'Biblical', dispensation: 'Kingdom' },
  { year: 'Eternidade', title: 'Novos Céus e Nova Terra', description: 'A consumação final de todas as coisas e a habitação eterna de Deus com Seu povo glorificado.', category: 'Biblical', dispensation: 'Kingdom' }
];

export const COMMUNITY_MESSAGES: Message[] = [
  { id: '1', user: 'Logos Bot', text: 'Bem-vindo ao centro do Logos! Aqui compartilhamos sabedoria.', timestamp: 'Agora', avatar: 'https://i.pravatar.cc/150?u=bot' }
];