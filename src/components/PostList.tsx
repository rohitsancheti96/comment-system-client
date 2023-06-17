import React, { useEffect, useState } from "react";
import { getPosts } from "../services/post";
import { Link } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";

function PostList() {
  const {
    loading,
    error,
    value: posts,
  }: { loading: boolean; error: any; value: any } = useAsync(getPosts);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>{error}</h1>;

  if (posts)
    return posts.map((post: any) => {
      return (
        <h1 key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h1>
      );
    });
}

export default PostList;
