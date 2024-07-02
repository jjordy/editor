import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import BlockPanel from "../../components/block-panel";
import GridItem from "./grid-item";
const icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
</svg>`;
export default class Grid {
    data = {
        key: "",
        type: "text",
        label: "",
        defaultValue: "",
        description: "",
    };
    nodes = { holder: null };
    readOnly = false;
    api = null;
    config = null;
    constructor({ data, api, readOnly, config, }) {
        this.api = api;
        this.readOnly = readOnly;
        this.data = data;
        this.config = config;
    }
    static get toolbox() {
        return {
            title: "Grid",
            icon,
        };
    }
    save() {
        return this.data;
    }
    render() {
        const rootNode = document.createElement("div");
        const root = createRoot(rootNode);
        this.nodes.holder = rootNode;
        const onDataChange = (newData) => {
            this.data = {
                ...this.data,
                ...newData,
            };
        };
        root.render(_jsx(GridBlock, { onDataChange: onDataChange, readOnly: this.readOnly, data: this.data }));
        return this.nodes.holder;
    }
}
function GridBlock({ data, onDataChange, readOnly, }) {
    const [tab, setTab] = useState("general");
    const [gridState, setGridState] = useState({
        columns: 2,
        gap: 8,
        gridContents: {},
        ...data,
    });
    const handleColumnChange = (columns) => {
        setGridState((prevState) => ({
            ...prevState,
            columns: Number(columns),
        }));
        onDataChange({ columns: Number(columns) });
    };
    const handleGapChange = (gap) => {
        setGridState((prevState) => ({ ...prevState, gap: Number(gap) }));
        onDataChange({ gap: Number(gap) });
    };
    const handleContentsChange = ({ column, content }) => {
        setGridState((prevState) => {
            onDataChange({
                gridContents: {
                    ...prevState.gridContents,
                    [column]: { ...prevState.gridContents[column], content },
                },
            });
            return {
                ...prevState,
                gridContents: {
                    ...prevState.gridContents,
                    [column]: {
                        ...prevState.gridContents[column],
                        content,
                    },
                },
            };
        });
    };
    const handleColumnWidthChange = ({ column, className }) => {
        setGridState((prevState) => {
            onDataChange({
                gridContents: {
                    ...prevState.gridContents,
                    [column]: {
                        ...prevState.gridContents[column],
                        className,
                    },
                },
            });
            return {
                ...prevState,
                gridContents: {
                    ...prevState.gridContents,
                    [column]: {
                        ...prevState.gridContents[column],
                        className,
                    },
                },
            };
        });
    };
    return (_jsx(BlockPanel, { data: data, type: "grid", content: _jsx(GridItem, { ...gridState, onContentsChange: handleContentsChange, onColumnWidthChange: handleColumnWidthChange }), children: _jsxs("div", { className: "block-config--card", children: [_jsx("div", { className: "block-config--header-container", children: _jsx("button", { onClick: () => setTab("general"), className: clsx("px-3 py-0.5" &&
                            tab === "general" &&
                            "border-b-2 border-b-sky-500"), children: "General" }) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "question-field-group col-span-2", children: [_jsx("label", { htmlFor: "id_columns", className: "question-label w-full min-w-[150px]", children: "Columns" }), _jsxs("select", { id: "id_columns", name: "columns", className: "question-input", value: gridState.columns?.toString(), onChange: (evt) => handleColumnChange(evt.target.value), children: [_jsx("option", { value: "1", children: "1" }), _jsx("option", { value: "2", children: "2" }), _jsx("option", { value: "3", children: "3" }), _jsx("option", { value: "4", children: "4" }), _jsx("option", { value: "5", children: "5" }), _jsx("option", { value: "6", children: "6" })] })] }), _jsxs("div", { className: "question-field-group col-span-2", children: [_jsx("label", { htmlFor: "id_gap", className: "question-label w-full min-w-[150px]", children: "Gap" }), _jsxs("select", { id: "id_gap", name: "gap", className: "question-input", value: gridState.gap, onChange: (evt) => handleGapChange(evt.target.value), children: [_jsx("option", { value: "2", children: "2" }), _jsx("option", { value: "3", children: "3" }), _jsx("option", { value: "4", children: "4" }), _jsx("option", { value: "8", children: "8" }), _jsx("option", { value: "16", children: "16" })] })] })] })] }) }));
}
