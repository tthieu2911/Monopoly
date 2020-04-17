'use strict';
var mdlFood = require('../model/mdlFood');


/* Load Data */

var loadFoodCollection = async (req, res, next) => {

    mdlFood.find({}, (err, oReturnDoc) => {
        var foodChunk = [];
        var oMessage = '';
        if (oReturnDoc == null || oReturnDoc.length == 0) {
            oMessage = 'Data not found.';
            console.log(oMessage);
        }
        else {
            var chunkSize = 1;
            for (var i = 0; i < oReturnDoc.length; i += chunkSize) {
                foodChunk.push(oReturnDoc.slice(i, i + chunkSize)[0]);
            }
        }
        res.render('pages/food', { result: foodChunk, message: oMessage, page: 'Food Collection', menuId: 'home' });
    })
};

var insertFoodCollection = async (req, res, next) => {

    if (req.name == '' || req.description == '') {
        res.render('pages/food', { message: 'error', page: 'Food Collection', menuId: 'home' });
    }
    var today = new Date();
    var foodModel = new mdlFood({
        name: req.name,
        description: req.description,
        quantity: req.quantity,
        type: req.type,
        score: req.type,
        createDate: today,
        updateDate: null
    });

    foodModel.save().then(() => {
        console.log('Insert Food collection successfully!');
    });

    return loadFoodCollection;
}

module.exports = {
    loadFoodCollection,
    insertFoodCollection
};
