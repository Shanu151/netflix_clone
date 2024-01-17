// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  or,
  arrayUnion,
  deleteField,
  arrayRemove,
  increment,
  collection,
  writeBatch,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
  addDoc,
  getDoc,
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Toasts } from "../components/Toast";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7-I5TyrgRjeHZ7cnlPiPyRhezszNWlJA",
  authDomain: "blutor.firebaseapp.com",
  projectId: "blutor",
  storageBucket: "blutor.appspot.com",
  messagingSenderId: "294404145418",
  appId: "1:294404145418:web:ec4aafc3ab248a55bb3af3",
  measurementId: "G-SS1LB1RVK3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const startConversation = async (user1Id: string, user2Id: string) => {
  const db = getFirestore();

  const conversationId = [user1Id, user2Id].sort().join("_");

  const conversationRef = doc(db, "conversations", conversationId);

  // Check if a conversation already exists
  const conversationSnap = await getDoc(conversationRef);

  if (!conversationSnap.exists()) {
    // Create a new conversation
    await setDoc(conversationRef, {
      user1: user1Id,
      user2: user2Id,
    });
  }

  return conversationId;
};

export const getConversationById = async (conversationId: string) => {
  const db = getFirestore();

  // Get a reference to the conversation document
  const conversationRef = doc(db, "conversations", conversationId);

  // Fetch the conversation
  const conversationSnap = await getDoc(conversationRef);

  // Check if the conversation exists
  if (!conversationSnap.exists()) {
    throw new Error(`No such conversation: ${conversationId}`);
  }

  // Transform the Firestore document to a plain JavaScript object
  const conversation = {
    id: conversationSnap.id,
    ...conversationSnap.data(),
  };

  return conversation;
};

export const subscribeToConversations = (userId: string, handleUpdate: any) => {
  const db = getFirestore();

  // Define the query
  const conversationsQuery = query(
    collection(db, "conversations"),
    or(where("user1", "==", userId), where("user2", "==", userId)),
    orderBy("lastMessage.timestamp", "desc")
  );

  // Subscribe to the query
  const unsubscribe = onSnapshot(conversationsQuery, (snapshot) => {
    // Transform Firestore documents to plain JavaScript objects
    const conversations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Call the update handler
    handleUpdate(conversations);
  });

  // Return the unsubscribe function
  return unsubscribe;
};

export const sendMessageFirebase = async (
  conversationId: string,
  message: any
) => {
  try {
    const db = getFirestore();
    //   console.log(conversationId);

    // Add new message
    const messagesCollection = collection(
      db,
      `conversations/${conversationId}/messages`
    );
    const newMessageRef = await addDoc(messagesCollection, {
      ...message,
      senderId: message.senderId,
      read: false,
      timestamp: serverTimestamp(), // Use server timestamp to avoid time discrepancies
    });

    // Update last message in conversation
    const conversationRef = doc(db, "conversations", conversationId);
    await updateDoc(conversationRef, {
      lastMessage: {
        ...message,
        id: newMessageRef.id, // Include message ID
        timestamp: serverTimestamp(), // Use server timestamp to avoid time discrepancies
      },
    });
    await updateDoc(conversationRef, {
      unreadMessageCount: increment(1),
    });
    await updateDoc(conversationRef, {
      deletedFor: null,
    });
  } catch (err) {
    console.log(err);
    Toasts("Something went wrong!");
  }
};

export const getOtherUser = (conversation: any, currentUser: string) => {
  if (conversation?.user1 == currentUser) {
    return conversation.user2;
  }
  if (conversation?.user2 == currentUser) {
    return conversation.user1;
  }
};

export const subscribeToMessages = (
  conversationId: string,
  handleUpdate: any,
  userId: string
) => {
  const db = getFirestore();

  // Define the query
  const messagesQuery = query(
    collection(db, `conversations/${conversationId}/messages`),
    orderBy("timestamp", "asc")
  );

  // Subscribe to the query
  const unsubscribe = onSnapshot(messagesQuery, async (snapshot) => {
    // Transform Firestore documents to plain JavaScript objects
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // console.log(messages);
    // Call the update handler
    handleUpdate(messages.reverse());
  });

  // Return the unsubscribe function
  return unsubscribe;
};

