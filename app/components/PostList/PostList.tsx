"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "@/app/store/postsSlice";
import { RootState, AppDispatch } from "@/app/store/store";
import { TextField, Box } from "@mui/material";
import PostItem from "../PostItem/PostItem";

export default function PostList() {
  // redux
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  // hooks
  const [showPosts, setShowPosts] = useState(posts);
  const [query, setQuery] = useState("");

  // get all posts
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  // filter posts
  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setShowPosts(filtered);
  }, [posts, query]);

  return (
    <section>
      <header>
        <Box mb={2}>
          <TextField
            label="Search by title"
            variant="outlined"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </header>

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && posts.length === 0 && <p>No posts yet.</p>}

      <ul>
        {showPosts.map((post) => (
          <PostItem
            key={post.id}
            createdAt={post.createdAt}
            id={post.id}
            description={post.description}
            title={post.title}
          />
        ))}
      </ul>
    </section>
  );
}
