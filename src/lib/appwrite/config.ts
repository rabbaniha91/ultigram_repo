import { Client, Databases, Account, Avatars, Storage } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION,
  postCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION,
  saveCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION,
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const databases = new Databases(client);
export const account = new Account(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);