export const markMessagesAsRead = async (
  conversationId: any,
  userId: string
) => {
  const db = getFirestore();

  // Get all unread messages from the other user
  const messagesQuery = query(
    collection(db, `conversations/${conversationId}/messages`),
    where("read", "==", false),
    where("senderId", "!=", userId)
  );
  const snapshot = await getDocs(messagesQuery);

  // Mark all messages as read
  const batch = writeBatch(db);
  snapshot.docs.forEach((doc) => {
    const messageRef = doc.ref;
    batch.update(messageRef, { read: true });
  });
  await batch.commit();

  // Reset the unread message count
  const conversationRef = doc(db, "conversations", conversationId);
  await updateDoc(conversationRef, { unreadMessageCount: 0 });
};

export const blockConversation = async (
  conversationId: string,
  userId: string
) => {
  const db = getFirestore();

  const conversationRef = doc(db, "conversations", conversationId);

  // Add the user to the blockedBy array
  await updateDoc(conversationRef, {
    blockedBy: arrayUnion(userId),
  });
};

export const unblockConversation = async (
  conversationId: string,
  userId: string
) => {
  const db = getFirestore();

  const conversationRef = doc(db, "conversations", conversationId);

  // Remove the user from the blockedBy array
  await updateDoc(conversationRef, {
    blockedBy: arrayRemove(userId),
  });
};

export const deleteMessage = async (
  conversationId: string,
  messageId: string,
  userId: string
) => {
  const db = getFirestore();

  const messageRef = doc(
    db,
    `conversations/${conversationId}/messages`,
    messageId
  );

  // Add the user to the deletedFor array
  await updateDoc(messageRef, {
    deletedFor: arrayUnion(userId),
  });
};

export const deleteAllMessages = async (
  conversationId: string,
  userId: string
) => {
  const db = getFirestore();

  // Get all messages in the conversation
  const messagesQuery = query(
    collection(db, `conversations/${conversationId}/messages`)
  );
  const snapshot = await getDocs(messagesQuery);

  // Mark all messages as deleted for the user
  const batch = writeBatch(db);
  snapshot.docs.forEach((doc) => {
    const messageRef = doc.ref;
    batch.update(messageRef, { deletedFor: arrayUnion(userId) });
  });

  const conversationRef = doc(db, "conversations", conversationId);

  // Add the user to the deletedFor array
  await updateDoc(conversationRef, {
    deletedFor: arrayUnion(userId),
  });

  await batch.commit();
};

export const subscribeToUnreadConversationsCount = (
  userId: string,
  handleUpdate: any
) => {
  const db = getFirestore();

  // Define the query
  const conversationsQuery = query(
    collection(db, "conversations"),
    or(where("user1", "==", userId), where("user2", "==", userId))
  );

  // Subscribe to the query
  const unsubscribe = onSnapshot(conversationsQuery, (snapshot) => {
    // Calculate the count of unread conversations
    const unreadCount = snapshot.docs.reduce((count, doc) => {
      const conversationData = doc.data();

      // Check if the conversation has unread messages for the user
      if (
        conversationData.unreadMessageCount > 0 &&
        conversationData.lastMessage.senderId !== userId
      ) {
        return count + 1;
      }

      return count;
    }, 0);

    // Call the update handler
    handleUpdate(unreadCount);
  });

  // Return the unsubscribe function
  return unsubscribe;
};

export const reactToMessage = async (
  conversationId: string,
  messageId: string,
  userId: string,
  reactionNumber: number
) => {
  const db = getFirestore();
  const messageRef = doc(
    db,
    `conversations/${conversationId}/messages/${messageId}`
  );

  // Update the reactions field with the new reaction for the user
  await updateDoc(messageRef, {
    [`reactions.${userId}`]: reactionNumber,
  });
};

export const removeReaction = async (
  conversationId: string,
  messageId: string,
  userId: string
) => {
  const db = getFirestore();
  const messageRef = doc(
    db,
    `conversations/${conversationId}/messages/${messageId}`
  );

  // Remove the reaction for the user
  await updateDoc(messageRef, {
    [`reactions.${userId}`]: deleteField(),
  });
};
