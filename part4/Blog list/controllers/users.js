const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


usersRouter.post('/', async(request, response) => {
    
    const {username,name,password} = request.body

    const saltRounds = 10
    const passwordHashed = await bcrypt.hash(password,saltRounds)

    const newUser = new User({username,name, passwordHashed})

    const savedUser = await newUser.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async(request, response) => {
    
    const result = await User.find({})

    console.log('result =', result );

    response.status(200).json(result)
})





module.exports = usersRouter