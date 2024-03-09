import { getCurrentUser } from "@/lib/appwrite/api";
import { IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_USER = {
  id: "",
  name: "",
  userName: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  setUser: () => {},
  isAuthenticate: false,
  setIsAuthenticate: () => {},
  checkAuthUser: async () => false as boolean,
};

type Icontext = {
  user: IUser | undefined;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  isAuthenticate: boolean;
  setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<Icontext>(INITIAL_STATE);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          email: currentAccount.email,
          userName: currentAccount.userName,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });

        setIsAuthenticate(true);
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticate,
    setIsAuthenticate,
    checkAuthUser,
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useUserContext = () => useContext(AuthContext);
