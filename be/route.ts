const express = require('express'),
  router = express.Router();
import checkUser from './middleware/checkUser';
import searchMovie from './models/movie';

import * as user from './models/user';

router.post('/signup', checkUser, user.signup);
router.post('/signin', user.signin);

router.get('/movie/search', searchMovie);

export default router;
