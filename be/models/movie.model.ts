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

export interface NameLinkModel {
  name: string;
  link: string;
}

export interface Movie {
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
}
