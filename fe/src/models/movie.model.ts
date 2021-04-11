export interface MovieItem {
  url: string;
  title: string;
  metas: string[];
  poster?: string;
}

export interface MovieSearchItem extends MovieItem {
  saved: boolean;
}

export interface MyMovieItem extends MovieItem {
  rating: number;
}

export interface MovieSearchPagination {
  start: number | null;
  text: string;
}

export interface MovieSearchResult {
  items: MovieSearchItem[];
  pagination: MovieSearchPagination[];
}

export interface MovieSubList {
  items: MovieSearchItem[];
  total: number;
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
  releasedates: string[];
  episodes: number;
  episoderuntime: string;
  runtime: string;
  aliases: string[];
  imdb: string;
  createdat?: Date;
}

export interface MyMovie extends Movie {
  img: string;
}
