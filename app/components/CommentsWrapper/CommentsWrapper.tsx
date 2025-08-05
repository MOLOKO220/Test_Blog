"use client";

import { useEffect, useState } from "react";
import { addComment, fetchComments } from "@/app/lib/commentsApi";
import CommentItem from "../CommentsItem/CommentsItem";

// UI components
import FlexBox from "../UI/FlexBox";
import Title from "../UI/Title";
import FormField from "../UI/FormField";
import Button from "../UI/Button/Button";

export default function CommentsWrapper({ postId }: { postId: string }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    const data = await fetchComments(postId);
    setComments(data);
  };

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
    <FlexBox direction="column" gap="12px">
      <Title as="h6" fontSize="20px">
        Comments
      </Title>

      <FlexBox align="flex-start" gap="8px">
        <FormField
          margin="0"
          label="Write a comment"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
          error={error ? { message: error, type: "manual" } : undefined}
        />
        <Button onClick={handleAddComment} $height="53px">
          Send
        </Button>
      </FlexBox>

      <FlexBox direction="column" gap="8px">
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
      </FlexBox>
    </FlexBox>
  );
}
