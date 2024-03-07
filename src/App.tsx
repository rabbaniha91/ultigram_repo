import { Route, Routes } from "react-router-dom";
import AuthLayout from "./Auth/AuthLayout";
import SignIn from "./Auth/forms/SignIn";
import SignUp from "./Auth/forms/SignUp";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
