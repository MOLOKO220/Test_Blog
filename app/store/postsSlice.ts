import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "@/app/types/post";
import { createPostInDB, fetchPostsFromDB } from "@/app/lib/postApi";

const initialState: {
  posts: Post[];
  loading: boolean;
  error: string | null;
} = {
  posts: [],
  loading: false,
  error: null,
};

// get all posts
export const fetchAllPosts = createAsyncThunk("posts/fetchAll", async () => {
  const posts = await fetchPostsFromDB();
  return posts;
});

// create a new post
export const createPost = createAsyncThunk(
  "posts/create",
  async (newPost: Omit<Post, "id" | "createdAt">) => {
    const created = await createPostInDB(newPost);
    return created;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading posts";
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export default postsSlice.reducer;
