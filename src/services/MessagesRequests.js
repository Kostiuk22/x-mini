import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { v4 } from 'uuid';

export const MessagesRequests = {
  selectAdresat: async (currentUserId, receiverId) => {
    try {
      const userRef = doc(db, 'userChats', currentUserId);
      const receiverRef = doc(db, 'userChats', receiverId);

      const userSnap = await getDoc(userRef);
      const receiverSnap = await getDoc(receiverRef);

      let chatId;

      if (userSnap.exists()) {
        const chats = userSnap.data().chats || [];
        const existingChat = chats.find(
          (chat) => chat.receiverId === receiverId
        );

        if (existingChat) {
          return existingChat.chatId;
        }
      }

      chatId = v4().replace(/-/g, '').substring(0, 5);

      const currentUserData = {
        chatId,
        lastMessage: '',
        receiverId,
        updatedAt: new Date().toISOString(),
        isSeen: true,
      };

      const receiverUserData = {
        chatId,
        lastMessage: '',
        receiverId: currentUserId,
        updatedAt: new Date().toISOString(),
        isSeen: true,
      };

      await Promise.all([
        userSnap.exists()
          ? updateDoc(userRef, {
              chats: arrayUnion(currentUserData),
            })
          : setDoc(userRef, {
              chats: [currentUserData],
            }),

        receiverSnap.exists()
          ? updateDoc(receiverRef, { chats: arrayUnion(receiverUserData) })
          : setDoc(receiverRef, { chats: [receiverUserData] }),

        setDoc(doc(db, 'chats', chatId), {
          createdAt: new Date().toISOString(),
          messages: [],
        }),
      ]);

      return chatId;
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  },
  getUserChats: async (curUserId, callback) => {
    try {
      const unSub = onSnapshot(doc(db, 'userChats', curUserId), (doc) => {
        if (doc.exists()) {
          callback(doc.data().chats);
        } else {
          console.warn(`Document with ID ${curUserId} does not exist.`);
          callback(null);
        }
      });

      return unSub;
    } catch (error) {
      console.error('Error in getUserChats:', error);
    }
  },

  getChat: (chatId, handleChat) => {
    const unsub = onSnapshot(doc(db, 'chats', chatId), (doc) =>
      handleChat(doc.data())
    );
    return unsub;
  },
  sendMessage: async ({ chatId, senderId, text, receiverId }) => {
    const chatRef = doc(db, 'chats', chatId);
    const senderChatsRef = doc(db, 'userChats', senderId);
    const receiverChatsRef = doc(db, 'userChats', receiverId);

    await updateDoc(chatRef, {
      messages: arrayUnion({
        senderId,
        text,
        createdAt: new Date().toISOString(),
      }),
    });

    const updateUserChats = async (userChatsRef, chatId, updateData) => {
      const docSnap = await getDoc(userChatsRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const updatedChats = data.chats.map((chat) => {
          if (chat.chatId === chatId) {
            return { ...chat, ...updateData };
          }
          return chat;
        });

        await updateDoc(userChatsRef, { chats: updatedChats });
      }
    };

    const updateDataForSender = {
      lastMessage: text,
      updatedAt: new Date().toISOString(),
      isSeen: true,
    };

    const updateDataForReceiver = {
      lastMessage: text,
      updatedAt: new Date().toISOString(),
      isSeen: false,
    };

    await updateUserChats(senderChatsRef, chatId, updateDataForSender);
    await updateUserChats(receiverChatsRef, chatId, updateDataForReceiver);
  },

  deleteChat: async ({ chatId, senderId, receiverId }) => {
    const senderChatsRef = doc(db, 'userChats', senderId);
    const receiverChatsRef = doc(db, 'userChats', receiverId);
  
    try {
      // Отримати поточний список чатів для відправника
      const senderSnapshot = await getDoc(senderChatsRef);
      const receiverSnapshot = await getDoc(receiverChatsRef);
  
      if (senderSnapshot.exists()) {
        const senderChats = senderSnapshot.data().chats || [];
        const updatedSenderChats = senderChats.filter((chat) => chat.chatId !== chatId);
        await updateDoc(senderChatsRef, { chats: updatedSenderChats });
      }
  
      if (receiverSnapshot.exists()) {
        const receiverChats = receiverSnapshot.data().chats || [];
        const updatedReceiverChats = receiverChats.filter((chat) => chat.chatId !== chatId);
        await updateDoc(receiverChatsRef, { chats: updatedReceiverChats });
      }
  
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  },
  
};
