"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  ListItem,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment } from "@/app/lib/commentsApi";

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
    <ListItem
      sx={{
        border: "1px solid #9b9b9b",
        borderRadius: 2,
        mb: 2,
        px: 2,
        py: 1,
        alignItems: "flex-start",
      }}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? <CircularProgress size={20} /> : <DeleteIcon />}
        </IconButton>
      }
    >
      <Box>
        <Typography variant="body1" sx={{ mb: 0.5 }}>
          {text}
        </Typography>
        {createdAt && (
          <Typography variant="caption" color="text.secondary">
            {new Date(createdAt.seconds * 1000).toLocaleString("uk-UA", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Typography>
        )}
      </Box>
    </ListItem>
  );
}
