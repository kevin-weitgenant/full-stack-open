const {totalLikes,dummy, favoriteBlog, mostBlogs, mostLikes, blogs} = require('../utils/list_helper')

const _ = require('lodash');

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})





describe('4.4 Total likes', () => {

  test('list with just one blog', () => {
    expect(totalLikes(blogs[0])).toBe(blogs[0].likes);
  }),
  test('empty list', () => {
    expect(totalLikes([])).toBe(0);
  })
  test('[blogs[0],blogs[1]', () => {
    expect(totalLikes([blogs[0],blogs[1]])).toBe(12);
  })

})


describe('4.5 favorite blog', () => {

  test('list with just one blog', () => {
    expect(favoriteBlog(blogs[0])).toEqual(blogs[0]);
  }),
  test('empty list', () => {
    expect(favoriteBlog([])).toBe(0);
  }),

  test('all blogs', () => {
    expect(favoriteBlog(blogs)).toEqual(blogs[2]);
  })

})


describe('4.6 most blogs', () => {


  test('all blogs', () => {
    expect(mostBlogs(blogs)).toEqual({'author': "Robert C. Martin", 'blogs': 3});
  })

  test('not a list', () => {
    expect(mostBlogs(123)).toEqual('No authors or not enough authors provided');
  })

  test('empty list', () => {
    expect(mostBlogs([])).toEqual('No authors or not enough authors provided');
  })
  
  test('Just one blog', () => {
    expect(mostBlogs(blogs[0])).toEqual('No authors or not enough authors provided');
  })


})


describe('4.7 most likes', () => {


  test('all blogs', () => {
    expect(mostLikes(blogs)).toEqual({'author': "Edsger W. Dijkstra", 'likes': 17});
  })

  test('not a list', () => {
    expect(mostLikes(123)).toEqual('No authors or not enough authors provided');
  })

  test('empty list', () => {
    expect(mostLikes([])).toEqual('No authors or not enough authors provided');
  })
  
  test('Just one blog', () => {
    expect(mostLikes(blogs[0])).toEqual('No authors or not enough authors provided');
  })


})

