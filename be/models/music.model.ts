export interface MusicItemType {
  url: string;
  title: string;
  metas: string[];
  img?: string;
}

export interface MusicSearchItemType extends MusicItemType {
  saved: boolean;
}

export interface MyMusicItemType extends MusicItemType {
  rating: number;
}

export interface MusicSearchPagination {
  start: number | null;
  text: string;
}

export interface MusicSearchResult {
  items: MusicSearchItemType[];
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
