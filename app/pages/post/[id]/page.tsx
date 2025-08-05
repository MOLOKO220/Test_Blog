"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPostById, updatePost, deletePost } from "@/app/lib/postApi";

import { Post } from "@/app/types/post";
import { usePostFormValidation } from "@/app/hooks/usePostFormValidation/usePostFormValidation";

import SectionHeader from "@/app/components/SectionHeader/SectionHeader";
import CommentsWrapper from "@/app/components/CommentsWrapper/CommentsWrapper";

// UI components
import FlexBox from "@/app/components/UI/FlexBox";
import TextSecondary from "@/app/components/UI/TextSecondary";
import StyledContainer from "@/app/components/UI/StyledContainer";
import Title from "@/app/components/UI/Title";
import FormField from "@/app/components/UI/FormField";
import Button from "@/app/components/UI/Button/Button";
import TextMeta from "@/app/components/UI/TextMeta";

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
      <FlexBox
        justify="center"
        align="center"
        direction="column"
        height="100vh"
      >
        <TextSecondary>
          Post not found <br />
          The post you are looking for does not exist.
        </TextSecondary>
      </FlexBox>
    );
  }

  return (
    <StyledContainer as="section">
      <SectionHeader title={<Title>{post.title}</Title>} />
      {isEditing ? (
        <>
          <FormField
            label="Title"
            {...register("title")}
            error={errors.title}
          />
          <FormField
            label="Description"
            {...register("description")}
            error={errors.description}
          />
          <FormField
            label="Content"
            {...register("content")}
            multiline
            rows={10}
            error={errors.content}
          />

          <FlexBox justify="flex-end" margin="16px 0 0 0" gap="16px">
            <Button onClick={handleCancel} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)} variant="primary">
              Save
            </Button>
          </FlexBox>
        </>
      ) : (
        <>
          <FlexBox justify="flex-end" gap="18px">
            <Button variant="edit" onClick={() => setIsEditing(true)}>
              Edit
            </Button>

            <Button variant="delete" onClick={handleDelete}>
              Delete
            </Button>
          </FlexBox>

          <TextSecondary fontStyle="italic">{post.description}</TextSecondary>
          <TextSecondary>{post.content}</TextSecondary>
        </>
      )}

      <FlexBox justify="flex-end" margin="16px 0 0 0">
        <TextMeta>
          {new Date(post.createdAt).toLocaleString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </TextMeta>
      </FlexBox>
      {!isEditing && <CommentsWrapper postId={post.id} />}
    </StyledContainer>
  );
}
