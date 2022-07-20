const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Author 1',
    url: 'http://www.test1.com',
    likes: 4,
  },
  {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'http://www.test2.com',
    likes: 4,
  },
];

const blogsInDB = async () => {
  return (await Blog.find({})).map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDB,
};
