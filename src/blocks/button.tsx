import clsx from "clsx";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import BlockPanel from "../components/block-panel";
import { useForm } from "react-hook-form";

const icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
</svg>`;

export default class Button {
  data: any = {
    key: "",
    type: "text",
    label: "",
    defaultValue: "",
    description: "",
  };
  nodes: { holder: any } = { holder: null };
  readOnly = false;
  api = null;

  constructor({
    data,
    api,
    readOnly,
  }: {
    data: any;
    api: any;
    readOnly: boolean;
  }) {
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
    const onDataChange = (newData: any) => {
      this.data = {
        ...this.data,
        ...newData,
      };
    };
    root.render(
      <ButtonBlock
        onDataChange={onDataChange}
        readOnly={this.readOnly}
        data={this.data}
      />,
    );
    return this.nodes.holder;
  }
  // renderSettings() {
  //   return [
  //     {
  //       icon: "",
  //       label: "Add Targeting Rule",
  //       onActivate: () => {
  //         this.wrapper.innerHTML = targetingPanel({ data: this.data });
  //         htmx.process(this.wrapper);
  //       },
  //     },
  //   ];
  // }
}

function ButtonBlock({
  data,
  onDataChange,
}: {
  data: any;
  onDataChange: any;
  readOnly: boolean;
}) {
  const { register, handleSubmit, watch } = useForm({ defaultValues: data });
  const [tab, setTab] = useState("general");

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onDataChange)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);
  return (
    <BlockPanel data={data} type="button">
      <div className="block-config--card">
        <div className="block-config--header-container">
          <button
            onClick={() => setTab("general")}
            className={clsx(
              "px-3 py-0.5" &&
                tab === "general" &&
                "border-b-2 border-b-sky-500",
            )}
          >
            General
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="question-field-group">
            <label htmlFor="id_type" className="question-label">
              Type
            </label>
            <select {...register("type")} className="question-input">
              <option value="boolean">Submission</option>
              <option value="text">Link</option>
            </select>
          </div>
          <div className="question-field-group">
            <label htmlFor="id_text" className="question-label">
              Text
            </label>
            <input
              {...register("text")}
              className="question-input bg-gray-200"
              placeholder="Text"
            />
          </div>
          <div className="question-field-group">
            <label htmlFor="id_url" className="question-label">
              URL
            </label>
            <input
              {...register("url")}
              className="question-input"
              placeholder="Url (For Link)"
            />
          </div>
          <div className="question-field-group">
            <label htmlFor="id_url" className="question-label">
              CSS
            </label>
            <input
              {...register("className")}
              className="question-input"
              placeholder=".my-custom-button-class"
            />
          </div>
        </div>
      </div>
    </BlockPanel>
  );
}
