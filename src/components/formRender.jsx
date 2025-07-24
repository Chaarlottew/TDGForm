import React, { useState } from "react";
import FormElements from "./formElements";

const FormRender = ({ formSpec, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  // Decided to include name and ID as viewed in the sample
  const [customFields, setCustomFields] = useState({
    name: "",
    inspectorId: "",
  });

  const handleChange = (fieldName, value) => {
    // Save the data and set any errors
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    setErrors((prev) => ({ ...prev, [fieldName]: null }));
  };

  // Handle any change to the custom name and ID
  const handleCustomChange = (e) => {
    const { name, value } = e.target;
    setCustomFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    // Prevent default as it would refresh the page upon submitting
    e.preventDefault();
    // Include the custom name and id plus the form data in the final JSON submission that will be called
    const completeSubmission = {
      ...customFields,
      ...formData,
    };
    const newErrors = {};
    formSpec.forEach((field) => {
      const value = formData[field.fieldName];
      // Error checking for unfilled inputs
      if (
        field.inputReq === 1 &&
        (value === undefined || value === "" || value === null)
      ) {
        newErrors[field.fieldName] = `${field.title} is required`;
      }
      // Error checking for unfilled images
      if (field.requiresPhoto === 1) {
        const photoKey =
          field.fieldType === "photo"
            ? field.fieldName
            : field.fieldName + "_image";
        if (!formData[photoKey]) {
          newErrors[photoKey] = `${field.title} photo is required`;
        }
      }
    });
    // Show errors if any
    setErrors(newErrors);
    // Else, submit as JSON
    if (Object.keys(newErrors).length === 0) {
      onSubmit(completeSubmission);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-8"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {formSpec[0].formName}
      </h2>

      {/* Custom fields */}
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={customFields.name}
            onChange={handleCustomChange}
            className="w-full border border-gray-300 rounded p-2 "
            placeholder="Name"
          />
        </div>
        <div>
          <label htmlFor="inspectorId" className="block font-medium ">
            Inspector ID
          </label>
          <input
            id="inspectorId"
            type="text"
            name="inspectorId"
            value={customFields.inspectorId}
            onChange={handleCustomChange}
            className="w-full border border-gray-300 rounded p-2 "
            placeholder="Inspector ID"
          />
        </div>
      </div>

      {/* For each JSON object create a formElement */}
      <div className="space-y-6">
        {formSpec
          .filter((field) => field.visible === 1)
          .map((field) => (
            <FormElements
              key={field.fieldid}
              field={field}
              value={formData[field.fieldName] || ""}
              commentValue={formData[field.commentFieldName] || ""}
              onChange={handleChange}
              error={errors[field.fieldName]}
              photoError={
                field.requiresPhoto === 1 && field.fieldType !== "photo"
                  ? errors[field.fieldName + "_image"]
                  : field.fieldType === "photo"
                  ? errors[field.fieldName]
                  : null
              }
            />
          ))}
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold px-8 py-3 rounded-md shadow-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormRender;
