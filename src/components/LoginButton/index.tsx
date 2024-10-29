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

import CustomDialog from "../CustomDialog";
import { loginSchema, signupSchema } from "@/schemas/authSchema";
// import { AuthResponse } from "@/types/authTypes";
import { Input } from "../ui/input";
import Button from "../Button";

interface LoginButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  btntext?: string;
}

const LoginButton = (props: LoginButtonProps) => {
  const { className, btntext, ...filteredProps } = props;
  const [tab, setTab] = useState<"Login" | "Signup">("Login");

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

  const changeTab = () => {
    if (tab === "Login") {
      setTab("Signup");
    } else {
      setTab("Login");
    }
  };

  const handleLogin = async (formData: z.infer<typeof loginSchema>) => {
    const validate = loginSchema.safeParse({
      login_email: formData.login_email,
      login_password: formData.login_password,
    });

    if (validate.success) {
      // const email = validate.data.login_email as string;
      // const password = validate.data.login_password as string;

      // const loginResponse: AuthResponse = await login(email, password);

      // if (loginResponse.type === "success") {
      //   toast.success(loginResponse.message);
      // } else {
      //   toast.error(loginResponse.message);
      // }
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
      // const username = signupValidate.data.username as string;
      // const fullname = signupValidate.data.fullname as string;
      // const email = signupValidate.data.signup_email as string;
      // const password = signupValidate.data.signup_password as string;

      // const usernameExists = await supabase.from("profiles").select("username").match({
      //   username: username
      // })

      // if (usernameExists.data?.length) {
      //   toast.error('Username already exists');
      //   return;
      // }

      // const signupResponse: AuthResponse = await signup(email, password, fullname, username);

      // if (signupResponse.type === "success") {
      //   toast.success(signupResponse.message);
      // } else {
      //   toast.error(signupResponse.message);
      // }
    } else {
      toast.error("Please enter valid data");
    }
  };

  return (
    <>
      <CustomDialog
        trigger={
          <div
            className={clsx(
              "py-2 px-7 border-2 border-white bg-lpPrimaryBg text-white rounded-3xl",
              className
            )}
            {...filteredProps}
          >
            <p>{btntext ? btntext : "Login"}</p>
          </div>
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
                    <p className="underline cursor-pointer">Forgot password?</p>
                    <span className="flex">
                      <p>No account?&nbsp;</p>
                      <p
                        className="underline cursor-pointer"
                        onClick={changeTab}
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
                        onClick={changeTab}
                      >
                        Login
                      </p>
                    </span>
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
