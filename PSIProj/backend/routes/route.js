const express = require('express');
const router = express.Router();

const hotel_controller = require('../controllers/hotelController');
const quarto_controller = require('../controllers/quartoController');
const quartoinstance_controller = require('../controllers/quartoinstanceController');
const reserva_controller = require('../controllers/reservaController');
const cliente_controller = require('../controllers/clienteController');

//Hotel
// GET request for list of all Hotels.
router.get('/cadeiaDeHoteis', hotel_controller.hotel_list);
// GET request for one Hotel.
router.get('/hotel/:id', hotel_controller.hotel_detail);

// GET request for count of all Hotels.
//router.get('/cadeiaDeHoteis/count', hotel_controller.hotel_count);
//adiciona hotel a cadeia de hoteis
//router.post('/hotel/create', hotel_controller.hotel_add);
// POST request to delete Hotel.
//router.post('/book/delete', hotel_controller.hotel_delete_post);
//delete hotel
//router.delete('/hotel/:id',hotel_controller.hotel_delete);

//Quarto
// GET request for list of all Quarto.
router.get('/tiposDeQuarto', quarto_controller.quarto_list);
// GET request for one Quarto.
router.get('/tipoDeQuarto/:id', quarto_controller.quarto_detail);



//QuartoInstance
// GET request for list of all quartoinstance
router.get('/quartosinstance', quartoinstance_controller.quartoinstance_list);
// GET request for how quartoount off all quartoinstance available
//router.get('/quartosinstance/count/available', quartoinstance_controller.quartoinstance_count_available);
// GET request for one Quartoinstance.
router.get('/quartoinstance/:id', quartoinstance_controller.quartoinstance_detail);

//Reserva
// GET request for list of all quartoinstance
router.get('/reservas', reserva_controller.reserva_list);
// GET request for how quartoount off all quartoinstance available
//router.get('/quartosinstance/count/available', quartoinstance_controller.quartoinstance_count_available);
// GET request for one Quartoinstance.
router.get('/reserva/:id', reserva_controller.reserva_detail);
// POST request
router.post('/reserva/create', reserva_controller.reserva_add);
// POST request to update reserva
router.post('/reserva/update',  reserva_controller.reserva_update);

//Cliente
router.get('/clientes', cliente_controller.cliente_list);

router.get('/cliente/:id', cliente_controller.cliente_detail);

router.get('/cliente/:id/reservas', cliente_controller.cliente_detail_reservas);

router.post('/cliente/create', cliente_controller.cliente_add);

module.exports = router;
