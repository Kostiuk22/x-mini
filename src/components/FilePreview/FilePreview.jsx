import styles from './FilePreview.module.css';

function FilePreview({ fileUrl, onFileDelete }) {
  return (
    <div className={styles.filePreview}>
      {fileUrl.startsWith('data:image/') && (
        <img src={fileUrl} alt={fileUrl} />
      )}
      {fileUrl.startsWith('data:video/') && (
        <video src={fileUrl} controls />
      )}
      <button onClick={onFileDelete} className={styles.close}>
        ✕
      </button>
    </div>
  );
}

export default FilePreview;
