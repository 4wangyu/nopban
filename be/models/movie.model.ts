export interface MovieItemType {
  url: string;
  title: string;
  metas: string[];
  poster?: string;
}

export interface MovieSearchItemType extends MovieItemType {
  saved: boolean;
}

export interface MyMovieItemType extends MovieItemType {
  img: string;
  rating: number;
  updatedat: string;
}

export interface MovieSearchPagination {
  start: number | null;
  text: string;
}

export interface MovieSearchResult {
  items: MovieSearchItemType[];
  pagination: MovieSearchPagination[];
}

export interface NameLinkModel {
  name: string;
  link: string;
}

export interface Movie {
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

export interface MyMovie extends Movie {
  img: string;
  rating: number;
  updatedat: Date;
}
