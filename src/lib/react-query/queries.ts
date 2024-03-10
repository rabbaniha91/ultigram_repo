import { INewPost, InewUser } from "@/types";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createNewAccount,
  createPost,
  signInAccount,
  signoutAccount,
} from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";

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
    mutationFn: () => signoutAccount(),
  });
};

// create post

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POST],
      });
    },
  });
};
