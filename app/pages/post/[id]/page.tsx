"use client";

import { useState, useEffect } from "react";
import { getPostById, updatePost, deletePost } from "@/app/lib/postApi";
import { Box, Typography, TextField, Button } from "@mui/material";
import SectionHeader from "@/app/components/SectionHeader/SectionHeader";
import { useParams, useRouter } from "next/navigation";
import { Post } from "@/app/types/post";
import { usePostFormValidation } from "@/app/hooks/usePostFormValidation/usePostFormValidation";
import CommentsWrapper from "@/app/components/CommentsWrapper/CommentsWrapper";

export default function PostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = usePostFormValidation();

  // fetch post
  useEffect(() => {
    async function loadPost() {
      if (typeof id === "string") {
        const data = await getPostById(id);
        if (data) {
          setPost(data);
          reset({
            title: data.title,
            description: data.description,
            content: data.content,
          });
        }
      }
    }

    loadPost();
  }, [id, reset]);

  // save editing
  const onSubmit = async (data: {
    title: string;
    description: string;
    content: string;
  }) => {
    if (typeof id !== "string") return;
    await updatePost(id, data);
    setPost((prev) => prev && { ...prev, ...data });
    setIsEditing(false);
  };

  // cancel editing
  const handleCancel = () => {
    if (post) {
      reset({
        title: post.title,
        description: post.description,
        content: post.content,
      });
    }
    setIsEditing(false);
  };

  // delete post
  const handleDelete = async () => {
    if (typeof id !== "string") return;
    await deletePost(id);
    router.push("/");
  };

  if (!post) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Post not found
        </Typography>
        <Typography>The post you are looking for does not exist.</Typography>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      maxWidth="md"
      sx={{ m: "0 auto", mt: 4, px: 2, py: 4 }}
    >
      <SectionHeader
        title={<Typography variant="h3">{post.title}</Typography>}
      />

      {isEditing ? (
        <>
          <TextField
            label="Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Content"
            {...register("content")}
            error={!!errors.content}
            helperText={errors.content?.message}
            fullWidth
            multiline
            rows={6}
          />

          <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>

          <Typography
            variant="subtitle1"
            sx={{ mt: 2, mb: 1, fontStyle: "italic", color: "gray" }}
          >
            {post.description}
          </Typography>

          <Typography variant="body1">{post.content}</Typography>
        </>
      )}

      <Typography
        variant="body2"
        sx={{ mt: 4, textAlign: "right", color: "#666" }}
      >
        {new Date(post.createdAt).toLocaleString("uk-UA", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </Typography>
      {!isEditing && <CommentsWrapper postId={post.id} />}
    </Box>
  );
}
