"use client";

import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import PostList from "./components/PostList/PostList";

export default function HomePage() {
  return (
    <main>
      <Container
        maxWidth="md"
        sx={{
          border: "1px solid #888686",
          borderRadius: 2,
          my: 4,
          p: 2,
        }}
      >
        <Box
          component="header"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={1}
        >
          <Typography variant="h4" component="h1">
            Blog Posts
          </Typography>
          <Button
            variant="contained"
            component={Link}
            href="/pages/create-post"
          >
            + Create Post
          </Button>
        </Box>

        <PostList />
      </Container>
    </main>
  );
}
