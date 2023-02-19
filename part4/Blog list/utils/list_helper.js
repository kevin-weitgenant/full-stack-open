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


        
module.exports =   {
    dummy, totalLikes, favoriteBlog
}