import React from "react";
import { usePost } from "../contexts/PostContext";

export function Post() {
  const { post } = usePost();

  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
    </>
  );
}
