const Cliente = require('../models/cliente');
const Reserva = require('../models/reserva');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

//devolve todos clientes
exports.cliente_list = function (req, res, next) {
    Cliente.find({})
    .exec(function (err, cliente_list) {
    	if (err) { return next(err) }
        res.json(cliente_list);
     });
};

exports.cliente_detail = function (req, res, next) {
     Cliente.findById(req.params.id)
             .exec(function (err, results) {
                 if (err) { return next(err); }
                      if (results == null) {                                                                  var err = new Error('Reserva not found');                                               err.status = 404;       
                                return next(err);                                                        }
                      res.json(results);
             });
};

exports.cliente_add = [
	body('username', 'username must not be empty.').isLength({ min: 1 }).trim(),
        body('password', 'password must not be empty.').isLength({ min: 1 }).trim(),

	sanitizeBody('*').escape(),

        (req, res, next) => {
                const errors = validationResult(req);

                var cliente = new Cliente(
                {
                        username: req.body.username,
                        password: req.body.password
                  });                                                                                if (!errors.isEmpty()) {                                                                   res.json({ 'message': 'Validation errors' });
                }
                else {
			cliente.save(function (err) {
                                if (err) { return next(err); }
				res.json({ 'message': 'success' });                                        });
                }                                                                          }
];



exports.cliente_detail_reservas = function (req, res, next) {

    Reserva.find({ 'cliente': req.params.id })
        .exec(function (err, results) {
            if (err) { return next(err); } // Error in API usage.
            res.json(results);
        });

};





