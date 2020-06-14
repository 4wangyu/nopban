export interface BookSearchItem {
  url: string;
  title: string;
  metas: string[];
  poster?: string;
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

export interface NameLinkModel {
  name: string;
  link: string;
}

export interface Book {
  id?: number;
  uuid: string;
  title: string;
  year: number;
  poster: string;
  directors: NameLinkModel[];
  playwriters: NameLinkModel[];
  actors: NameLinkModel[];
  genres: string[];
  website: string;
  countries: string[];
  languages: string[];
  releaseDates: string[];
  episodes: number;
  episodeRuntime: string;
  runtime: string;
  aliases: string[];
  imdb: string;
  createdat?: Date;
}
