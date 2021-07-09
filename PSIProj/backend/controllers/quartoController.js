const Quarto = require('../models/tipoDeQuarto');
const QuartoInstance = require('../models/quartoinstance');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

/*exports.quartoinstance_count_available = function (req, res, next) {
    
    QuartoInstance.count({ status: 'Available' })
        .exec(function (err, count) {
            if (err) { return next(err); }
            res.json(count);
        })
};*/



exports.quartoinstance_count_available = function (req, res, next) {
    Quarto.find()
        .exec(function (err, tipoDeQuartos) {
            var MyTipoDeQuartoIdArray = tipoDeQuartos.map(function(x) { return x._id} );
            QuartoInstance.count({quarto: { "$in" : MyTipoDeQuartoIdArray} }, {status: 'Available'} ).exec(function (err, counter) {
                    res.json(counter);
            });
    });
};


exports.quarto_list = function (req, res, next) {
    Quarto.find({})
        .sort([['tipo', 'ascending']])
        .exec(function (err, quarto_list) {
            if (err) { return next(err) }
            res.json(quarto_list);
        });
};

exports.quarto_detail = function (req, res, next) {
    Quarto.findById(req.params.id)
        .exec(function (err, results) {
            if (err) { return next(err); }
            if (results == null) { 
                var err = new Error('Quarto not found');
                err.status = 404;
                return next(err);
            }
            res.json(results);
        });
};