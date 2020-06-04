const express = require('express'),
  router = express.Router();
import checkUser from './middleware/check-user';

import * as user from './modules/user';
import * as movie from './modules/movie/movie';
import checkToken from './middleware/check-token';

router.post('/signup', checkUser, user.signup);
router.post('/signin', user.signin);

router.get('/movie/search', movie.searchMovie);
router.post('/movie/add', checkToken, movie.addMovie);

export default router;
