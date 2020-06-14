export interface MusicSearchItem {
  url: string;
  title: string;
  metas: string[];
  img?: string;
  saved: boolean;
}

export interface MusicSearchPagination {
  start: number | null;
  text: string;
}

export interface MusicSearchResult {
  items: MusicSearchItem[];
  pagination: MusicSearchPagination[];
}

export interface NameLinkModel {
  name: string;
  link: string;
}

export interface Music {
  id?: number;
  uuid: string;
  title: string;
  img: string;
  writers: NameLinkModel[];
  publisher: string;
  subtitle: string;
  origin_title: string;
  translators: NameLinkModel[];
  publish_time: string;
  page_count: number;
  price: string;
  isbn: string;
  created_at?: Date;
}
