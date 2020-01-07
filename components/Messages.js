const Messages = ({ msg }) => {
  const messages = JSON.parse(msg);

  return messages.map(msg => (
    <div className='alert alert-primary'>{msg.msg}</div>
  ));
};

export default Messages;
