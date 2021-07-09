const Reserva = require('../models/reserva');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

//devolve todas as reservas
exports.reserva_list = function (req, res, next) {
    Reserva.find({})
            .exec(function (err, reserva_list) {
                 if (err) { return next(err) }
                 res.json(reserva_list);
             });
};

// delvolve a reserva com id id
exports.reserva_detail = function (req, res, next) {
     Reserva.findById(req.params.id)
             .exec(function (err, results) {
                 if (err) { return next(err); }
                      if (results == null) {                                                                                                        var err = new Error('Reserva not found');                                                                               err.status = 404;                                                                                                       return next(err);                                                                                                 }
                      res.json(results);
             });
};

exports.reserva_add = [
	// Validate fields
	body('tipoDeQuarto', 'tipoDeQuarto must not be empty.').isLength({ min: 1 }).trim(),
	body('dataCheckIn', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
	body('dataCheckOut', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),
        body('hotel', 'hotel must not be empty.').isLength({ min: 1 }).trim(),
	body('numeroCartao', 'numeroCartao must not be empty.').isLength({ min: 1 }).trim(),
        body('dataValidade', 'Invalid data de validade').optional({ checkFalsy: true }).isISO8601(),
        body('cvv', 'cvv must not be empty.').isLength({ min: 1 }).trim(),
        body('quartoId', 'quartoId must not be empty.').isLength({ min: 1 }).trim(),
	body('cliente', 'cliente must not be empty.').isLength({ min: 1 }).trim(),

        //Sanitize fields.
	sanitizeBody('*').escape(),
	sanitizeBody('dataCheckIn').toDate(),
	sanitizeBody('dataCheckOut').toDate(),
        sanitizeBody('dataValidade').toDate(),
 
        (req, res, next) => {

        	const errors = validationResult(req);

 		var reserva = new Reserva(
                {
                	tipoDeQuarto: req.body.tipoDeQuarto,
                	custo: req.body.custo,
                	dataCheckIn: req.body.dataCheckIn,
                	dataCheckOut: req.body.dataCheckOut,
                	hotel: req.body.hotel,
                        numeroCartao: req.body.numeroCartao,
			dataValidade: req.body.dataValidade,  
                        cvv: req.body.cvv,
                        quartoId: req.body.quartoId,
			cliente: req.body.cliente
                });
                if (!errors.isEmpty()) {
                	res.json({ 'message': 'Validation errors' });
                }
                else {
                	//Data from form is valid. Save book.
                	reserva.save(function (err) {
                		if (err) { return next(err); }
                		// Successful - redirect to new book record.
                        	res.json({ 'message': 'success' });
                	});
                }
   	}
];

// Handle BookInstance update on POST.
exports.reserva_update = [

   //validate fields
   body('tipoDeQuarto', 'tipoDeQuarto must not be empty.').isLength({ min: 1 }).trim(),
   body('dataCheckIn', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
   body('dataCheckOut', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),
   body('hotel', 'hotel must not be empty.').isLength({ min: 1 }).trim(),
   body('numeroCartao', 'numeroCartao must not be empty.').isLength({ min: 1 }).trim(),
   body('dataValidade', 'Invalid data de validade').optional({ checkFalsy: true }).isISO8601(),
   body('cvv', 'cvv must not be empty.').isLength({ min: 1 }).trim(),
   body('quartoId', 'quartoId must not be empty.').isLength({ min: 1 }).trim(),
   body('cliente', 'cliente must not be empty.').isLength({ min: 1 }).trim(),
   
   //sanitize
   sanitizeBody('*').escape(),
   sanitizeBody('dataCheckIn').toDate(),
   sanitizeBody('dataCheckOut').toDate(),
   sanitizeBody('dataValidade').toDate(),

   
   (req, res, next) => {

                const errors = validationResult(req);

                var reserva = new Reserva(
                {
			_id: req.body._id,
                        tipoDeQuarto: req.body.tipoDeQuarto,
                        custo: req.body.custo,
                        dataCheckIn: req.body.dataCheckIn,
                        dataCheckOut: req.body.dataCheckOut,
                        hotel: req.body.hotel,
                        numeroCartao: req.body.numeroCartao,
                        dataValidade: req.body.dataValidade,
                        cvv: req.body.cvv,
                        quartoId: req.body.quartoId,
                        cliente: req.body.cliente
                });
		
                if (!errors.isEmpty()) {
                        res.json({ 'message': 'Validation errors' });
                }else {
			Reserva.replaceOne({ _id: req.body._id }, reserva, function (err, thereserva) {
				//console.log(reserva);
                		if (err) { 
					return next(err);
				}
                		res.json({ 'message': 'success' });
            		});
		}

   }

];
