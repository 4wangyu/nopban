export interface MovieSearchItem {
  url: string;
  img: string;
  title: string;
  metas: string[];
}

export interface MovieSearchPagination {
  start: number;
  text: string;
}

export interface MovieSearchResult {
  items: MovieSearchItem[];
  pagination: MovieSearchPagination[];
}
