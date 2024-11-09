import clsx from "clsx";
import { useNavigate } from "react-router-dom";

interface SidebarButtonProps {
  icon: React.ReactNode;
  text: string;
  redirect?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  collapse: boolean;
}

const SidebarButton = (props: SidebarButtonProps) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (props.redirect) navigate(props.redirect);
  };

  return (
    <button
      className={clsx(
        "relative group flex gap-2 justify-start items-center text-xl hover:bg-btnHoverBg hover:text-appPrimaryBg rounded-md transition-all duration-300",
        props.collapse ? "p-2 text-2xl justify-center" : "px-3 py-2"
      )}
      onClick={props.redirect ? handleRedirect : props.onClick}
    >
      {props.icon}
      {!props.collapse && <p>{props.text}</p>}
      {props.collapse && (
        <span
          className="flex w-max absolute left-full rounded-md px-2 py-1 ml-4 z-15
          bg-btnHoverBg text-appPrimaryBg text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
        >
          {props.text}
        </span>
      )}
    </button>
  );
};

export default SidebarButton;
