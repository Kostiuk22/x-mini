import { useEffect, useRef, useState } from 'react';
import InputBox from '../../../components/ui/Input/InputBox/InputBox';
import styles from './ChangeTag.module.css';
import { useUserProfile } from '../../../hooks/useUserProfile';
import BlueBtn from '../../../components/ui/BlueBtn/BlueBtn';
import { UserRequests } from '../../../services/UserRequests';
import { useDispatch } from 'react-redux';

function ChangeTag() {
  const { tag, uid } = useUserProfile();
  const [inputText, setInputText] = useState(tag);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    const fetchTags = async () => {
      const data = await UserRequests.getTags();
      setTags(data);
    };
    fetchTags();
  }, [tag]);

  const handleTagChange = async () => {
    await UserRequests.changeTag(uid, inputText, dispatch);
  };

  return (
    <div className={styles.changeTag}>
      <div className={styles.header}>
        <h2>Change tag</h2>
        <h5>Change current user tag</h5>
      </div>

      <div className={styles.box} onClick={() => inputRef.current.focus()}>
        <InputBox
          label="Tag"
          maxCharacter={20}
          currentCharacter={inputText.length}
          errMessage={
            inputText.length > 0 && inputText.length >= 21
              ? 'Tag must be less than 21 symbols'
              : tags.includes(inputText) && inputText !== tag
              ? 'This tag already been used'
              : ''
          }
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={styles.input}
            ref={inputRef}
          />
        </InputBox>
      </div>
      <BlueBtn
        onClick={handleTagChange}
        sizeBtn="small"
        disabled={
          inputText.length === 0 ||
          inputText.length >= 21 ||
          tags.includes(inputText)
        }
      >
        Save
      </BlueBtn>
    </div>
  );
}

export default ChangeTag;
