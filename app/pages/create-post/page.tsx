"use client";

import { Container, TextField, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { createPost } from "@/app/store/postsSlice";
import { AppDispatch } from "@/app/store/store";
import { useRouter } from "next/navigation";

import { usePostFormValidation } from "@/app/hooks/usePostFormValidation/usePostFormValidation";

import SectionHeader from "@/app/components/SectionHeader/SectionHeader";

export default function CreatePostPage() {
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = usePostFormValidation();

  // create new post
  const onSubmit = async (data: any) => {
    const result = await dispatch(createPost(data));
    if (createPost.fulfilled.match(result)) {
      router.push("/");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        border: "1px solid #888686",
        borderRadius: 2,
        my: 4,
        p: 2,
      }}
    >
      <SectionHeader title="Create Post" />

      <Box
        component="form"
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
        gap={3}
        mt={3}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Title"
          fullWidth
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          label="Description"
          fullWidth
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          label="Content"
          fullWidth
          multiline
          rows={6}
          {...register("content")}
          error={!!errors.content}
          helperText={errors.content?.message}
        />

        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" type="submit">
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
