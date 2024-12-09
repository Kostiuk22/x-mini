import styles from './MessageSection.module.css';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Msg from './Msg/Msg';
import NickName from '../ui/NickName/NickName';
import { IoArrowBack } from 'react-icons/io5';
import defaultImg from '@assets/defaultUser.png';
import { BsEmojiSmile } from 'react-icons/bs';
import { TbSend2 } from 'react-icons/tb';
import EmojiPicker from 'emoji-picker-react';
import { transformDate } from '@utils/transformDate';
import { MessagesRequests } from '@services/MessagesRequests';
import useClickOutside from '@hooks/useClickOutside';
import { useUserProfile } from '@hooks/useUserProfile';
import { useWindowWidth } from '@hooks/useWindowWidth';

function MessageSection() {
  const [inputText, setInputText] = useState('');
  const [curWidth] = useWindowWidth();

  const [showPikerEmoji, setShowPikerEmoji] = useState(false);
  const pickerEmojiRef = useRef(null);
  const handleEmojiClick = (emojiObject) => {
    setInputText((prev) => prev + emojiObject.emoji);
  };
  useClickOutside(pickerEmojiRef, () => setShowPikerEmoji(false));

  const { uid } = useUserProfile();
  const chatId = useParams().chatId;
  const receiverData = useSelector((state) => state.chats.receiver);
  const [chat, setChat] = useState(null);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  useEffect(() => {
    const unSubChat = MessagesRequests.getChat(chatId, (data) => {
      setChat(data);
    });

    return () => {
      unSubChat();
    };
  }, [chatId, uid]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    await MessagesRequests.sendMessage({
      chatId,
      senderId: uid,
      receiverId: receiverData?.uid,
      text: inputText,
    });
    setInputText('');
  };

  return (
    <div className={styles.messageSection}>
      <div className={styles.box}>
        <div className={styles.header}>
          {curWidth <= 1002 && (
            <Link to={'..'} className={styles.exitBtn}>
              <IoArrowBack />
            </Link>
          )}
          <div className={styles.spaceBetween}>
            <h3>{receiverData?.name}</h3>
            {/* <div className={styles.btn}>
              <IoMdInformationCircleOutline size={20} />
            </div> */}
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.avatar}>
            <img src={receiverData?.photoURL || defaultImg} alt="Avatar" />
          </div>
          <div className={styles.head}>
            <NickName userName={receiverData?.name} tag={receiverData?.tag} />
            <h6>@{receiverData?.tag}</h6>
          </div>
          {receiverData?.bio && <span>{receiverData?.bio}</span>}
          <h6 className={styles.additionalInfo}>
            Joined {transformDate(receiverData?.dateOfJoining)} ·
            {receiverData?.followers?.length} Followers
          </h6>
        </div>

        <div className={styles.chat}>
          {chat?.messages.map((message) => (
            <Msg key={message?.createdAt} message={message} />
          ))}
          <div ref={endRef}></div>
        </div>
      </div>

      <div className={styles.inputBlock}>
        <div className={styles.inputField}>
          <div className={styles.icon} onClick={() => setShowPikerEmoji(true)}>
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
          <input
            type="text"
            placeholder="Start a new message"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={styles.icon}
            disabled={inputText.length == 0}
            onClick={handleSendMessage}
          >
            <TbSend2 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageSection;
