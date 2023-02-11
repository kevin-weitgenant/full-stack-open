/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');

app.use(cors());

const requestTime = (req, res, next) => {
  req.requestTime = new Date();
  next();
};

app.use(express.static('dist'));
app.use(morgan('tiny'));
app.use(requestTime);
app.use(express.json());

app.put('/api/persons', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, { runValidators: true })
    .then(() => {
      request.params.name;
      request.params.number;
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((people) => {
      response.json(people);
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const number = request.body;
  if (number.name && number.number) {
    Person.find({})
      .then((people) => {
        if (people.map((x) => x.name).includes(number.name)) {
          return response.status(400).json({
            error: 'name must be unique',
          });
        }

        const person = new Person({
          name: number.name,
          number: number.number,
        });

        person.save().then((savedPerson) => {
          response.json(savedPerson);
        })
          .catch((error) => next(error));
      });
  } else if (!number.name || !number.number) {
    return response.status(400).json({
      error: `${!number.name ? 'name' : 'number'} missing`,
    });
  }
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${Person.length} people
                  <br> </br>
                  ${request.requestTime.toString()}
    `);
});

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;

  const newPerson = {
    name: body.name,
    number: body.number,
  };

  console.log(newPerson);

  Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log(error);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformated id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next();
};

app.use(errorHandler);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
