"use client";

// UI components
import Title from "@/app/components/UI/Title";
import CardLink from "@/app/components/UI/CardLink";
import TextSecondary from "@/app/components/UI/TextSecondary";
import TextMeta from "@/app/components/UI/TextMeta";

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
    <CardLink href={`/pages/post/${id}`}>
      <div>
        <Title as="h6" fontSize="1.5rem">
          {title}
        </Title>
        <TextSecondary>{description}</TextSecondary>
      </div>
      <TextMeta>{new Date(createdAt).toLocaleDateString()}</TextMeta>
    </CardLink>
  );
}
