const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI)
  .then((response) => {
    console.log('Connected to ', process.env.MONGODB_URI);
  })
  .catch((error) => {
    console.log(error);
  });

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
