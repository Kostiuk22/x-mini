import styles from './MessageSection.module.css';
import NickName from '../ui/NickName/NickName';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useEffect, useRef, useState } from 'react';
import { MessagesRequests } from '../../services/MessagesRequests';
import defaultImg from '../../assets/defaultUser.png';
import { transformDate } from '../../utils/transformDate';
import { useSelector } from 'react-redux';
import { BsEmojiSmile } from 'react-icons/bs';
import { TbSend2 } from 'react-icons/tb';
import EmojiPicker from 'emoji-picker-react';
import useClickOutside from '../../hooks/useClickOutside';
import Msg from './Msg/Msg';

function MessageSection() {
  const [inputText, setInputText] = useState('');

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
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  useEffect(() => {
    const unSubChat = MessagesRequests.getChat(chatId, (data) => {
      setChat(data);
    });

    return () => {
      unSubChat();
    };
  }, [chatId, uid]);

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
          <h3>{receiverData?.name}</h3>
          <div className={styles.btn}>
            <IoMdInformationCircleOutline size={20} />
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
