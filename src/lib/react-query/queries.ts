import { InewUser } from "@/types";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { createNewAccount, signInAccount, signoutAccount } from "../appwrite/api";

// auth
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: InewUser) => createNewAccount(user),
  });
};

export const useSigninAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};
export const useSignoutAccount = () => {
  return useMutation({
    mutationFn: () =>
      signoutAccount(),
  });
};
