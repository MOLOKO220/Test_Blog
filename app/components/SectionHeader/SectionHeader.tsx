"use client";

import React, { ReactNode, isValidElement } from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

type SectionHeaderProps = {
  title: string | ReactNode;
};

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <Box
      component="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid #ccc"
      py={1}
    >
      {typeof title === "string" ? (
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
      ) : (
        isValidElement(title) && title
      )}

      <Button variant="outlined" component={Link} href="/">
        ← Back to Main
      </Button>
    </Box>
  );
}
