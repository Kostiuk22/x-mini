import styles from './TabList.module.css';

import { RiGalleryLine } from 'react-icons/ri';
import { HiOutlineGif } from 'react-icons/hi2';
import { BsEmojiSmile } from 'react-icons/bs';
import { useRef, useState } from 'react';

import EmojiPicker from 'emoji-picker-react';
import useClickOutside from '../../hooks/useClickOutside';

function TabList({ handleInputText, handleFilesPreviewChange }) {
  const [showPikerEmoji, setShowPikerEmoji] = useState(false);
  const pickerEmojiRef = useRef(null);

  const handleEmojiClick = (emojiObject) => {
    handleInputText((prev) => prev + emojiObject.emoji);
  };

  useClickOutside(pickerEmojiRef, () => setShowPikerEmoji(false));

  return (
    <div className={styles.tabList}>
      <div className={styles.tabItem}>
        <input
          type="file"
          accept="image/*, video/*"
          onChange={handleFilesPreviewChange}
        />
        <RiGalleryLine />
      </div>
      <div className={styles.tabItem}>
        <HiOutlineGif />
      </div>
      <div className={styles.tabItem} onClick={() => setShowPikerEmoji(true)}>
        <BsEmojiSmile />
      </div>
      {showPikerEmoji && (
        <div className={styles.emojiBox} ref={pickerEmojiRef}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme="dark"
            emojiStyle="facebook"
          />
        </div>
      )}
    </div>
  );
}

export default TabList;
