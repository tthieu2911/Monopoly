'use strict';
var express = require('express');
var router = express.Router();

var ctrlfood = require('../controller/ctrlFood')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { page: 'Home', menuId: 'home' });
});

router.get('/about', function (req, res, next) {
    res.render('about', { page: 'About', menuId: 'home' });
});

/* GET Food Collection page. */
router.get('/food', ctrlfood.loadFoodCollection);

module.exports = router;
