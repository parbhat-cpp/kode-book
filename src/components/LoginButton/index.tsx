"use client";

import React, { useState } from "react";
import clsx from "clsx";
import CustomDialog from "../CustomDialog";
import { login, signup } from "./actions";

interface LoginButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  btntext?: string;
}

const LoginButton = (props: LoginButtonProps) => {
  const { className, btntext, ...filteredProps } = props;

  const [tab, setTab] = useState<string>("login");

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
            <form>
              {tab === "login" ? (
                <div>
                  <label htmlFor="email">Email:</label>
                  <input id="email" name="email" type="email" required />
                  <label htmlFor="password">Password:</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                  <button formAction={login}>Log in</button>
                </div>
              ) : (
                <div>
                  <button formAction={signup}>Sign up</button>
                </div>
              )}
            </form>
          </>
        }
      />
    </>
  );
};

export default LoginButton;
