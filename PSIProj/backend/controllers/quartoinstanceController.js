const QuartoInstance = require('../models/quartoinstance');


exports.quartoinstance_list = function (req, res, next) {
    QuartoInstance.find()
        .exec(function (err, list_quartoinstances) {
            if (err) { return next(err); }
            res.json(list_quartoinstances);
        })

};

exports.quartoinstance_detail = function (req, res, next) {
    QuartoInstance.findById(req.params.id)
        .exec(function (err, results) {
            if (err) { return next(err); }
            if (results == null) { 
                var err = new Error('Quarto instance not found');
                err.status = 404;
                return next(err);
            }
            res.json(results);
        });
};