import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import GridEditor from "./grid-editor";
export default function GridItem({ gap, columns, onContentsChange, onColumnWidthChange, gridContents, }) {
    return (_jsx("div", { className: clsx("grid w-full grid-cols-6", gap === 2 && "gap-2", gap === 3 && "gap-3", gap === 4 && "gap-4", gap === 8 && "gap-8", gap === 16 && "gap-16"), children: Array(columns)
            .fill(null)
            .map((_, i) => (_jsxs("div", { className: clsx(!gridContents[i + 1]?.className && columns === 1 && "col-span-6", !gridContents[i + 1]?.className && columns === 2 && "col-span-3", !gridContents[i + 1]?.className && columns === 3 && "col-span-2", (!gridContents[i + 1]?.className && columns === 5) ||
                columns === 5 ||
                (columns === 6 && "col-span-1"), gridContents[i + 1]?.className), children: [_jsx("div", { className: "question-field-group", children: _jsxs("select", { id: "id_column_width", name: "column_width", className: "question-input !rounded-b-none", value: gridContents[i + 1]?.className, onChange: (evt) => onColumnWidthChange({
                            column: i + 1,
                            className: evt.target.value,
                        }), children: [_jsx("option", { value: "col-span-1", children: "1/6" }), _jsx("option", { value: "col-span-2", children: "2/6" }), _jsx("option", { value: "col-span-3", children: "3/6" }), _jsx("option", { value: "col-span-4", children: "4/6" }), _jsx("option", { value: "col-span-5", children: "5/6" }), _jsx("option", { value: "col-span-6", children: "Full" })] }) }), _jsx("div", { className: clsx("w-full border-b border-l border-r border-slate-300 rounded-b p-1"), children: _jsx(GridEditor, { data: gridContents[i + 1]?.content ?? { blocks: [] }, onChange: (v) => onContentsChange({ column: i + 1, content: v }) }) })] }, `grid_item_${i}`))) }));
}
