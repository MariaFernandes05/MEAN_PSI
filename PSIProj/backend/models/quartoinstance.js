var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuartoInstanceSchema = new Schema({
    quarto: {type: Schema.ObjectId,ref: 'tipoDeQuarto', required: true},
    status: { type: String, required: true, enum:['Available', 'Reserved'], default: 'Available'},
    dataInicio: {type: Date,  required: false},
    dataFinal: {type: Date,  required: false}
});

// Virtual for this genre instance URL.
QuartoInstanceSchema
.virtual('url')
.get(function () {
  return '/route/quartoInstance/'+this._id;
});

// Export model.
module.exports = mongoose.model('QuartoInstance', QuartoInstanceSchema);
