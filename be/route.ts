const express = require('express'),
  router = express.Router();
import checkUser from './middleware/check-user';
import checkToken from './middleware/check-token';
import * as user from './modules/user';
import * as movie from './modules/movie/movie';
import * as book from './modules/book/book';
import * as music from './modules/music/music';
import * as mine from './modules/mine/mine';

router.post('/signup', checkUser, user.signup);
router.post('/signin', user.signin);

//#region movie
router.get('/movie/search', movie.searchMovie);
router.post('/movie/object', checkToken, movie.addMovie);
router.get('/movie/object/:movieId', movie.getMovie);

router.get('/movie/rating', checkToken, movie.getMovieRating);
router.post('/movie/rating', checkToken, movie.rateMovie);
router.delete('/movie/rating', checkToken, movie.removeMovieRating);
//#endregion

//#region book
router.get('/book/search', book.searchBook);
router.post('/book/object', checkToken, book.addBook);
router.get('/book/object/:bookId', book.getBook);

router.get('/book/rating', checkToken, book.getBookRating);
router.post('/book/rating', checkToken, book.rateBook);
router.delete('/book/rating', checkToken, book.removeBookRating);
//#endregion

//#region music
router.get('/music/search', music.searchMusic);
router.post('/music/object', checkToken, music.addMusic);
router.get('/music/object/:uuid', music.getMusic);

router.get('/music/rating', checkToken, music.getMusicRating);
router.post('/music/rating', checkToken, music.rateMusic);
router.delete('/music/rating', checkToken, music.removeMusicRating);
//#endregion

//#region homepage
router.get('/mine/total', checkToken, mine.getTotal);
//#endregion

export default router;
