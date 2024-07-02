import { useState, useCallback } from "react";
import { get, set } from "lodash-es";
export const useForm = ({ onDataChange, data }) => {
    const register = useCallback((name, opts = {}) => {
        return {
            name,
            value: get(data, name),
            id: `id_${name}`,
            onChange: (evt) => {
                onDataChange(set(data, name, evt.target.value));
            },
            ...opts,
        };
    }, [onDataChange, data]);
    return { register };
};
export const useFieldArray = ({ name, data }) => {
    const [fields, setFields] = useState([
        ...Array(get(data, name, []).length).keys(),
    ]);
    const add = () => {
        setFields((f) => [...f, f.length]);
    };
    const remove = (id) => {
        const filtered = fields.filter((v) => v !== id);
        setFields(filtered);
    };
    return {
        fields,
        add,
        remove,
    };
};
