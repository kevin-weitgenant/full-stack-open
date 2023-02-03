const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')

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

app.use(express.static('dist'))
app.use(morgan('tiny'))
app.use(requestTime)
app.use(express.json())


app.get('/api/persons', (request,response) =>{
    response.json(phoneNumbers)

})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


app.post('/api/persons', (request,response) =>{
    const number = request.body
    if (number.name && number.number){
      if (phoneNumbers.map(x=> x.name).includes(number.name)){
        return response.status(400).json({
          error: "name must be unique"
        })  
      }
      
      number.id = getRandomInt(5,10000)
      phoneNumbers = phoneNumbers.concat(number)
      response.json(number)
      console.log(JSON.stringify(number));
    } 
    else{
      if(!number.name || !number.number){
        return response.status(400).json({
          error: `${!number.name ? 'name': 'number'} missing`
        })
      }
   
    
    }    
    
})


app.get('/api/persons/:id', (request,response) =>{
    const id = Number(request.params.id)
    const phone = phoneNumbers.find(x => x.id == id)
    
    if (phone){
      response.json(phone)
    }
    else{
      response.status(404).end()
    }


})
app.delete('/api/persons/:id', (request,response) =>{
    const id = Number(request.params.id)
    phoneNumbers = phoneNumbers.filter(x => x.id !== id)
    
    response.status(204).end()
    
})


app.get('/info', (request,response) =>{
    response.send(`Phonebook has info for ${phoneNumbers.length} people
                  <br> </br>
                  ${request.requestTime.toString()}
    `)
})  


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
