import React, { InputHTMLAttributes } from "react";
import { Input } from "./ui/input";
import clsx from "clsx";

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const InputWithIcon = (props: InputWithIconProps) => {
  const { className, icon, ...filteredProps } = props;

  return (
    <div
      className={clsx(
        "flex items-center bg-appTertiaryBg rounded-lg [&>div]:w-full",
        className
      )}
    >
      <span className="ml-3">{icon}</span>
      <Input className="border-none focus-visible:right-0 focus-visible:ring-transparent" {...filteredProps} />
    </div>
  );
};

export default InputWithIcon;
