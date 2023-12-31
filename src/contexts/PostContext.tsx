//@ts-nocheck
import React, { createContext, useContext, useMemo } from "react";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../services/post";
import { useParams } from "react-router-dom";

const Context = createContext();

export function usePost() {
  return useContext(Context);
}

export function PostProvider({ children }: { children: any }) {
  const { id } = useParams();
  const { loading, error, value: post } = useAsync(() => getPost(id), [id]);
  console.log({ post });
  const commentsByParentId = useMemo(() => {
    if (post?.comments == null) return [];
    const group = {};
    post.comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [post?.comments]);
  console.log({ commentsByParentId });
  return (
    <Context.Provider
      value={{
        post: { id, ...post },
      }}
    >
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  );
}
