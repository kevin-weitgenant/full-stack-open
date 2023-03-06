const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

  blogsRouter.get('/:id', async (request, response) => {
    console.log("chego aqui");
    const id = request.params.id;
    const blog = await Blog.findById(id)

    if (response){
      response.json(blog)
    }
    else{
      response.status(404).send("not found")
    }

  })

  blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id;
    const result = await Blog.findByIdAndDelete(id)
    console.log('result = ', result);
    if (result){
      response.status(200).send("sucessfully deleted")
    }
    
    else{
      response.status(404).send("resource not found")
    }

    
  })
  
  blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id;
    const result = await Blog.findByIdAndUpdate(id,request.body)
    console.log('result = ', result);

    if (result){
      response.status(200).send("sucessfully updated")
    }
    
    else{
      response.status(404).send("resource not found")
    }

    
  })



  blogsRouter.post('/', async(request, response) => {
    
    let blog = request.body

    if (blog?.author && blog?.url){
      if (!blog?.likes){
        blog['likes'] = 0
      }
  
      blog = new Blog(request.body)
  
      const post = await blog.save()
      response.status(201).json(post)
    }

    response.status(400).end()
  })

module.exports = blogsRouter