import express from 'express';
const router = express.Router();
import {Controller,Request} from './../utils/routeUtils'

/* GET users listing. */
router.get('/aa', function(req, res, next) {
  const c = new a();
  c.b();
  res.send('respond with a resource');
});


@Controller('123')
class a {
  b(){

  }
}

export default router;
