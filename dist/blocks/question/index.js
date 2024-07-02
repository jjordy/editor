import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useCallback, useState } from "react";
import GeneralForm from "./general-form";
import Validationsform from "./validations-form";
import BlockPanel from "../../components/block-panel";
import RulesForm from "./rules-form";
import { createRoot } from "react-dom/client";
const icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
      </svg>`;
export default class Question {
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
    constructor({ data, api, readOnly, }) {
        this.api = api;
        this.readOnly = readOnly;
        this.data = data;
    }
    static get toolbox() {
        return {
            title: "Question",
            icon,
        };
    }
    save() {
        return this.data;
    }
    render() {
        const rootNode = document.createElement("div");
        this.nodes.holder = rootNode;
        const root = createRoot(rootNode);
        const onDataChange = (newData) => {
            this.data = {
                ...this.data,
                ...newData,
            };
        };
        root.render(_jsx(QuestionBlock, { onDataChange: onDataChange, data: this.data }));
        return this.nodes.holder;
    }
}
function QuestionBlock({ data, onDataChange, }) {
    const [questionState, setQuestionState] = useState(data);
    const handleDataChange = useCallback((v) => {
        setQuestionState(v);
        onDataChange(v);
    }, [onDataChange]);
    const [tab, setTab] = useState("general");
    return (_jsxs(BlockPanel, { data: questionState, type: "question", children: [_jsx("button", { onClick: () => handleDataChange({}), children: "Test" }), _jsxs("div", { className: "block-config--card", children: [_jsxs("div", { className: "block-config--header-container", children: [_jsx("button", { onClick: () => setTab("general"), className: clsx("px-3 py-0.5" &&
                                    tab === "general" &&
                                    "border-b-2 border-b-sky-500"), children: "General" }), _jsx("button", { className: clsx("px-3 py-0.5" &&
                                    tab === "validations" &&
                                    "border-b-2 border-b-sky-500"), onClick: () => setTab("validations"), children: "Validations" }), _jsx("button", { onClick: () => setTab("rules"), className: clsx("px-3 py-0.5" && tab === "rules" && "border-b-2 border-b-sky-500"), children: "Rules" })] }), tab === "general" && (_jsx(GeneralForm, { onDataChange: handleDataChange, data: questionState })), tab === "validations" && (_jsx(Validationsform, { data: questionState, onDataChange: handleDataChange })), tab === "rules" && (_jsx(RulesForm, { data: questionState, onDataChange: handleDataChange }))] })] }));
}
