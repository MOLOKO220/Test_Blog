import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export async function fetchComments(postId: string) {
  const snapshot = await getDocs(collection(db, "posts", postId, "comments"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addComment(postId: string, data: { text: string }) {
  const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function deleteComment(postId: string, commentId: string) {
  await deleteDoc(doc(db, "posts", postId, "comments", commentId));
}
