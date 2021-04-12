export interface BookItemType {
  url: string;
  title: string;
  metas: string[];
  img?: string;
}

export interface BookSearchItemType extends BookItemType {
  saved: boolean;
}

export interface MyBookItemType extends BookItemType {
  rating: number;
}

export interface BookSearchPagination {
  start: number | null;
  text: string;
}

export interface BookSearchResult {
  items: BookSearchItemType[];
  pagination: BookSearchPagination[];
}

export interface NameLinkModel {
  name: string;
  link: string;
}

export interface Book {
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

export interface MyBook extends Book {
  rating: number;
}
