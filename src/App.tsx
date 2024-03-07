import { Route, Routes } from "react-router-dom";
import AuthLayout from "./Auth/AuthLayout";
import SignIn from "./Auth/forms/SignIn";
import SignUp from "./Auth/forms/SignUp";
import "./App.css"

const App = () => {
  return (
    <Routes>
      {/* public */}
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;
