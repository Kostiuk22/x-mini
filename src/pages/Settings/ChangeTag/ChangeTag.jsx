import styles from './ChangeTag.module.css';

import InputBox from '../../../components/ui/Input/InputBox/InputBox';
import BlueBtn from '../../../components/ui/BlueBtn/BlueBtn';

import { useEffect, useRef, useState } from 'react';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { UserRequests } from '../../../services/UserRequests';
import { useDispatch } from 'react-redux';
import { IoArrowBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../../../hooks/useWindowWidth';

function ChangeTag() {
  const { tag, uid } = useUserProfile();

  const [inputText, setInputText] = useState(tag);
  const [tags, setTags] = useState([]);
  
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [curWidth] = useWindowWidth();

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
        {curWidth <= 1002 && (
          <Link to={'..'} className={styles.exitBtn}>
            <IoArrowBack />
          </Link>
        )}
        <div className={styles.text}>
          <h2>Change tag</h2>
          <h5>Change current user tag</h5>
        </div>
      </div>

      <div className={styles.box} onClick={() => inputRef?.current.focus()}>
        <InputBox
          label="Tag"
          maxCharacter={20}
          currentCharacter={inputText?.length}
          errMessage={
            inputText?.length > 0 && inputText?.length >= 21
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
          inputText?.length === 0 ||
          inputText?.length >= 21 ||
          tags.includes(inputText)
        }
      >
        Save
      </BlueBtn>
    </div>
  );
}

export default ChangeTag;
