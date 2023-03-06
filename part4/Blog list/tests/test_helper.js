const Blog = require('../models/blog')


const blogsinDb = async()=>{

    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())

}



module.exports = blogsinDb