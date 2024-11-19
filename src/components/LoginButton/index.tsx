import React, { useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";

import CustomDialog from "../CustomDialog";
import {
  forgotPasswordSchema,
  loginSchema,
  signupSchema,
} from "@/schemas/authSchema";
import { Input } from "../ui/input";
import Button from "../Button";
import { supabase } from "@/supabaseClient";
import { useAtom } from "jotai/react";
import { KodeBookUser, userAtom } from "@/store/authStore";
import { getProfile } from "@/api/users";
import { ApiResponse } from "@/types/apiResponse";

interface LoginButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  btntext?: string;
}

const LoginButton = (props: LoginButtonProps) => {
  const [, setUser] = useAtom<KodeBookUser | null>(userAtom);

  const { className, btntext, ...filteredProps } = props;
  const [tab, setTab] = useState<"Login" | "Signup" | "Forgot Password">(
    "Login"
  );

  const navigate = useNavigate();

  const getUserData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const profileData: ApiResponse = await getProfile(session?.user.user_metadata.username as string);

    if (profileData.data) {
      const userData: KodeBookUser = profileData.data[0] as unknown as KodeBookUser;

      setUser({
        full_name: userData['full_name'] as string,
        avatar_url: userData["avatar_url"] as string,
        id: userData["id"] as string,
        updated_at: userData["updated_at"] as Date,
        username: userData["username"] as string,
        works_at: userData["works_at"] as string,
        location: userData["location"] as string,
        followers: userData["followers"] as number,
        following: userData['following'] as number,
      });
    }
  };

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login_email: "",
      login_password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullname: "",
      username: "",
      signup_email: "",
      signup_password: "",
    },
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const changeTab = (tab: "Login" | "Signup" | "Forgot Password") => {
    setTab(tab);
  };

  const handleLogin = async (formData: z.infer<typeof loginSchema>) => {
    const validate = loginSchema.safeParse({
      login_email: formData.login_email,
      login_password: formData.login_password,
    });

    if (validate.success) {
      const email = validate.data.login_email as string;
      const password = validate.data.login_password as string;

      const loginResponse = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (loginResponse.error?.message) {
        toast.error(loginResponse.error.message);
      } else {
        toast.success("Log in successful");
        getUserData();
        navigate("/dashboard");
      }
    } else {
      toast.error("Please enter valid data");
    }
  };

  const handleSignup = async (formData: z.infer<typeof signupSchema>) => {
    const signupValidate = signupSchema.safeParse({
      username: formData.username,
      fullname: formData.fullname,
      signup_email: formData.signup_email.toString(),
      signup_password: formData.signup_password.toString(),
    });

    if (signupValidate.success) {
      const username = signupValidate.data.username as string;
      const fullname = signupValidate.data.fullname as string;
      const email = signupValidate.data.signup_email as string;
      const password = signupValidate.data.signup_password as string;

      const usernameExists = await supabase
        .from("profiles")
        .select("username")
        .match({
          username: username,
        });

      if (usernameExists.data?.length) {
        toast.error("Username already exists");
        return;
      }

      const signupResponse = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            full_name: fullname,
          },
        },
      });

      if (signupResponse.error?.message) {
        toast.error(signupResponse.error.message);
      } else {
        toast.success("Account created successfully");
        getUserData();
        navigate("/dashboard");
      }
    } else {
      toast.error("Please enter valid data");
    }
  };

  const handleForgotPassword = async (
    formData: z.infer<typeof forgotPasswordSchema>
  ) => {
    const forgotPasswordValidate = forgotPasswordSchema.safeParse({
      email: formData.email,
    });

    if (forgotPasswordValidate.success) {
      const email = forgotPasswordValidate.data.email as string;

      const forgotPasswordResponse = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${import.meta.env.VITE_BASE_URL}/update-password`,
        }
      );

      if (forgotPasswordResponse.error?.message) {
        toast.error(forgotPasswordResponse.error.message);
      } else {
        toast.success("Please check your registered email to reset password");
      }
    } else {
      toast.error(forgotPasswordValidate.error.message);
    }
  };

  return (
    <>
      <CustomDialog
        trigger={
          <>
            <div
              className={clsx(
                "py-2 px-7 border-2 border-white bg-lpPrimaryBg text-white rounded-3xl sm:block hidden",
                className
              )}
              {...filteredProps}
            >
              <p>{btntext ? btntext : "Login"}</p>
            </div>
            <div className="sm:hidden block">
              <p>Login</p>
            </div>
          </>
        }
        withHeader
        heading={tab}
        content={
          <>
            {/* Login form */}
            <div className={`${tab === "Login" ? "block" : "hidden"}`}>
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(handleLogin)}
                  className="flex flex-col space-y-5"
                >
                  <FormField
                    control={loginForm.control}
                    name="login_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="login_email"
                            placeholder="Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="login_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="login_password"
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Login</Button>
                  <div className="flex flex-col items-center">
                    <p
                      className="underline cursor-pointer"
                      onClick={() => changeTab("Forgot Password")}
                    >
                      Forgot password?
                    </p>
                    <span className="flex">
                      <p>No account?&nbsp;</p>
                      <p
                        className="underline cursor-pointer"
                        onClick={() => changeTab("Signup")}
                      >
                        Create one
                      </p>
                    </span>
                  </div>
                </form>
              </Form>
            </div>
            {/* Sign up form */}
            <div className={`${tab === "Signup" ? "block" : "hidden"}`}>
              <Form {...signupForm}>
                <form
                  onSubmit={signupForm.handleSubmit(handleSignup)}
                  className="flex flex-col space-y-5"
                >
                  <FormField
                    control={signupForm.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="fullname"
                            placeholder="Full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="username"
                            placeholder="Username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="signup_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="signup_email"
                            placeholder="Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="signup_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="signup_password"
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Sign up</Button>
                  <div className="flex flex-col items-center">
                    <span className="flex">
                      <p>Already have an account?&nbsp;</p>
                      <p
                        className="underline cursor-pointer"
                        onClick={() => changeTab("Login")}
                      >
                        Login
                      </p>
                    </span>
                  </div>
                </form>
              </Form>
            </div>
            {/* Forgot Password */}
            <div
              className={`${tab === "Forgot Password" ? "block" : "hidden"}`}
            >
              <Form {...forgotPasswordForm}>
                <form
                  onSubmit={forgotPasswordForm.handleSubmit(
                    handleForgotPassword
                  )}
                  className="flex flex-col space-y-5"
                >
                  <FormField
                    control={forgotPasswordForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input id="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Forgot Password</Button>
                  <div className="flex flex-col items-center">
                    <p
                      className="underline cursor-pointer"
                      onClick={() => changeTab("Login")}
                    >
                      Back to login
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </>
        }
      />
    </>
  );
};

export default LoginButton;
