const express = require('express'),
  router = express.Router();
import checkUser from './middleware/check-user';
import searchMovie from './modules/movie/movie';

import * as user from './modules/user';

router.post('/signup', checkUser, user.signup);
router.post('/signin', user.signin);

router.get('/movie/search', searchMovie);

export default router;
