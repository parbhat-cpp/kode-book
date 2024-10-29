import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeSlash } from "@phosphor-icons/react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [inputType, setInputType] = React.useState(type);

    const toggleInputType = () => {
      if (inputType === "password") {
        setInputType("text");
      } else {
        setInputType("password");
      }
    };

    return (
      <div className="flex">
        <input
          type={inputType}
          className={cn(
            "flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-md shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
            `${
              type === "password" &&
              "basis-11/12 rounded-tr-none rounded-br-none"
            }`
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <span
            className="basis-1/12 flex justify-center items-center rounded-tr-md rounded-br-md cursor-pointer bg-lpSecondaryBg"
            onClick={toggleInputType}
          >
            {inputType === "password" ? (
              <Eye size={20} />
            ) : (
              <EyeSlash size={20} />
            )}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
