'use strict';
var express = require('express');
var router = express.Router();

var ctrlfood = require('../controller/ctrlFood')

/* GET home page */
router.get('/', function (req, res, next) {
    res.render('index', { page: 'Home', menuId: 'home' });
});

router.get('/about', function (req, res, next) {
    res.render('about', { page: 'About', menuId: 'home' });
});

/* GET Food Collection */
router.get('/food', ctrlfood.loadFoodCollection);

router.get('/food/create', function (req, res, next){
    //res.render('pages/food_create', { message: '', page: 'Create Food', mode:'create', menuId: 'home'})
    res.render('pages/food_detail', { message: '', page: 'Create Food', mode:'create', menuId: 'home'})
});
router.post('/food/create', ctrlfood.insertFoodCollection);

/* UPDATE Food Detail */
router.get('/food/update/:id', function (req, res, next) {
    var resultChunk = [];
    ctrlfood.loadFoodDetail(req.params.id, function (resultChunk) {
        if (resultChunk) {
            res.render('pages/food_detail', { result: resultChunk, message: '', mode: 'update', page: 'Food Detail', menuId: 'home' });
        }
    });
});

router.post('/food/update/:id', ctrlfood.updateFoodCollection);

/* DELETE Food */
router.get('/food/delete/:id', function (req, res, next) {
    var resultChunk = [];
    ctrlfood.loadFoodDetail(req.params.id, function (resultChunk) {
        if (resultChunk) {
            res.render('pages/food_detail', { result: resultChunk, message: '', mode: 'delete', page: 'Food Detail', menuId: 'home' });
        }
    });
});

router.post('/food/delete/:id', ctrlfood.deleteFoodCollection);

/* Export ROUTER */
module.exports = router;
