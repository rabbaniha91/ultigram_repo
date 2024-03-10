import { Toaster } from "@/components/ui/toaster";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./Auth/AuthLayout";
import SignIn from "./Auth/forms/SignIn";
import SignUp from "./Auth/forms/SignUp";
import RootLayout from "./root/RootLayout";
import {
  AllUsers,
  EditPost,
  Explore,
  Home,
  PostDetaile,
  Profile,
  Saved,
  UpdateProfile,
} from "./root/pages";
import "./App.css";
import CreatePost from "./root/pages/CreatePost";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        {/* private */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/uodate-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetaile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
