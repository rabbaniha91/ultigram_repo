import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";
import { signUpValidateSchema } from "../../lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import {
  useCreateUserAccount,
  useSigninAccount,
} from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { toast } = useToast();
  const [showToast, setShowToast] = useState(false);

  // queries
  const { mutateAsync: createNewAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAcount, isPending: isSigningIn } =
    useSigninAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signUpValidateSchema>>({
    resolver: zodResolver(signUpValidateSchema),
    defaultValues: {
      name: "",
      userName: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signUpValidateSchema>) {
    const newUser = await createNewAccount(values);

    if (!newUser) setShowToast(true);

    const session = await signInAcount({
      email: values.email,
      password: values.password,
    });

    if (!session) setShowToast(true);

    const isLogin = await checkAuthUser();

    if (isLogin) {
      form.reset();
      navigate("/");
    } else {
      setShowToast(true);
      return;
    }
  }
  return (
    <>
      {showToast && (
        <Button
          variant="outline"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Error in singup",
              description: "There was a problem with your request.",
              action: (
                <ToastAction
                  onClick={() => setShowToast(false)}
                  altText="Try again"
                >
                  Try again
                </ToastAction>
              ),
            });
          }}
        >
          Show Toast
        </Button>
      )}
      <Form {...form}>
        <div className="sm:w-420 flex-col flex-center">
          <h2 className="h3-bold md:h2-bold pt-5 md:pt-12">
            Create a new account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            to use Ultigram enter your details
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name ..."
                      {...field}
                      className="shad-input"
                      type="text"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="User Name ..."
                      {...field}
                      className="shad-input"
                      type="text"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address ..."
                      {...field}
                      className="shad-input"
                      type="email"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password ..."
                      {...field}
                      className="shad-input"
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="shad-button_primary">
              {isCreatingAccount ? (
                <>
                  <Loader />
                </>
              ) : (
                <>Signup</>
              )}
            </Button>
            <p className="text-small-regular text-light-2 text-center mt-2">
              Already have an account?
              <Link
                to={"/sign-in"}
                className="text-primary-500 text-small-semibold ml-1"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default SignUp;
