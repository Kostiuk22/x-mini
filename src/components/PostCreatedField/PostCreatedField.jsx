import styles from './PostCreatedField.module.css';

import useFilePicker from '../../hooks/useFilePicker';
import useTextarea from '../../hooks/useTextarea';
import TabList from '../../pages/Post/TabList';
import FileCarousel from '../FileCarousel/FileCarousel.jsx';
import FilePreview from '../FilePreview/FilePreview.jsx';
import Avatar from '../ui/Avatar/Avatar';
import BlueBtn from '../ui/BlueBtn/BlueBtn';

import { useUserProfile } from '../../hooks/useUserProfile.js';
import { generateTag } from '../../utils/generateTag.js';
import { useAddPostMutation } from '../../store/postsApi.js';

function PostCreatedField({ handleMenuClose }) {
  const { textareaRef, inputText, setInputText } = useTextarea();
  const {
    filesPreview,
    handleFilesPreviewChange,
    handleFileDelete,
    handlePickerReset,
  } = useFilePicker();
  const { uid, photoURL } = useUserProfile();
  const [addPost] = useAddPostMutation();

  const generatedId = generateTag();
  const postData = {
    postId: generatedId,
    text: inputText,
    media: filesPreview,
    createdAt: new Date().toISOString(),
    likes: [],
    numberOfViews: 0,
    authorUid: uid,
    replies: [],
  };

  const addPostHandler = () => {
    addPost(postData);
    setInputText('');
    handlePickerReset();
    if (handleMenuClose) handleMenuClose();
  };

  return (
    <div className={styles.postCreatedField}>
      <Avatar photoURL={photoURL} />
      <div className={styles.wrapper}>
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="What is happening?!"
          rows="1"
        />

        {filesPreview.length > 0 && (
          <FileCarousel>
            {filesPreview.map((el) => (
              <FilePreview
                key={el.fileId}
                fileUrl={el.file}
                onFileDelete={() => handleFileDelete(el.fileId)}
              />
            ))}
          </FileCarousel>
        )}

        <div className={styles.tabRow}>
          <TabList
            handleInputText={setInputText}
            handleFilesPreviewChange={handleFilesPreviewChange}
          />
          <BlueBtn
            onClick={addPostHandler}
            sizeBtn={'small'}
            disabled={inputText === ''}
          >
            Post
          </BlueBtn>
        </div>
      </div>
    </div>
  );
}

export default PostCreatedField;
