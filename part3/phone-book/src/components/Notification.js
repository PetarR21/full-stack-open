const Notification = ({ message, error }) => {
  if (message === null) return null;

  if (error) {
    return <div className="message error">{message}</div>;
  } else {
    return <div className="message success">{message}</div>;
  }
};

export default Notification;
