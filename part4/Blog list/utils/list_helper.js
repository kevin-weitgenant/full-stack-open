const dummy = (blogs) => {
  return 1
};



function totalLikes(blogPosts) {
  // Check if the array is empty and return 0 immediately if true
  if (!blogPosts || blogPosts.length === 0) {
    return 0;
  }

  // Use the reduce method to sum up the likes from each blog post
  const total = blogPosts.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);

  return total;
}

module.exports = {
  dummy,totalLikes
};
