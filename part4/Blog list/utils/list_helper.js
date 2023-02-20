const _ = require('lodash')

const dummy = (...blogs) => {
    return 1
  }
  
const totalLikes = (posts) =>{
    if (!Array.isArray(posts)) {
        return (posts.likes)
    }
    
    const reducer = (acumulator,post) =>{
        return(acumulator+= post.likes)
        
    }


    let resultado = posts.length == 0 ?
    0 : posts.reduce(reducer,0)

    return(resultado)
    
}

const favoriteBlog = (blogs) => {
    if (!Array.isArray(blogs)) {
        return (blogs)
    }

    let maxLikes = Math.max(...blogs.map(post=> post.likes))
    return (blogs.find(post => post.likes === maxLikes ) ||0 )

  }


const mostBlogs = (blogs)=>{

    if (!Array.isArray(blogs) || !blogs?.length) return "No authors or not enough authors provided"



    let grouped = _.groupBy(blogs,'author')
    let author = _.maxBy(_.keys(grouped), (author)=> grouped[author].length)

    console.log('author = ', author );

    result = {author,
        'blogs': grouped[author].length
}
    console.log('result =', result);
    return result
}
const mostLikes = (blogs)=>{

    if (!Array.isArray(blogs) || !blogs?.length) return "No authors or not enough authors provided"



    let grouped = _.groupBy(blogs,'author')
    
    
    let author = _.maxBy(_.keys(grouped), (author)=> grouped[author]
                                                     .reduce((accumulator,item) =>
                                                     {return item.likes + accumulator},0) )

    let likes = grouped[author]
    .reduce((accumulator,item) =>
    {return item.likes + accumulator},0) 



    console.log({author,likes});

 
    return ({
        author,
        likes,
        })
}


module.exports =   {
    dummy, totalLikes, favoriteBlog,mostBlogs,mostLikes
}