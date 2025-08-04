"use client";

import { useState, useEffect } from "react";
import { getPostById, updatePost, deletePost } from "@/app/lib/postApi";
import { useParams, useRouter } from "next/navigation";

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
import Button1 from "@/app/components/UI/Button";
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
        <TextSecondary color="black">
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

          <FlexBox justify="flex-end" margin="16px 0 0 0">
            <Button1 onClick={handleCancel} $bg="#c7c7c7ff" $color="#1976d2">
              Cancel
            </Button1>
            <Button1 onClick={handleSubmit(onSubmit)}>Save</Button1>
          </FlexBox>
        </>
      ) : (
        <>
          <FlexBox justify="flex-end" gap="8px">
            <Button1
              onClick={() => setIsEditing(true)}
              $bg="#adb1b4ff"
              $color="#1976d2"
            >
              Edit
            </Button1>
            <Button1
              $color="#d62c2cff"
              $border="1px solid #d62c2cff"
              $bg="#c7c7c7ff"
              onClick={handleDelete}
            >
              Delete
            </Button1>
          </FlexBox>

          <TextSecondary color="#666666ff" fontStyle="italic">
            {post.description}
          </TextSecondary>
          <TextSecondary color="#3c3c3cff">{post.content}</TextSecondary>
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
