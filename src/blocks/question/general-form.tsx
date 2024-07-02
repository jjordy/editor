import { useEffect, useState } from "react";
import { set } from "lodash-es";
import Collapsable from "../../components/collapsable";
import { useForm, useFieldArray } from "react-hook-form";

const hasExclusiveOption = (type: string) => {
  switch (type) {
    case "multiple-choice":
      return true;
    case "radio-group":
      return true;
    default:
      return false;
  }
};

export default function GeneralForm({
  onDataChange,
  data,
}: {
  onDataChange: any;
  data: any;
}) {
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

  return (
    <form
      className="grid grid-cols-2 gap-4 w-full"
      onSubmit={handleSubmit(onDataChange)}
    >
      <div className="flex items-center">
        <label htmlFor="id_type" className="question-label">
          Type
        </label>
        <select {...register("type")} className="question-input">
          <option value="boolean">Boolean</option>
          <option value="text">Free Text</option>
          <option value="select">Single Choice Dropdown</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="radio">Radio Group</option>
          <option value="date">Date</option>
        </select>
      </div>
      <div className="question-field-group">
        <label htmlFor="id_key" className="question-label">
          Name
        </label>
        <input
          {...register("key")}
          className="question-input"
          placeholder="Field name"
        />
      </div>
      <div className="question-field-group">
        <label htmlFor="id_label" className="question-label">
          Label
        </label>
        <input {...register("label")} className="question-input bg-gray-200" />
      </div>
      <div className="question-field-group">
        <label htmlFor="id_default_value" className="question-label">
          Default
        </label>
        <input
          {...register("default_value")}
          className="question-input"
          placeholder="Default value"
        />
      </div>
      <div className="question-field-group col-span-2">
        <label
          htmlFor="id_placeholder"
          className="question-label block w-[105px] max-w-full"
        >
          Placeholder
        </label>
        <input
          {...register("placeholder")}
          className="question-input w-full"
          placeholder="Placeholder"
        />
      </div>
      <div className="question-field-group col-span-2">
        <label
          htmlFor="id_description"
          className="question-label w-[105px] max-w-full"
        >
          Description
        </label>
        <textarea
          {...register("description")}
          placeholder="description"
          className="question-input"
        ></textarea>
      </div>
      <div className="col-span-2">
        {(data.type === "select" ||
          data.type === "multiple-choice" ||
          data.type === "radio") && (
          <div>
            <Collapsable
              title={
                <div className="font-bold text-sm inline-flex">
                  Options <span className="chip ml-2">{fields.length}</span>
                </div>
              }
            >
              <div className="sortable">
                {fields.map((field, id) => (
                  <div className="grid grid-cols-3 gap-8 mb-4" key={field.id}>
                    <div className="question-field-group">
                      <label htmlFor="options.label" className="question-label">
                        Label
                      </label>
                      <input
                        className="question-input"
                        type="text"
                        {...register(`options.${id}.label`, { required: true })}
                        placeholder="Add a label"
                      />
                    </div>
                    <div className="question-field-group">
                      <label htmlFor="options.label" className="question-label">
                        Value
                      </label>
                      <input
                        className="question-input"
                        type="text"
                        {...register(`options.${id}.value`)}
                        placeholder="Add a value"
                      />
                    </div>
                    {hasExclusiveOption(data.type) && (
                      <div className="question-field-group">
                        <input
                          className="w-6 h-6 accent-indigo-500 mr-4"
                          type="checkbox"
                          id={`id_${id}_exclusive`}
                          {...register(`options.${id}.exclusive`)}
                        />
                        <label
                          htmlFor={`id_${id}_exclusive`}
                          className="question-label max-w-[150px]"
                        >
                          Exclusive Option
                        </label>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  className="button--info button--sm text-xs"
                  type="button"
                  onClick={() =>
                    append({ label: "", value: "", exclusive: false })
                  }
                >
                  Add Option
                </button>
              </div>
            </Collapsable>
          </div>
        )}
      </div>
    </form>
  );
}
