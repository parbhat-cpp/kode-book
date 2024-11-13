import clsx from "clsx";

interface LoaderProps {
  className?: string;
}

const Loader = (props: LoaderProps) => {
  return (
    <svg
      className={clsx("text-gray-300 animate-spin", props.className)}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
    >
      <path
        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
        stroke="currentColor"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="text-lpPrimaryText"
      ></path>
    </svg>
  );
};

export default Loader;
