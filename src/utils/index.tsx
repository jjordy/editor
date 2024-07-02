import { useState, useCallback } from "react";
import { get, set } from "lodash-es";

export const useForm = ({ onDataChange, data }: any) => {
  const register = useCallback(
    (name: string, opts: any = {}) => {
      return {
        name,
        value: get(data, name),
        id: `id_${name}`,
        onChange: (evt: any) => {
          onDataChange(set(data, name, evt.target.value));
        },
        ...opts,
      };
    },
    [onDataChange, data],
  );
  return { register };
};

export const useFieldArray = ({ name, data }: { name: string; data: any }) => {
  const [fields, setFields] = useState([
    ...Array(get(data, name, []).length).keys(),
  ]);
  const add = () => {
    setFields((f) => [...f, f.length]);
  };
  const remove = (id: number) => {
    const filtered = fields.filter((v) => v !== id);
    setFields(filtered);
  };
  return {
    fields,
    add,
    remove,
  };
};
