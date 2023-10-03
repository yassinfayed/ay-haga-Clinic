const express = require('express');
const exampleController = require('../controllers/exampleController');

const router = express.Router();

router.post('/example', exampleController.createExample);
router.route("/example2").
    get(exampleController.getAllExamples) //Can add many functions as you want inside the get paranthesis , they will be executed in order
    .post(exampleController.createExample) 
    .put(exampleController.heavyOperationExample); 

module.exports = router;
