export interface MovieSearchItem {
  url: string;
  title: string;
  metas: string[];
}

export interface MovieSearchPagination {
  start: number | null;
  text: string;
}

export interface MovieSearchResult {
  items: MovieSearchItem[];
  pagination: MovieSearchPagination[];
}
