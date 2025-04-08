import React from "react";
import { useFieldArray } from "react-hook-form";
import DynamicField from "./DynamicField";

const RepeatableField = ({ field, control, register, errors }) => {
  const { name, fields: subFields, label } = field;

  const { fields: items, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2">{label}</label>

      {items.map((item, idx) => (
        <div key={item.id} className="mb-4 border p-4 rounded bg-50">
          {subFields.map((subField) => (
            <DynamicField
              key={subField.name}
              field={{
                ...subField,
                name: `${name}[${idx}].${subField.name}`,
              }}
              register={register}
              errors={errors?.[name]?.[idx] || {}}
            />
          ))}
          <button
            type="button"
            onClick={() => remove(idx)}
            className="text-600 underline text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({})}
        className="bg-green-600  px-3 py-1 mt-2 rounded"
      >
        + Add {label}
      </button>
    </div>
  );
};

export default RepeatableField;

