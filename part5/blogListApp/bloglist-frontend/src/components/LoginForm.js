import Notification from './Notification';

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  notification,
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            name='username'
            type='text'
            value={username}
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          ></input>
        </div>
        <div>
          password
          <input
            name='password'
            type='password'
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          ></input>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
