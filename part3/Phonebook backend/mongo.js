const mongoose = require('mongoose')

if (process.argv.length<3){
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2]


const url = `mongodb+srv://test427:${password}@cluster0.bke7bol.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', PersonSchema)

if (process.argv.length === 3){
    Person.find({}).then(result => {
        result.forEach(Person =>
            console.log(Person.name, Person.number))
        mongoose.connection.close()
    })
}

else if (process.argv.length === 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    
    person.save().then(result => {
        console.log('Person saved');
        mongoose.connection.close()
    })
}

