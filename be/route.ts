const express = require('express'),
  router = express.Router();
import checkUser from './middleware/checkUser';

import * as user from './models/user';

router.post('/signup', checkUser, user.signup);
router.post('/signin', user.signin);

export default router;
