var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var ReservaSchema = new Schema({
    tipoDeQuarto: {type: String, required: true},
    custo: {type: Number, required: true},
    dataCheckIn: {type: Date,  required: true},
    dataCheckOut: {type: Date,  required: true},
    hotel: {type: String, required: true},
    numeroCartao: {type: Number, required: true},
    dataValidade: {type: Date, required: true},
    cvv: {type: Number, required: true},
    quartoId: {type: Schema.ObjectId ,ref: 'tipoDeQuarto', required: true},
    cliente: {type: Schema.ObjectId ,ref: 'Cliente', required: true}
});

ReservaSchema
.virtual('url')
.get(function () {
  return '/route/reserva/'+this._id;
});

// Export model.
module.exports = mongoose.model('Reserva', ReservaSchema);
