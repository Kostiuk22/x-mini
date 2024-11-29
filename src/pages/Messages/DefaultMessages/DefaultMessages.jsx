import styles from './DefaultMessages.module.css';

function DefaultMessages() {
  return (
    <div className={styles.dfltMsg}>
      <h1>Select a message</h1>
      <h6>
        Choose from your existing conversations, start a new one, or just keep
        swimming.
      </h6>
    </div>
  );
}

export default DefaultMessages;
