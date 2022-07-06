const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const Person = require('./models/person');

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.json());

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.method(req, res) === 'POST' ? tokens.body(req, res) : '',
    ].join(' ');
  })
);

app.use(cors());

app.use(express.static('build'));

app.get('/info', (request, response) => {
  Person.find({}).then((people) => {
    response.send(`
    <p>Phonebook has info for ${people.length} people</p>
    <p>${new Date()}}</p>
  `);
  });
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((returnedPerson) => {
      response.json(returnedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .remove()
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((returnedNote) => {
      if (returnedNote) response.json(returnedNote);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true }).then(
    (updatedPerson) => {
      response.json(updatedPerson);
    }
  );
});

const errorHandler = (error, request, response, next) => {
  console.log(error);
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'maliformed id' });
  }
  if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
