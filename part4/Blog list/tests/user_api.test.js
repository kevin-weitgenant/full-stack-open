const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

// beforeEach(async() => {
//     await User.deleteMany({})
//     const userObjects = [{


//     }]
//     const promiseArray =
//     await Promise.all(promiseArray)


// })


const usersinDb = async()=>{
    const users = await User.find({})
    return users.map(blog => blog.toJSON())
}


test("POST to create new user", async() => {  
    
    const user_test = {
        user: "fulanim",
        name: "maloqueiro brabo",
        password: "Kevinzao123", 
    }

    await api
    .post('/api/users')
    .send(user_test)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const usersreturned = await usersinDb()
    console.log('users =', usersreturned);
    
  },100000)


 