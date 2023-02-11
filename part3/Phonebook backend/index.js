require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')
const Person = require('./models/person')

app.use(cors())

let phoneNumbers = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const requestTime = function (req,res,next){
  req.requestTime = new Date()
  next()
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

app.use(express.static('dist'))
app.use(morgan('tiny'))
app.use(requestTime)
app.use(express.json())


app.put('/api/persons', (request,response,next) =>{
    Person.findByIdAndUpdate(request.params.id, {runValidators: true})
    .then(person => {
      name: request.params.name
      number:request.params.number
    })
    .catch(error => next(error))

})


app.get('/api/persons', (request,response,next) =>{
    Person.find({})
    .then(people => {
      response.json(people)
    })
    .catch(error => next(error))

})

app.post('/api/persons', (request,response,next) =>{
    const number = request.body
    if (number.name && number.number){
      Person.find({})
    .then(people => {
      if (people.map(x=> x.name).includes(number.name)){
        return response.status(400).json({
          error: "name must be unique"
        })  
      } 
      else{
        const person = new Person({
          name: number.name,
          number: number.number,
        })
  
        person.save().then(savedPerson => {
          response.json(savedPerson)
        })
        .catch(error => next(error))
      }





    }) 
      
      
      
      

 
    } 
    else{
      if(!number.name || !number.number){
        return response.status(400).json({
          error: `${!number.name ? 'name': 'number'} missing`
        })
      }
   
    
    }    
    
})


app.get('/api/persons/:id', (request,response,next) =>{
    
  Person.findById(request.params.id)
    .then(person => {
      if (person){
        response.json(person)
      }
      else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  
})
app.delete('/api/persons/:id', (request,response,next) =>{
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
})


app.get('/info', (request,response) =>{
    response.send(`Phonebook has info for ${Person.length} people
                  <br> </br>
                  ${request.requestTime.toString()}
    `)
})  


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body


  const newPerson = {
    name: body.name,
    number: body.number,
  }

  console.log(newPerson);

  Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const errorHandler = function (error, request, response, next){
  console.log(error);

  if (error.name === 'CastError'){
    return response.status(400).send({error: "malformated id"})
  }

  else if (error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }

  next()
}

app.use(errorHandler)






const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
