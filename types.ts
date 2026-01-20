
export enum ViewMode {
  BIBLE = 'BIBLE',
  THEOLOGY = 'THEOLOGY',
  MAPS = 'MAPS',
  TIMELINE = 'TIMELINE',
  AI_ASSISTANT = 'AI_ASSISTANT',
  COMMUNITY = 'COMMUNITY',
  GAMIFICATION = 'GAMIFICATION',
  SETTINGS = 'SETTINGS',
  MY_STUDIES = 'MY_STUDIES',
  LEXICON = 'LEXICON',
  ACADEMY = 'ACADEMY'
}

export interface StudyItem {
  id: string;
  title: string;
  content: string;
  type: 'Verse' | 'Research' | 'Quote' | 'Note';
  timestamp: string;
}

export interface Verse {
  id: string;
  book: string;
  chapter: number;
  number: number;
  text: string;
  strongs?: StrongEntry[];
}

export interface StrongEntry {
  word: string;
  original: string;
  pronunciation: string;
  number: string;
  definition: string;
  etymology: string;
}

export interface TheologicalPerspective {
  id: string;
  name: string;
  description: string;
  keyPrinciples: string[];
  notableFigures: string[];
}

export interface Quote {
  author: string;
  text: string;
  category?: string;
}

export interface Source {
  type: 'Biblical' | 'Historical' | 'Archaeological' | 'Academic';
  title: string;
  reference: string;
}

export type DispensationType = 'Innocence' | 'Conscience' | 'Human Government' | 'Promise' | 'Law' | 'Grace' | 'Kingdom';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'Biblical' | 'Historical' | 'Archaeological';
  dispensation: DispensationType;
  covenant?: string;
  sources?: Source[];
}

export interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  avatar: string;
}
