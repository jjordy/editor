import clsx from "clsx";
import { ReactNode, FC, useState } from "react";

const Collapsable: FC<{
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}> = ({ children, title, defaultOpen = false }) => {
  const [showCollapsable, setCollapsable] = useState(defaultOpen);
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-sm">{title}</div>
        <button
          type="button"
          onClick={() => setCollapsable(!showCollapsable)}
          className="w-full flex items-center justify-end h-6"
        >
          {showCollapsable ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={clsx(
          "transition-all ease-in-out duration-150 relative",
          showCollapsable ? "h-auto" : "h-0 opacity-0 -z-10",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapsable;
