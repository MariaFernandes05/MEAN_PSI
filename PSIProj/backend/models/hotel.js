var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var HotelSchema = new Schema({
    nome: {type: String, required: true},
    morada: {type: String, required: true},
    mail: {type: String, required: true},
    coordenadas: {type: String, required: true},//?????????????
    telefone: {type: String, required: true},
    ntotal: {type: Number, required: true},
    quarto: [{type: Schema.ObjectId ,ref: 'tipoDeQuarto', required: true}],
    descricao: {type: String, required: true},
    servicos: [{type: String, required: true}],
    imagens: [{type: String, require: true}]
});

// Virtual for this genre instance URL.
HotelSchema
.virtual('url')
.get(function () {
  return '/route/hotel/'+this._id;
});

// Export model.
module.exports = mongoose.model('Hotel', HotelSchema);
