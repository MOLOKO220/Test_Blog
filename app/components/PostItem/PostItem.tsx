"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

interface PostItemProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function PostItem({
  id,
  title,
  description,
  createdAt,
}: PostItemProps) {
  return (
    <Box
      component={Link}
      href={`pages/post/${id}`}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #bcbcbcff",
        borderRadius: 2,
        p: 2,
        mb: 2,
        color: "inherit",
        transition: "0.2s",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <div>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1" color="#8d8d8dff" mt={1}>
          {description}
        </Typography>
      </div>
      <Typography variant="body2" color="text.secondary">
        {new Date(createdAt).toLocaleDateString()}
      </Typography>
    </Box>
  );
}
