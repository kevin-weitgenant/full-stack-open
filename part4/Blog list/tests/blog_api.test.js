const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const {blogs} = require('../utils/list_helper')




beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('notes are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  })

it("returns all notes", async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length)
})



