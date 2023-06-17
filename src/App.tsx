import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Post } from "./components/Post";
import PostList from "./components/PostList";
import { PostProvider } from "./contexts/PostContext";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {}, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route
          path="/posts/:id"
          element={
            <PostProvider>
              <Post />
            </PostProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
