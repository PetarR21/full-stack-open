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
  name: {
    type: String,
    minLength: 3,

    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^(\d{2}||\d{3})-\d+$/.test(v);
      },
      message: (props) => `${props.value} is not valid phone number!`,
    },
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
