import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db, firebaseEnabled } from "./firebase";

// Simple wrappers that no-op or operate on Firestore depending on firebaseEnabled

// Firestore collection names: users, conversations, messages

export const createUser = async (user) => {
  if (!firebaseEnabled) return null;
  const userRef = doc(db, "users", String(user.id));
  await setDoc(
    userRef,
    { ...user, updatedAt: serverTimestamp() },
    { merge: true }
  );
  return userRef;
};

export const updateUser = async (id, updates) => {
  if (!firebaseEnabled) return null;
  const userRef = doc(db, "users", String(id));
  await updateDoc(userRef, { ...updates, updatedAt: serverTimestamp() });
  return userRef;
};

export const getUsers = async () => {
  if (!firebaseEnabled) return [];
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const createConversation = async (participants = [], meta = {}) => {
  if (!firebaseEnabled) return null;
  const convRef = await addDoc(collection(db, "conversations"), {
    participants,
    meta,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return convRef;
};

// Try to find an existing conversation between two participants (order-insensitive).
// If found, return the conversation id; otherwise create a new conversation and return its id.
export const getOrCreateConversation = async (userA, userB, meta = {}) => {
  if (!firebaseEnabled) return null;
  const a = String(userA);
  const b = String(userB);

  // Query conversations where participants array contains userA, then filter client-side for userB
  const q = query(
    collection(db, "conversations"),
    where("participants", "array-contains", a),
    orderBy("updatedAt", "desc")
  );
  const snap = await getDocs(q);
  for (const docSnap of snap.docs) {
    const data = docSnap.data();
    const parts = data.participants || [];
    if (parts.map(String).includes(a) && parts.map(String).includes(b)) {
      return docSnap.id;
    }
  }

  // not found -> create
  const convRef = await createConversation([a, b], meta);
  return convRef ? convRef.id : null;
};

export const getConversationsForUser = async (userId) => {
  if (!firebaseEnabled) return [];
  const q = query(
    collection(db, "conversations"),
    where("participants", "array-contains", String(userId)),
    orderBy("updatedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const sendMessage = async (conversationId, message) => {
  if (!firebaseEnabled) return null;
  const messagesRef = collection(
    db,
    "conversations",
    conversationId,
    "messages"
  );
  const msg = {
    ...message,
    createdAt: serverTimestamp(),
  };
  const r = await addDoc(messagesRef, msg);
  // update conversation's updatedAt and lastMessage
  const convRef = doc(db, "conversations", conversationId);
  await updateDoc(convRef, {
    updatedAt: serverTimestamp(),
    lastMessage: message.text || "",
  });
  return r;
};

export const getMessages = async (conversationId, limit = 100) => {
  if (!firebaseEnabled) return [];
  const messagesRef = collection(
    db,
    "conversations",
    conversationId,
    "messages"
  );
  const q = query(messagesRef, orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const subscribeToConversation = (conversationId, onUpdate) => {
  if (!firebaseEnabled) return () => {};
  const messagesRef = collection(
    db,
    "conversations",
    conversationId,
    "messages"
  );
  const q = query(messagesRef, orderBy("createdAt", "asc"));
  const unsub = onSnapshot(q, (snap) => {
    const msgs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    onUpdate(msgs);
  });
  return unsub;
};

export const subscribeToConversationsForUser = (userId, onUpdate) => {
  if (!firebaseEnabled) return () => {};
  const q = query(
    collection(db, "conversations"),
    where("participants", "array-contains", String(userId)),
    orderBy("updatedAt", "desc")
  );
  const unsub = onSnapshot(q, (snap) => {
    const convs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    onUpdate(convs);
  });
  return unsub;
};
