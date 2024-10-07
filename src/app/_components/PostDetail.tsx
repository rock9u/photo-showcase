import React from "react";

export type postDetailProps = {
  children?: React.ReactNode;
  post?: {
    id: number;
    name?: string;
  };
};

export function PostDetail({ post, children }: postDetailProps): JSX.Element {
  return (
    <>
      <p className="truncate">Post: {post?.name}</p>
      {children}
    </>
  );
}
