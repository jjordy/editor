import { ContentHandler } from "@flowstream/ui";
import clsx from "clsx";
import { FC, useState } from "react";

const BlockPanel: FC<{
  children: React.ReactNode;
  data: any;
  type: string;
  content?: React.ReactNode;
}> = ({ children, data, type = "question ", content }) => {
  const key = `${type}_block_panel_${data?.key || data?.text?.replace(" ", "")}`;
  const [expand, setExpand] = useState(
    localStorage.getItem(key) === "true" ? true : false,
  );
  return (
    <div className="rounded px-8 py-2">
      <div className="flex items-center">
        {content ?? <ContentHandler content={{ blocks: [{ type, data }] }} />}
        <button
          onClick={() => {
            setExpand(!expand);
            localStorage.setItem(key, expand ? "true" : "false");
          }}
          type="button"
          className="block-config--expand-button"
        >
          {expand ? (
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
          "transition-all ease-in-out duration-250",
          expand ? "h-auto" : "h-0 opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default BlockPanel;
