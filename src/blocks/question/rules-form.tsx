import { useFieldArray, useForm } from "../../utils";

export default function RulesForm({
  onDataChange,
  data,
}: {
  onDataChange: any;
  data: any;
}) {
  const { register } = useForm({ onDataChange, data });
  const { fields, add, remove } = useFieldArray({ name: "rules", data });
  return (
    <>
      <div className="my-2 text-sm font-bold text-slate-600">
        Show this item
      </div>
      {fields.map((field) => (
        <div className="flex items-center w-full mb-2">
          <div className="w-full max-w-[25px] text-sm font-bold text-slate-400">
            {field + 1} ){" "}
          </div>
          <div className="space-x-4 ml-4">
            <label
              htmlFor="id_left_hand_expression"
              className="question-label font-bold text-slate-500"
            >
              If
            </label>
            <input
              className="rules-form--input max-w-[200px]"
              {...register(`rules[${field}].left_hand_expression`)}
            />
          </div>
          <div className="ml-4 space-x-4">
            <label
              htmlFor="id_type"
              className="question-label font-bold text-slate-500"
            >
              Is
            </label>
            <select
              className="rules-form--input"
              {...register(`rules[${field}].operator`)}
            >
              <option value="IS_EQUAL">Equal to</option>
              <option value="CONTAINS">Contains</option>
              <option value="GREATER_THAN">Greater than</option>
              <option value="LESS_THAN">Less than</option>
            </select>
          </div>
          <div className="ml-4 space-x-4">
            <label
              htmlFor={`id_rules[${field}].right_hand_expression`}
              className="question-label"
            ></label>
            <input
              className="rules-form--input max-w-[200px]"
              {...register(`rules[${field}].right_hand_expression`)}
            />
          </div>
          <div className="space-x-4 ml-4">
            <label
              htmlFor="id_type"
              className="question-label font-bold text-slate-500 w-full max-w-[250px]"
            >
              Evaluate as
            </label>
            <select
              {...register(`rules[${field}].expression_type`)}
              className="rules-form--input"
            >
              <option value="string">Text</option>
              <option value="integer">Number</option>
              <option value="boolean">Boolean</option>
            </select>
          </div>
          <div className="mr-auto" />
          <button
            type="button"
            onClick={() => remove(field)}
            className="w-6 h-6 flex items-center justify-center bg-red-200 text-red-900 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="rules-form--add-row">
        Add Rule
      </button>
    </>
  );
}
