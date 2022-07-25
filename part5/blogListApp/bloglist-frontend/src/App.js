import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotification({
        type: 'error',
        message: 'wrong username or password',
      });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
  };

  const addNewBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    const returnedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(returnedBlog));
    setTitle('');
    setAuthor('');
    setUrl('');
    setNotification({
      type: 'success',
      message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
    });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  if (user === null) {
    return (
      <LoginForm
        user={user}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        notification={notification}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in{' '}
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedUser');
            setUser(null);
          }}
        >
          logout
        </button>
      </p>
      <CreateBlogForm
        addNewBlog={addNewBlog}
        title={title}
        author={author}
        url={url}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
      />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
