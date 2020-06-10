const express = require('express'),
  router = express.Router();
import checkUser from './middleware/check-user';

import * as user from './modules/user';
import * as movie from './modules/movie/movie';
import checkToken from './middleware/check-token';

router.post('/signup', checkUser, user.signup);
router.post('/signin', user.signin);

router.get('/movie/search', movie.searchMovie);

router.post('/movie/object', checkToken, movie.addMovie);
router.get('/movie/object/:movieId', movie.getMovie);

router.get('/movie/rating', checkToken, movie.getMovieRating);
router.post('/movie/rating', checkToken, movie.rateMovie);
router.delete('/movie/rating', checkToken, movie.removeMovieRating);

export default router;
