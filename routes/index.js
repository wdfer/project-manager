import express from 'express';
const router = express.Router();
import {baseUrl,basePackage} from '../config/baseConfig';
import route from '../config/route';
import { urlUtils } from '../utils/utils';
const { change2Url } = urlUtils;

route.forEach(d=>{
  router.get(change2Url(d.url),(req,res)=>{
    res.sendFile(`${baseUrl}/${basePackage}${change2Url(d.file)}`)
  });
});


module.exports = router;
