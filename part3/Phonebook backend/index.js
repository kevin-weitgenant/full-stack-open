const express = require('express')
const app = express()

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

app.use(requestTime)

app.get('/api/persons', (request,response) =>{
    response.json(phoneNumbers)

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


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
