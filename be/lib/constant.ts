import { Book, MyBook } from '../models/book.model';
import { Movie, MyMovie } from '../models/movie.model';
import { Music, MyMusic } from '../models/music.model';

export const CATEGORIES: string[] = ['book', 'movie', 'music'];

export type Subject = Book | Movie | Music;
export type MyType = MyBook | MyMovie | MyMusic;
