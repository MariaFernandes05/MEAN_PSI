var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var Schema = mongoose.Schema;


var ClienteSchema = new Schema({
    username: {type: String, unique : true, required: true},
    password: {type: String, required: true}
});

// Export model.
module.exports = mongoose.model('Cliente', ClienteSchema);
