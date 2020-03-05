import express from 'express';
const router = express.Router();
import {Controller,Request} from './../utils/routeUtils'

/* GET users listing. */
/*router.get('/aa', function(req, res, next) {
    res.send('respond with a resource');
});

function*/

@Controller('123')
class TestController{

    @Request('/asdf')
    testFunc(){

    }
}


export default TestController;
