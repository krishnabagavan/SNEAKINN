import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../Schemas/userSchema";
import { generateYupSchema } from "../utils/validationSchema";
import DynamicField from "./DynamicField";
import RepeatableField from "./RepeatableField";
import Review from "./Review";

const StepperForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  // Dynamically create the validation schema for the current step
  const methods = useForm({
    resolver: yupResolver(generateYupSchema(userSchema[step])),
    defaultValues: formData,
    mode: "onTouched",
  });

  const { handleSubmit, control, register, formState } = methods;


  const onSubmit = async (data) => {
    const merged = { ...formData, ...data };
    setFormData(merged);
  
    if (step < userSchema.length - 1) {
      setStep(step + 1);
    } else {
      try {
        console.log("Sending data to backend:", merged);
  
        const response = await fetch("http://localhost:5000/api/formdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(merged)
        });
  
        const result = await response.json();
        console.log("Response from backend:", result);
  
        if (!response.ok) {
          throw new Error(result.error || "Unknown server error");
        }
  
        alert("Submitted successfully!");
      } catch (error) {
        console.error("Submission error:", error);
        alert("Something went wrong during submission.");
      }
    }
  };
  
 
  const onPrevious = () => {
    setStep((prev) => prev - 1);
  };

  const currentStep = userSchema[step];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold">{currentStep.title}</h2>

        {currentStep.fields.map((field) =>
          field.type === "repeatable" ? (
            <RepeatableField
              key={field.name}
              field={field}
              control={control}
              register={register}
              errors={formState.errors}
            />
          ) : (
            <DynamicField
              key={field.name}
              field={field}
              control={control}
              register={register}
              errors={formState.errors}
            />
          )
        )}

        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button
              type="button"
              onClick={onPrevious}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Previous
            </button>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {step === userSchema.length - 1 ? "Submit" : "Next"}
          </button>
        </div>

        {step === userSchema.length - 1 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium">Review Your Data</h3>
            <Review data={formData} />
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default StepperForm;

