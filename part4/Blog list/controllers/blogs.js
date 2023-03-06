const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })


  blogsRouter.post('/', async(request, response) => {
    
    let blog = request.body

    console.log('blog aqui no request.body',blog);

    if (!blog?.likes){
      blog['likes'] = 0
    }

    blog = new Blog(request.body)

    const post = await blog.save()
    response.status(201).json(post)

  })

module.exports = blogsRouter