import "../css/Message.css";

const Message = ({ handler, message }) => {
  return (
    <section id="deleted">
      <h1>{message}</h1>
      <button onClick={handler}>Ok</button>
    </section>
  );
};

export default Message;
