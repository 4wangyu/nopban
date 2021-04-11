export interface MusicItem {
  url: string;
  title: string;
  metas: string[];
  img?: string;
}

export interface MusicSearchItem extends MusicItem {
  saved: boolean;
}

export interface MyMusicItem extends MusicItem {
  rating: number;
}

export interface MusicSearchPagination {
  start: number | null;
  text: string;
}

export interface MusicSearchResult {
  items: MusicSearchItem[];
  pagination: MusicSearchPagination[];
}

export interface MusicSubList {
  items: MusicSearchItem[];
  total: number;
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
  musician: NameLinkModel[];
  genre: string;
  album_type: string;
  medium: string;
  publish_time: string;
  publisher: string;
  cd_count: number;
  barcode: string;
  created_at?: Date;
}
