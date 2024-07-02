import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useState } from "react";
const Collapsable = ({ children, title, defaultOpen = false }) => {
    const [showCollapsable, setCollapsable] = useState(defaultOpen);
    return (_jsxs("div", { className: "relative", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: "font-bold text-sm", children: title }), _jsx("button", { type: "button", onClick: () => setCollapsable(!showCollapsable), className: "w-full flex items-center justify-end h-6", children: showCollapsable ? (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: _jsx("path", { fillRule: "evenodd", d: "M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z", clipRule: "evenodd" }) })) : (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5", children: _jsx("path", { fillRule: "evenodd", d: "M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z", clipRule: "evenodd" }) })) })] }), _jsx("div", { className: clsx("transition-all ease-in-out duration-150 relative", showCollapsable ? "h-auto" : "h-0 opacity-0 -z-10"), children: children })] }));
};
export default Collapsable;
