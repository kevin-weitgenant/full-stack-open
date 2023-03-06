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
},100000)

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
  
  describe ("POST TESTS", () => {
  test("POST request to the /api/blogs URL successfully creates a new blog post", async() => {  
    
    const test_blog = {
        title: "testezao",
        author: "Kevinzao",
        url: "https://baitaURL.com/",   
    }

    await api
    .post('/api/blogs')
    .send(test_blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsreturned = await blogsinDb()
    console.log('blogs =', blogsreturned);
    expect(blogsreturned).toHaveLength(blogs.length+1)
  },100000)


  test("verifies that if the likes property is missing from the request, it will default to the value 0", async() => {

    const test_blog = {
        title: "testezao",
        author: "Kevinzao",
        url: "https://reactpatterns.com/"
    }

    await api
    .post('/api/blogs')
    .send(test_blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    const blogsreturned = await blogsinDb()
    console.log('blogs =', blogsreturned);
    expect(blogsreturned[blogsreturned.length -1]['likes']).toEqual(0)

  },100000)


  test("author missing", async() =>{

    const test_blog = {
        title: "testezao",
        url: "https://reactpatterns.com/",
    }

    await api
    .post('/api/blogs')
    .send(test_blog)
    .expect(400)
  },100000)
  
  
  test("url missing", async() =>{

    const test_blog = {
        title: "testezao",
        author: "falastrão dos pump",
    }

    await api
    .post('/api/blogs')
    .send(test_blog)
    .expect(400)
  },100000)
  })


  describe('individual id tests', () => {
    test('getting specific blog by id', async() => {
        
        blogObject = new Blog(blogs[0])
        
        const response = await api.get('/api/blogs/5a422a851b54a676234d17f7')

        console.log('response.body =', response.body);

        expect(response.body).toEqual(blogObject.toJSON())
    });


    test('deleting by id', async() => {
        
        blogObject = new Blog(blogs[0])
        
        const response = await api.delete('/api/blogs/5a422a851b54a676234d17f7')
        
        const result = await Blog.findById('5a422a851b54a676234d17f7')

        expect(result).toBeNull()
        
    });

    test('deleting a random ID', async() => {
        const id_test = mongoose.Types.ObjectId()
        const response = await api.delete(`/api/blogs/${id_test}`)
        expect(response.status).toBe(404)   
    });
    
    
    test('updating by id', async() => {
        blogObject = {...blogs[0], "likes" : blogs[0]['likes'] +1}
        console.log('blogObject =', blogObject);
        const response = await api.put('/api/blogs/5a422a851b54a676234d17f7').send(blogObject)

        const blogsreturned = await blogsinDb()
        expect(blogsreturned.find((blog) => blog['id'] === '5a422a851b54a676234d17f7')?.likes).toBe(blogObject['likes'])   
    });

    
},100000);

