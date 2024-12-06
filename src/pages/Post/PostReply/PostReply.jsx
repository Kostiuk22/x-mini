import styles from './PostReply.module.css';

import Avatar from '../../../components/ui/Avatar/Avatar';
import BlueBtn from '../../../components/ui/BlueBtn/BlueBtn';
import TabList from '../TabList';
import useTextarea from '../../../hooks/useTextarea';
import useFilePicker from '../../../hooks/useFilePicker';
import FileCarousel from '../../../components/FileCarousel/FileCarousel';
import FilePreview from '../../../components/FilePreview/FilePreview';

import { useState } from 'react';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { generateTag } from '../../../utils/generateTag';
import { useAddReplyMutation } from '../../../store/postsApi';

function PostReply({ authorTag, parentPostId }) {
  const [isElapsed, setIsElapsed] = useState(false);

  const { textareaRef, inputText, setInputText } = useTextarea();
  const { uid, photoURL } = useUserProfile();
  const [addReply] = useAddReplyMutation();
  const {
    filesPreview,
    handleFilesPreviewChange,
    handleFileDelete,
    handlePickerReset,
  } = useFilePicker();

  const generatedId = generateTag();

  const replyPostData = {
    parentPostId,
    postId: generatedId,
    text: inputText,
    media: filesPreview,
    createdAt: new Date().toISOString(),
    likes: [],
    numberOfViews: 0,
    authorUid: uid,
    replies: [],
  };

  const handleReplyPost = () => {
    addReply(replyPostData);
    setInputText('');
    handlePickerReset();
  };

  return (
    <div className={styles.postReply}>
      {isElapsed && (
        <h5 className={styles.replyTo}>
          Replying to <b>@{authorTag}</b>
        </h5>
      )}
      <div className={styles.content}>
        <Avatar photoURL={photoURL} />
        <div className={styles.inputColumn}>
          <div className={styles.textareaWrap}>
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onFocus={() => setIsElapsed(true)}
              placeholder="Post your reply"
              rows="1"
            />
            {!isElapsed && (
              <BlueBtn sizeBtn={'small'} disabled={inputText === ''}>
                Reply
              </BlueBtn>
            )}
          </div>
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
        </div>
      </div>
      {isElapsed && (
        <div className={styles.tabRow}>
          <TabList
            handleInputText={setInputText}
            handleFilesPreviewChange={handleFilesPreviewChange}
          />
          <BlueBtn
            onClick={handleReplyPost}
            sizeBtn="small"
            disabled={inputText === ''}
          >
            Reply
          </BlueBtn>
        </div>
      )}
    </div>
  );
}

export default PostReply;
