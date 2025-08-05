"use client";

import Link from "next/link";

import PostList from "./components/PostList/PostList";

import StyledContainer from "@/app/components/UI/StyledContainer";

// UI Components
import FlexBox from "./components/UI/FlexBox";
import Title from "./components/UI/Title";
import Button from "./components/UI/Button/Button";

export default function HomePage() {
  return (
    <main>
      <StyledContainer>
        <FlexBox as="header" justify="space-between" align="center">
          <Title>Blog Posts</Title>
          <Button as={Link} href="/pages/create-post">
            + Create Post
          </Button>
        </FlexBox>
        <PostList />
      </StyledContainer>
    </main>
  );
}
