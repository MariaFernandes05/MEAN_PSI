var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuartoSchema = new Schema({
    tipo: {type: String, required: true},
    nQuarto: {type: Number,required:true}, 
    servicos: [{type: String, required: true}],
    precoEpocaAlta: {type: Number, require: true},
    precoEpocaBaixa: {type: Number, require: true}
});

// Virtual for this genre instance URL.
QuartoSchema
.virtual('url')
.get(function () {
  return '/route/tipo-de-quarto/'+this._id;
});

// Export model.
module.exports = mongoose.model('tipoDeQuarto', QuartoSchema);
