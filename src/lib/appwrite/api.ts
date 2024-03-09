import { ID, Query } from "appwrite";
import { InewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";

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
      name: user.name,
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
  name: string;
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

// sign in
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const sessionUser = await account.createEmailSession(
      user.email,
      user.password
    );
    return sessionUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}
