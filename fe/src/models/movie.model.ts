export interface MovieSearchItem {
  url: string;
  title: string;
  metas: string[];
  poster?: string;
  saved: boolean;
}

export interface MovieSearchPagination {
  start: number | null;
  text: string;
}

export interface MovieSearchResult {
  items: MovieSearchItem[];
  pagination: MovieSearchPagination[];
}
