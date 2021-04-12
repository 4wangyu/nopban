import { MyBook, MyBookItemType, MyBookSubList } from '../models/book.model';
import {
  MyMovie,
  MyMovieItemType,
  MyMovieSubList,
} from '../models/movie.model';
import {
  MyMusic,
  MyMusicItemType,
  MyMusicSubList,
} from '../models/music.model';

export const CATEGORIES: string[] = ['book', 'movie', 'music'];

export const MOVIE_URL = 'https://movie.douban.com';
export const BOOK_URL = 'https://book.douban.com';
export const MUSIC_URL = 'https://music.douban.com';

export const DICT_NOUN: { [key: string]: string } = {
  book: '书',
  movie: '电影',
  music: '音乐',
};

export const DICT_VERB: { [key: string]: string } = {
  book: '读',
  movie: '看',
  music: '听',
};

export const DICT_QUANTIFIER: { [key: string]: string } = {
  book: '本',
  movie: '部',
  music: '张',
};

export type MyType = MyBook | MyMovie | MyMusic;
export type MyItemType = MyBookItemType | MyMovieItemType | MyMusicItemType;
export type MySubListType = MyBookSubList | MyMovieSubList | MyMusicSubList;
