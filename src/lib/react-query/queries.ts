import { InewUser } from "@/types";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { createNewAccount, signInAccount } from "../appwrite/api";

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