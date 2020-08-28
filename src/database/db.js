const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/InTheNight', { useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false})
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db open')
});
module.exports = mongoose