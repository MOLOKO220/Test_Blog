"use client";

import React, { ReactNode, isValidElement } from "react";
import Link from "next/link";

// UI components
import FlexBox from "../UI/FlexBox";
import Button from "../UI/Button";
import Title from "../UI/Title";

type SectionHeaderProps = {
  title: string | ReactNode;
};

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <FlexBox justify="space-between">
      {typeof title === "string" ? (
        <Title>{title}</Title>
      ) : (
        isValidElement(title) && title
      )}

      <Button
        as={Link}
        href="/"
        $bg="#c7c7c7ff"
        $color="#1976d2"
        $border="solid 1px #1976d2"
      >
        ← Back to Main
      </Button>
    </FlexBox>
  );
}
