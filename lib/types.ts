export type NewsTag =
  | 'La Liga'
  | 'Champions'
  | 'Mundial'
  | 'Fichajes'
  | 'Selección'
  | 'Análisis'
  | 'Copa América'
  | 'Real Madrid'
  | 'Barça'
  | 'Atlético';

export interface NewsItem {
  id: string;
  title: string;
  excerpt?: string;
  url: string;
  image?: string;
  source: string;
  sourceUrl?: string;
  pubDate: string;
  tag?: NewsTag | string;
  isInternal: boolean;
  slug?: string;
  author?: string;
  exclusive?: boolean;
}

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  date: string;
  author: string;
  tag: NewsTag | string;
  image: string;
  excerpt: string;
  exclusive?: boolean;
}

export interface Article extends ArticleFrontmatter {
  content: string;
}

export interface LiveMatch {
  id: number;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  homeCrest?: string;
  awayCrest?: string;
  homeScore: number | null;
  awayScore: number | null;
  status: 'SCHEDULED' | 'LIVE' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'FT' | 'HT';
  minute?: string;
  utcDate: string;
}

export interface StandingRow {
  position: number;
  team: string;
  teamShort: string;
  crest?: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  goalDifference: number;
  points: number;
}

export interface TopScorer {
  name: string;
  team: string;
  goals: number;
  crest?: string;
  photo?: string;
}
