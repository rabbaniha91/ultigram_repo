import React from "react";

export type InewUser = {
  name: string;
  userName: string;
  email: string;
  password: string;
};

export type IUser = {
  id: string;
  name: string;
  userName: string;
  email: string;
  imageUrl: string;
  bio: string;
};
export type Icontext = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticate: boolean;
  setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};
