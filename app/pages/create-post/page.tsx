"use client";

import { createPost } from "@/app/store/postsSlice";
import { useRouter } from "next/navigation";
// Redux
import { useAppDispatch } from "@/app/store/hooks";

import { usePostFormValidation } from "@/app/hooks/usePostFormValidation/usePostFormValidation";

import SectionHeader from "@/app/components/SectionHeader/SectionHeader";

// UI components
import Button from "@/app/components/UI/Button/Button";
import FormField from "@/app/components/UI/FormField";
import Form from "@/app/components/UI/Form";
import StyledContainer from "@/app/components/UI/StyledContainer";
import FlexBox from "@/app/components/UI/FlexBox";

export default function CreatePostPage() {
  // Redux
  const dispatch = useAppDispatch();
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
    <StyledContainer>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <SectionHeader title="Create Post" />
        <FormField label="Title" {...register("title")} error={errors.title} />
        <FormField
          label="Description"
          {...register("description")}
          error={errors.description}
        />
        <FormField
          label="Content"
          {...register("content")}
          multiline
          rows={6}
          error={errors.content}
        />
        <FlexBox justify="flex-end" margin="16px 0 0 0">
          <Button type="submit">Create</Button>
        </FlexBox>
      </Form>
    </StyledContainer>
  );
}
