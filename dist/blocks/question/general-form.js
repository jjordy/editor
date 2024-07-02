import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import Collapsable from "../../components/collapsable";
import { useForm, useFieldArray } from "react-hook-form";
const hasExclusiveOption = (type) => {
    switch (type) {
        case "multiple-choice":
            return true;
        case "radio-group":
            return true;
        default:
            return false;
    }
};
export default function GeneralForm({ onDataChange, data, }) {
    const { register, handleSubmit, watch, control } = useForm({
        defaultValues: data,
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });
    useEffect(() => {
        const subscription = watch(() => handleSubmit(onDataChange)());
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);
    return (_jsxs("form", { className: "grid grid-cols-2 gap-4 w-full", onSubmit: handleSubmit(onDataChange), children: [_jsxs("div", { className: "flex items-center", children: [_jsx("label", { htmlFor: "id_type", className: "question-label", children: "Type" }), _jsxs("select", { ...register("type"), className: "question-input", children: [_jsx("option", { value: "boolean", children: "Boolean" }), _jsx("option", { value: "text", children: "Free Text" }), _jsx("option", { value: "select", children: "Single Choice Dropdown" }), _jsx("option", { value: "multiple-choice", children: "Multiple Choice" }), _jsx("option", { value: "radio", children: "Radio Group" }), _jsx("option", { value: "date", children: "Date" })] })] }), _jsxs("div", { className: "question-field-group", children: [_jsx("label", { htmlFor: "id_key", className: "question-label", children: "Name" }), _jsx("input", { ...register("key"), className: "question-input", placeholder: "Field name" })] }), _jsxs("div", { className: "question-field-group", children: [_jsx("label", { htmlFor: "id_label", className: "question-label", children: "Label" }), _jsx("input", { ...register("label"), className: "question-input bg-gray-200" })] }), _jsxs("div", { className: "question-field-group", children: [_jsx("label", { htmlFor: "id_default_value", className: "question-label", children: "Default" }), _jsx("input", { ...register("default_value"), className: "question-input", placeholder: "Default value" })] }), _jsxs("div", { className: "question-field-group col-span-2", children: [_jsx("label", { htmlFor: "id_placeholder", className: "question-label block w-[105px] max-w-full", children: "Placeholder" }), _jsx("input", { ...register("placeholder"), className: "question-input w-full", placeholder: "Placeholder" })] }), _jsxs("div", { className: "question-field-group col-span-2", children: [_jsx("label", { htmlFor: "id_description", className: "question-label w-[105px] max-w-full", children: "Description" }), _jsx("textarea", { ...register("description"), placeholder: "description", className: "question-input" })] }), _jsx("div", { className: "col-span-2", children: (data.type === "select" ||
                    data.type === "multiple-choice" ||
                    data.type === "radio") && (_jsx("div", { children: _jsx(Collapsable, { title: _jsxs("div", { className: "font-bold text-sm inline-flex", children: ["Options ", _jsx("span", { className: "chip ml-2", children: fields.length })] }), children: _jsxs("div", { className: "sortable", children: [fields.map((field, id) => (_jsxs("div", { className: "grid grid-cols-3 gap-8 mb-4", children: [_jsxs("div", { className: "question-field-group", children: [_jsx("label", { htmlFor: "options.label", className: "question-label", children: "Label" }), _jsx("input", { className: "question-input", type: "text", ...register(`options.${id}.label`, { required: true }), placeholder: "Add a label" })] }), _jsxs("div", { className: "question-field-group", children: [_jsx("label", { htmlFor: "options.label", className: "question-label", children: "Value" }), _jsx("input", { className: "question-input", type: "text", ...register(`options.${id}.value`), placeholder: "Add a value" })] }), hasExclusiveOption(data.type) && (_jsxs("div", { className: "question-field-group", children: [_jsx("input", { className: "w-6 h-6 accent-indigo-500 mr-4", type: "checkbox", id: `id_${id}_exclusive`, ...register(`options.${id}.exclusive`) }), _jsx("label", { htmlFor: `id_${id}_exclusive`, className: "question-label max-w-[150px]", children: "Exclusive Option" })] }))] }, field.id))), _jsx("button", { className: "button--info button--sm text-xs", type: "button", onClick: () => append({ label: "", value: "", exclusive: false }), children: "Add Option" })] }) }) })) })] }));
}
