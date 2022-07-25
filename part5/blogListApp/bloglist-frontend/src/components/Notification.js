const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return (
    <div>
      <div className={notification.type}>{notification.message}</div>
    </div>
  );
};

export default Notification;
