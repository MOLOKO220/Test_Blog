"use client";

import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, List } from "@mui/material";
import { addComment, fetchComments } from "@/app/lib/commentsApi";
import CommentItem from "../CommentsItem/CommentsItem";

export default function CommentsWrapper({ postId }: { postId: string }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadComments();
  }, [postId]);

  // gat all comments for the post
  const loadComments = async () => {
    const data = await fetchComments(postId);
    setComments(data);
  };

  // add a new comment
  const handleAddComment = async () => {
    if (!text.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    await addComment(postId, { text });
    setText("");
    setError("");
    loadComments();
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">Comments</Typography>

      <Box display="flex" gap={2} pb={2} mt={2}>
        <TextField
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
          label="Write a comment"
          fullWidth
          error={!!error}
          helperText={error}
        />
        <Button variant="contained" onClick={handleAddComment}>
          Send
        </Button>
      </Box>

      <List>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            text={comment.text}
            createdAt={comment.createdAt}
            postId={postId}
            onDeleted={loadComments}
          />
        ))}
      </List>
    </Box>
  );
}
