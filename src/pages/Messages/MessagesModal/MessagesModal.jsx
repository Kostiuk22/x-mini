import styles from './MessagesModal.module.css';

import HeaderTitle from '../../../components/ui/HeaderTitle/HeaderTitle';
import SearchField from '../../../components/ui/SearchField/SearchField';
import LoadingSpinner from '../../../components/ui/LoadingSpinner/LoadingSpinner';
import SearchedUser from '../../../components/SearchedUser/SearchedUser';

import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import { useSearchUser } from '../../../hooks/useSearchUser';
import { MessagesRequests } from '../../../services/MessagesRequests';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { useDispatch } from 'react-redux';
import { setChatId } from '../../../store/messages/slices';

function MessagesModal({ modalRef, handleMenuClose }) {
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  
  const currentUserId = useUserProfile().uid;
  const [result, isSearching] = useSearchUser(searchText);

  const toggleSelectedUser = (user) => {
    if (selectedUser === user) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const render = result?.map((user) => (
    <SearchedUser
      key={user.uid}
      user={user}
      role="messagesSearch"
      onClick={() => toggleSelectedUser(user)}
      isSelected={selectedUser?.uid === user.uid}
    />
  ));

  const handleSubmitAdresat = async (e) => {
    e.preventDefault();
    if (currentUserId && selectedUser) {
      try {
        const chatId = await MessagesRequests.selectAdresat(
          currentUserId,
          selectedUser.uid
        );
        dispatch(setChatId(chatId));
      } catch (error) {
        console.error(error.message);
      }
    }

    handleMenuClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox} ref={modalRef}>
        <header>
          <button className={styles.closeBtn} onClick={handleMenuClose}>
            <IoMdClose />
          </button>
          <HeaderTitle title="New Messages" />
          <button
            className={`${selectedUser ? styles.nextBtn : styles.disabled}`}
            onClick={handleSubmitAdresat}
            disabled={!selectedUser}
          >
            <span>Next</span>
          </button>
        </header>
        <div className={styles.search}>
          <SearchField
            placeholderText="Search people"
            text={searchText}
            onChange={setSearchText}
          />
        </div>
        {isSearching ? <LoadingSpinner /> : render}
      </div>
    </div>
  );
}

export default MessagesModal;
