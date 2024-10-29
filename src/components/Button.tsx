import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  return (
    <>
      <button className="flex justify-center py-3 px-6 bg-lpPrimaryBg rounded-md text-white">
        {props.children}
      </button>
    </>
  );
};

export default Button;
