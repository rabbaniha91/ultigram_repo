import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuth = false;
  return (
    <>
      {isAuth ? (
        <>
          <Navigate to="/" />
        </>
      ) : (
        <>
          <section className="flex items-center justify-center flex-1 h-screen overflow-auto p-10">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
