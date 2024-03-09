import { Toaster } from "@/components/ui/toaster";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./Auth/AuthLayout";
import SignIn from "./Auth/forms/SignIn";
import SignUp from "./Auth/forms/SignUp";
import RootLayout from "./root/RootLayout";
import { Home } from "./root/pages";
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

        {/* private */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
