const moongose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./helper');
const bcrypt = require('bcrypt');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('getting blogs', () => {
  test('blogs are returened as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 100000);

  test('returns correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('adding new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Blog X',
      author: 'Author X',
      url: 'http://www.testX.com',
      likes: 12,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    expect(
      blogsAtEnd.map((blog) => {
        return {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes,
        };
      })
    ).toContainEqual(newBlog);
  });

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Blog X',
      author: 'Author X',
      url: 'http://www.testX.com',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(
      blogsAtEnd.map((blog) => {
        return {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes,
        };
      })
    ).toContainEqual({ ...newBlog, likes: 0 });
  });

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'AuthorX',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deleting single blog post', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    expect(
      blogsAtEnd.map((blog) => {
        return {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes,
        };
      })
    ).not.toContainEqual(blogToDelete);
  });
});

describe('updating single blog post', () => {
  test('succesfully updates blog', async () => {
    const newBlog = {
      title: 'Blog X',
      author: 'Author X',
      url: 'http://www.testX.com',
      likes: 1,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs.find((blog) => blog.title === newBlog.title);

    const updatedBlog = {
      ...newBlog,
      likes: newBlog.likes + 1,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogs.length);
    expect(
      blogsAtEnd.map((blog) => {
        return {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes,
        };
      })
    ).toContainEqual(updatedBlog);
  }, 20000);
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'test',
      name: 'Test',
      password: 'testpassword',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails when username is not provided', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be provided');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails when username is not at least 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'aa',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'username must be at least 3 characters long'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails when password is not provided', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'superuser',
      name: 'Superuser',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('password must be provided');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails when password is not at least 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'superuser',
      name: 'Superuser',
      password: 'sa',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'password must be at least 3 characters long'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(() => {
  moongose.connection.close();
});
