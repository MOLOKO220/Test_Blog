"use client";

import { useEffect, useState } from "react";
import { fetchAllPosts } from "@/app/store/postsSlice";
import PostItem from "../PostItem/PostItem";

// UI components
import FlexBox from "../UI/FlexBox";
import FormField from "../UI/FormField";

// Redux
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

export default function PostList() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  const [showPosts, setShowPosts] = useState(posts);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setShowPosts(filtered);
  }, [posts, query]);

  return (
    <section>
      <header>
        <FlexBox>
          <FormField
            label="Search by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </FlexBox>
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
