"use client";

import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import { deleteComment } from "@/app/lib/commentsApi";

// UI components
import FlexBox from "../UI/FlexBox";
import StyledContainer from "../UI/StyledContainer";
import TextSecondary from "../UI/TextSecondary";

type CommentItemProps = {
  id: string;
  postId: string;
  text: string;
  createdAt?: { seconds: number };
  onDeleted?: () => void;
};

export default function CommentItem({
  id,
  postId,
  text,
  createdAt,
  onDeleted,
}: CommentItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteComment(postId, id);
      onDeleted?.();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <StyledContainer
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "2px",
        padding: "8px 16px",
      }}
    >
      <FlexBox direction="column" gap="4px" style={{ marginBottom: "0" }}>
        <TextSecondary color="black" style={{ marginBottom: "0" }}>
          {text}
        </TextSecondary>
        {createdAt && (
          <TextSecondary fontStyle="italic" style={{ fontSize: "0.8rem" }}>
            {new Date(createdAt.seconds * 1000).toLocaleString("uk-UA", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </TextSecondary>
        )}
      </FlexBox>

      <IconButton
        edge="end"
        aria-label="delete"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? <CircularProgress size={20} /> : <DeleteIcon />}
      </IconButton>
    </StyledContainer>
  );
}
