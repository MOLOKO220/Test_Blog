import { db } from "./firebase";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Post } from "@/app/types/post";

export async function createPostInDB(
  data: Omit<Post, "id" | "createdAt">
): Promise<Post> {
  const docRef = await addDoc(collection(db, "posts"), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return {
    id: docRef.id,
    ...data,
    createdAt: new Date().toISOString(),
  };
}

export async function fetchPostsFromDB(): Promise<Post[]> {
  const snapshot = await getDocs(collection(db, "posts"));

  const posts: Post[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      content: data.content,
      createdAt: data.createdAt?.toDate().toISOString() || "",
    };
  });

  return posts;
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();

    const post: Post = {
      id: docSnap.id,
      title: data.title,
      description: data.description,
      content: data.content,
      createdAt: data.createdAt?.toDate().toISOString() || "",
    };

    return post;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return null;
  }
}

export async function updatePost(
  id: string,
  data: { title: string; description: string; content: string }
) {
  try {
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, data);
    return true;
  } catch (error) {
    console.error("Error with update:", error);
    return false;
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const postRef = doc(db, "posts", id);
    await deleteDoc(postRef);
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
}
