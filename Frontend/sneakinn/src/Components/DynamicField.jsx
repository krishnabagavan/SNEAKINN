import React from "react";

const DynamicField = ({ field, register, errors }) => {
  const { name, label, type, options } = field;

  return (
    <div className="mb-4">
      <label className="block mb-1  font-medium">{label}</label>

      {type === "text" || type === "number" ? (
        <input
          type={type}
          {...register(name)}
          className="border p-2 rounded w-full"
        />
      ) : type === "select" ? (
        <select {...register(name)} className="border p-2 rounded w-full">
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : type === "radio" ? (
        options.map((opt) => (
          <label key={opt} className="mr-4">
            <input
              type="radio"
              value={opt}
              {...register(name)}
              className="mr-1"
            />
            {opt}
          </label>
        ))
      ) : type === "checkbox" ? (
        <input type="checkbox" {...register(name)} />
      ) : null}

      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default DynamicField;

