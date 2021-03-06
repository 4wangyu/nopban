import { MyBook } from '../models/book.model';
import { MyMovie } from '../models/movie.model';
import { MyMusic } from '../models/music.model';

export const CATEGORIES: string[] = ['book', 'movie', 'music'];

export type MyType = MyBook | MyMovie | MyMusic;
