"use client";

import React, { ReactNode, isValidElement } from "react";
import Link from "next/link";

// UI components
import FlexBox from "../UI/FlexBox";
import Button from "../UI/Button/Button";
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
      <Button as={Link} href="/" variant="outlined">
        ← Back to Main
      </Button>
    </FlexBox>
  );
}
