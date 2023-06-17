import { makeRequest } from "./makeRequest";

export function getPosts() {
  return makeRequest("/posts");
}

export function getPost(id: string | undefined) {
  return makeRequest(`/posts/${id}`);
}
