import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import BlockPanel from "../components/block-panel";
import { useForm } from "react-hook-form";
const icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
</svg>`;
export default class Button {
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
            title: "Button",
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
        root.render(_jsx(ButtonBlock, { onDataChange: onDataChange, readOnly: this.readOnly, data: this.data }));
        return this.nodes.holder;
    }
}
function ButtonBlock({ data, onDataChange, }) {
    const { register, handleSubmit, watch } = useForm({ defaultValues: data });
    const [tab, setTab] = useState("general");
    useEffect(() => {
        const subscription = watch(() => handleSubmit(onDataChange)());
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);
    return (_jsx(BlockPanel, { data: data, type: "button", children: _jsxs("div", { className: "block-config--card", children: [_jsx("div", { className: "block-config--header-container", children: _jsx("button", { onClick: () => setTab("general"), className: clsx("px-3 py-0.5" &&
                            tab === "general" &&
                            "border-b-2 border-b-sky-500"), children: "General" }) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "question-field-group", children: [_jsx("label", { htmlFor: "id_type", className: "question-label", children: "Type" }), _jsxs("select", { ...register("type"), className: "question-input", children: [_jsx("option", { value: "boolean", children: "Submission" }), _jsx("option", { value: "text", children: "Link" })] })] }), _jsxs("div", { className: "question-field-group", children: [_jsx("label", { htmlFor: "id_text", className: "question-label", children: "Text" }), _jsx("input", { ...register("text"), className: "question-input bg-gray-200", placeholder: "Text" })] }), _jsxs("div", { className: "question-field-group", children: [_jsx("label", { htmlFor: "id_url", className: "question-label", children: "URL" }), _jsx("input", { ...register("url"), className: "question-input", placeholder: "Url (For Link)" })] }), _jsxs("div", { className: "question-field-group", children: [_jsx("label", { htmlFor: "id_url", className: "question-label", children: "CSS" }), _jsx("input", { ...register("className"), className: "question-input", placeholder: ".my-custom-button-class" })] })] })] }) }));
}
