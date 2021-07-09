var Hotel = require('../models/hotel');
var QuartoInstance = require('../models/quartoinstance');

//const { body, validationResult } = require('express-validator/check');
//const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

//devolve todos os hoteis
exports.hotel_list = function (req, res, next) {
    Hotel.find({})
        .sort([['nome', 'ascending']])
        .exec(function (err, hotel_list) {
            if (err) { return next(err) }
            res.json(hotel_list);
        });
};

// delvolve o hotel com id id
exports.hotel_detail = function (req, res, next) {
    Hotel.findById(req.params.id)
        .exec(function (err, results) {
            if (err) { return next(err); }
            if (results == null) { 
                var err = new Error('Hotel not found');
                err.status = 404;
                return next(err);
            }
            res.json(results);
        });
};

//Display count of all Hotels.
/*exports.hotel_count = function (req, res, next) {

    Hotel.countDocuments()
        .exec(function (err, count) {
            if (err) { return next(err); }
            res.json(count);
        })
};

exports.hotel_add = function(req, res, next){
    
    let newContact= new Contact({
        nome: req.body.nome,
        morada: req.body.morada,
        mail: req.body.mail,
        coordenadas: req.body.coordenadas,
        telefone: req.body.telefone,
        ntotal: req.body.ntotal,
        descricao: req.body.descricao,
        servicos: req.body.servicos
    });
    newContact.save((err,hotel)=>{
        if(err){
            res.json({msg: 'Failed to add contact'});
        }
        else{
            res.json({msg: 'hotel adicionado.'});
        }
    })
};

exports.hotel_delete = function (req, res, next){
    Hotel.remove({_id: req.params.id},function(err,result){
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
}

exports.hotel_delete_post = function (req, res, next) {

    async.parallel({
        hotel: function (callback) {
            Book.findById(req.body._id).populate('quarto').exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }

        Hotel.deleteOne({ _id: req.body._id }, function deleteHotel(err) {
            if (err) { return next(err); }
            res.json({ 'message': 'success' });
        });        
    });
};*/
