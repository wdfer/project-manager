import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/aa', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
