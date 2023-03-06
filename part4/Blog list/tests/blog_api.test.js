const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const {blogs} = require('../utils/list_helper')
const blogsinDb = require('./test_helper')



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

  test("returns all notes", async() => {
      const response = await api.get('/api/blogs')
      console.log('response.body = ', response.body);
      expect(response.body).toHaveLength(blogs.length)
  },100000)
  
  test("unique identifier property of the blog posts is named id", async() => {
      const response = await api.get('/api/blogs')
      expect(response.body[0]['id']).toBeDefined();
  })
  
  
  test("POST request to the /api/blogs URL successfully creates a new blog post", async() => {  
    
    const blogObject = new Blog(blogs[blogs[0]])
    await blogObject.save()
    const blogsreturned = await blogsinDb()
    console.log('blogs =', blogsreturned);
    expect(blogsreturned).toHaveLength(blogs.length+1)
  },100000)


