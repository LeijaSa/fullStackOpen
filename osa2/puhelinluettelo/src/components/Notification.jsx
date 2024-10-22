const Notification = ({ style, message }) => {
  if (!message) {
    return null;
  }

  return <div className={style}>{message}</div>;
};

export default Notification;
