import * as Yup from "yup";

export const generateYupSchema = (step) => {
  const shape = {};

  step.fields.forEach((field) => {
    if (field.type === "repeatable") {
      const innerShape = {};
      field.fields.forEach((innerField) => {
        let validator = Yup.mixed();
        if (innerField.required) {
          validator = Yup.string().required(`${innerField.label} is required`);
        }
        innerShape[innerField.name] = validator;
      });

      shape[field.name] = Yup.array().of(Yup.object().shape(innerShape));
    } else {
      let validator;
      switch (field.type) {
        case "text":
        case "radio":
        case "select":
          validator = field.required ? Yup.string().required(`${field.label} is required`) : Yup.string();
          break;
        case "number":
          validator = field.required ? Yup.number().required(`${field.label} is required`) : Yup.number();
          break;
        case "checkbox":
          validator = Yup.boolean();
          break;
        default:
          validator = Yup.mixed();
      }
      shape[field.name] = validator;
    }
  });

  return Yup.object().shape(shape);
};

