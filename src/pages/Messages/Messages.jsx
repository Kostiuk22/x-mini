import styles from './Messages.module.css';

import InfoBlock from '@components/ui/InfoBlock/InfoBlock';
import BlueBtn from '@components/ui/BlueBtn/BlueBtn';
import MessageItem from '@components/MessageItem/MessageItem';
import useMenu from '@hooks/useMenu';
import useClickOutside from '@hooks/useClickOutside';
import MessagesModal from './MessagesModal/MessagesModal';

import { TbMessage2Plus } from 'react-icons/tb';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MessagesRequests } from '@services/MessagesRequests';
import { useUserProfile } from '@hooks/useUserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { setUserChats } from '@store/messages/slices';

function Messages() {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const curUserId = useUserProfile().uid;
  const { isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();
  useClickOutside(modalRef, handleMenuClose);
  
  const chatsState = useSelector((state) => state.chats);
  const userChats = chatsState.userChats;

  useEffect(() => {
    if (curUserId) {
      const fetchChats = async () => {
        try {
          const unSub = await MessagesRequests.getUserChats(
            curUserId,
            (data) => {
              dispatch(setUserChats(data));
            }
          );

          return unSub;
        } catch (error) {
          console.error('Error fetching user chats:', error);
        }
      };

      fetchChats().then((unSub) => {
        unsubscribe = unSub;
      });
    }
    let unsubscribe;

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [curUserId, dispatch]);

  return (
    <div className={`${styles.messages}`}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h2>Messages</h2>
          <div className={styles.utilBlock}>
            <div className={styles.btn} onClick={handleMenuOpen}>
              <TbMessage2Plus size={18} />
            </div>
          </div>
        </div>
      </div>
      {userChats &&
        userChats.map((chat) => (
          <MessageItem key={chat.updatedAt} chat={chat} />
        ))}

      {!userChats && (
        <div className={styles.box}>
          <InfoBlock
            title="Welcome to your inbox!"
            text="Drop a line, share posts and more with private conversations between you and others on X. "
          />
          <BlueBtn onClick={handleMenuOpen}>Write a Message</BlueBtn>
        </div>
      )}

      {isMenuOpen &&
        createPortal(
          <MessagesModal
            handleMenuClose={handleMenuClose}
            modalRef={modalRef}
          />,
          document.body
        )}
    </div>
  );
}

export default Messages;
