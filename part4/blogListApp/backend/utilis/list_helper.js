const _ = require('loadsh');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  const mappedBlogs = blogs.map((blog) => {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    };
  });

  const maxLikes = mappedBlogs.reduce(
    (likes, blog) => (likes > blog.likes ? likes : blog.likes),
    0
  );

  return mappedBlogs.find((blog) => blog.likes === maxLikes);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const arr = _.map(_.entries(_.countBy(_.map(blogs, 'author'))), (element) => {
    return {
      author: element[0],
      blogs: element[1],
    };
  });

  return _.maxBy(arr, 'blogs');
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  return _.maxBy(
    _.toPairs(_.groupBy(blogs, 'author')).map((element) => {
      return {
        author: element[0],
        likes: element[1].reduce(
          (totalLikes, item) => totalLikes + item.likes,
          0
        ),
      };
    }),
    'likes'
  );
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
