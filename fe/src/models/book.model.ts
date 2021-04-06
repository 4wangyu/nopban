export interface BookSearchItem {
  url: string;
  title: string;
  metas: string[];
  img?: string;
  saved: boolean;
}

export interface BookSearchPagination {
  start: number | null;
  text: string;
}

export interface BookSearchResult {
  items: BookSearchItem[];
  pagination: BookSearchPagination[];
}

export interface BookSubList {
  items: BookSearchItem[];
  total: number;
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
