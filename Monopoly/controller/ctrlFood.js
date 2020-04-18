'use strict';
var mdlFood = require('../model/mdlFood');

var loadFoodCollection = async (req, res, next) => {

    mdlFood.find({}, (err, oReturnDoc) => {
        var foodChunk = [];
        var oMessage = '';
        if (err) {
            console.log(err);
        } else if (oReturnDoc == null || oReturnDoc.length == 0) {
            oMessage = 'Data not found';
            console.log(oMessage);
        } else {
            var chunkSize = 1;
            for (var i = 0; i < oReturnDoc.length; i += chunkSize) {
                foodChunk.push(oReturnDoc.slice(i, i + chunkSize)[0]);
            }
        }
        res.render('pages/food', { result: foodChunk, success: '', message: oMessage, page: 'Food Collection', menuId: 'home' });
    })
};

var insertFoodCollection = async (req, res, next) => {
    var oMessage = '';
    var oSuccess = '';
    if (req.body.ipName == '' || req.body.ipDescription == '') {
        oMessage = 'Name and Description is mandatory';
        res.render('pages/food_detail', { message: oMessage, page: 'Food Detail', menuId: 'home' })
    } else {
        var today = new Date();
        var foodModel = new mdlFood({
            name: req.body.ipName,
            description: req.body.ipDescription,
            quantity: parseInt(req.body.ipQuantity),
            type: parseInt(req.body.ipType),
            score: parseInt(req.body.ipScore),
            createDate: today,
            updateDate: null
        });

        foodModel.save().then((err, doc) => {
            oSuccess = 'Create Food successfully';
            console.log(oSuccess);
        });
    }

    var resultChunk = [];
    reloadFoodCollection(function (resultChunk) {
        if (resultChunk) {
            res.render('pages/food', { result: resultChunk, success: oSuccess, message: oMessage, page: 'Food Collection', menuId: 'home' });
        }
    });
}

var updateFoodCollection = async (req, res, next) => {
    var oMessage = '';
    var oSuccess = '';
    if (req.params.id == '') {
        oMessage = 'Data not found';
        console.log(oMessage);
    } else {
        var today = new Date();
        var filters = { _id: req.params.id };
        var update = {
            name: req.body.ipName,
            description: req.body.ipDescription,
            quantity: parseInt(req.body.ipQuantity),
            type: parseInt(req.body.ipType),
            score: parseInt(req.body.ipScore),
            updateDate: today
        }

        mdlFood.findOneAndUpdate(filters, update, (err, oReturnDoc) => {
            if (oReturnDoc == null) {
                oMessage = 'Data not found';
                console.log(oMessage);
            } else {
                oSuccess = 'Update Food successfully';
                console.log(oSuccess);
            }
        });
    }
    var resultChunk = [];
    reloadFoodCollection(function (resultChunk) {
        if (resultChunk) {
            res.render('pages/food', { result: resultChunk, success: oSuccess, message: oMessage, page: 'Food Collection', menuId: 'home' });
        }
    });
}

var deleteFoodCollection = async (req, res, next) => {
    var oMessage = '';
    var oSuccess = '';
    if (req.params.id == '') {
        oMessage = 'Data not found';
    } else {
        mdlFood.deleteOne({ _id: req.params.id }, (err, oReturnDoc) => {
            if (oReturnDoc == null) {
                oMessage = 'Data not found';
                console.log(oMessage);
            } else {
                oSuccess = 'Delete Food successfully';
                console.log(oSuccess);
            }
        });
    }
    var resultChunk = [];
    reloadFoodCollection(function (resultChunk) {
        if (resultChunk) {
            res.render('pages/food', { result: resultChunk, success: oSuccess, message: oMessage, page: 'Food Collection', menuId: 'home' });
        }
    });
}

function loadFoodDetail(reqId, callback) {
    var foodChunk = [];
    var oMessage = '';
    if (reqId == '') {
        oMessage = 'Wrong selection';
    } else {
        mdlFood.findOne({ _id: reqId }, (err, oReturnDoc) => {
            if (oReturnDoc == null) {
                oMessage = 'Data not found';
                console.log(oMessage);
            } else {
                foodChunk.push(oReturnDoc);
                return callback(foodChunk);
            }
        });
    }
};

function reloadFoodCollection(callback) {
    var foodChunk = [];
    var oMessage = '';

    mdlFood.find({}, (err, oReturnDoc) => {
        if (oReturnDoc == null) {
            oMessage = 'Data not found';
            console.log(oMessage);
        } else {
            var chunkSize = 1;
            for (var i = 0; i < oReturnDoc.length; i += chunkSize) {
                foodChunk.push(oReturnDoc.slice(i, i + chunkSize)[0]);
            }
            return callback(foodChunk);
        }
    });
};

var findFoodCollection = async (req, res, next) => {
    var oMessage = '';
    var oSuccess = '';
    var resultChunk = [];
    if (req.body.ipFilter == '') {
        res.redirect('/food');
    } else {

        var strFilter = req.body.ipFilter;
        var numFilter = 0;
        if (!isNaN(strFilter)) {
            numFilter = parseInt(strFilter);
        }

        //if (/^\d+\.\d+$/.test(req.body.ipFilter)) {
        //    numFilter = parseInt(req.body.ipFilter);
        //}

        var findCondition = { $or: [{ name: { '$regex': strFilter } }, { description: { '$regex': strFilter } }, { quantity: numFilter }, { score: numFilter }, { type: numFilter }] }

        mdlFood.find(findCondition, (err, oReturnDoc) => {
            if (oReturnDoc == null || oReturnDoc.length == 0) {
                oMessage = 'Data not found';
                console.log(oMessage);
            } else {
                var chunkSize = 1;
                for (var i = 0; i < oReturnDoc.length; i += chunkSize) {
                    resultChunk.push(oReturnDoc.slice(i, i + chunkSize)[0]);
                }
                res.render('pages/food', { result: resultChunk, success: '', message: oMessage, page: 'Food Collection', menuId: 'home' });
            }
        });
    }    
}

module.exports = {
    loadFoodCollection,
    insertFoodCollection,
    updateFoodCollection,
    deleteFoodCollection,
    loadFoodDetail,
    reloadFoodCollection,
    findFoodCollection
};