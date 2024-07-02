import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Validationsform({ data, onDataChange }) {
    return (_jsx("div", { className: "min-h-72", children: _jsxs("div", { className: "flex items-center", children: [_jsx("label", { className: "question-label", htmlFor: "id_required", children: "Required" }), _jsx("input", { type: "checkbox", name: "required", id: "id_required", checked: data.required, className: "w-4 h-4 ml-4", onChange: (evt) => onDataChange({ required: evt.currentTarget.checked }) })] }) }));
}
