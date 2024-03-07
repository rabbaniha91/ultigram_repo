import { ID } from "appwrite";
import { InewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import App from "@/App";

// user Authenticate

export const createNewAccount = async (user: InewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.userName
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.userName);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// save new user to db

export async function saveUserToDB(user: {
  accountId: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  imageUrl: URL;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}
