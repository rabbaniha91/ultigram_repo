import { ID } from "appwrite";
import { InewUser } from "@/types";
import { account } from "./config";

export const createNewAccount = async (user: InewUser) => {
  try {
    const newUser = await account.create(
      ID.unique(),
      user.userName,
      user.email,
      user.password
    );

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};
