import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from '../ui/Avatar/Avatar';
import styles from './MessageItem.module.css';
import { useEffect, useState } from 'react';
import MoreBtn from '../ui/MoreBtn/MoreBtn';
import ActionMenu from '../ActionMenu/ActionMenu';
import useMenu from '../../hooks/useMenu';
import { messagesMenuActions } from '../../utils/menuActions';
import { UserRequests } from '../../services/UserRequests';
import { MessagesRequests } from '../../services/MessagesRequests';
import { transformDate } from '../../utils/transformDate';
import { useDispatch } from 'react-redux';
import { setChatId, setReceiver } from '../../store/messages/slices';
import { useUserProfile } from '../../hooks/useUserProfile';

function MessageItem({ chat }) {
  const { chatId, lastMessage, receiverId, updatedAt, isSeen } = chat;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [receiverData, setReceiverData] = useState({});
  const userId = useUserProfile().uid;
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();
  const transformedDate = transformDate(updatedAt);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await UserRequests.getUserById(receiverId);
      if (data.exists()) {
        setReceiverData(data.data());
      }
    };

    fetchUser();
  }, [receiverId, dispatch]);

  const handleMoreClick = () => {
    setIsHovered(false);
    handleMenuOpen();
  };

  const handleMessageClick = () => {
    dispatch(setReceiver(receiverData));
    dispatch(setChatId(chatId));
  };

  const handleDeleteChat = async () => {
    await MessagesRequests.deleteChat({ chatId, senderId: userId, receiverId });
    navigate('/x.com/messages');
  };

  return (
    <NavLink
      to={`${chatId}`}
      className={({ isActive }) =>
        isActive
          ? `${styles.messageItem} ${styles.active}`
          : !isSeen
          ? `${styles.messageItem} ${styles.seen}`
          : styles.messageItem
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleMessageClick}
    >
      <Avatar photoURL={receiverData?.photoURL} />
      <div className={styles.content}>
        <div className={styles.topSide}>
          <div className={styles.topSideText}>
            <h3>{receiverData?.name}</h3>
            <h5>
              @{receiverData?.tag} · {updatedAt ? transformedDate : 'N/A'}
            </h5>
          </div>
          <div
            className={`${styles.forBtn} ${
              isHovered ? styles.visible : styles.hidden
            }`}
          >
            <MoreBtn onClick={handleMoreClick} />
          </div>
          {isMenuOpen && (
            <ActionMenu
              onClose={handleMenuClose}
              isVisible={isMenuOpen}
              items={messagesMenuActions(handleDeleteChat)}
            />
          )}
        </div>
        <div className={styles.lastMsg}>
          <h5>{lastMessage}</h5>
        </div>
      </div>
    </NavLink>
  );
}

export default MessageItem;