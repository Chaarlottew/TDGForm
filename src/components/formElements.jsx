import React from "react";

const FormElements = ({
  field,
  value,
  commentValue,
  onChange,
  error,
  photoError,
}) => {
  const handleChange = (e) => {
    const val =
      field.fieldType === "photo" ? e.target.files[0] : e.target.value;
    onChange(field.fieldName, val);
  };

  const inputClassStyle = "input w-full border border-gray-300 rounded p-2";
  // Handle photo upload if requiresPhoto === 1
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    onChange(field.fieldName + "_image", file);
  };
  // Render each individual type of element
  const renderElement = () => {
    switch (field.fieldType) {
      case "text":
        return (
          <input
            type="text"
            className={inputClassStyle}
            value={value}
            onChange={handleChange}
            id={field.title}
            placeholder={field.title}
          />
        );
      case "numberInt":
        return (
          <input
            type="number"
            className={inputClassStyle}
            value={value}
            onChange={handleChange}
            id={field.title}
            placeholder={field.title}
          />
        );
      case "datetime":
        return (
          <input
            type="datetime-local"
            className={inputClassStyle}
            value={value}
            onChange={handleChange}
            id={field.title}
          />
        );
      case "select":
        const options = JSON.parse(field.dropVals || "{}");
        return (
          <select
            className={inputClassStyle}
            value={value}
            onChange={handleChange}
            id={field.title}
          >
            <option value="">-- Select Option --</option>
            {Object.entries(options).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        );
      case "photo":
        return (
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        );
      default:
        return (
          <input
            type="text"
            className="input"
            value={value}
            onChange={handleChange}
            id={field.title}
          />
        );
    }
  };

  return (
    <div className="space-y-1">
      <label htmlFor={field.title} className="block font-medium">
        {field.title}
        {/** Show if inputs / images are required */}
        {(field.inputReq === 1 || field.requiresPhoto === 1) && (
          <span className="text-red-500">*</span>
        )}
      </label>

      {field.helpText && (
        <small className="text-gray-500">{field.helpText}</small>
      )}

      {renderElement()}

      {field.requiresPhoto === 1 && field.fieldType !== "photo" && (
        <div className="pt-2">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="mt-1"
            id="photo"
          />
          {photoError && (
            <p className="text-red-500 text-sm">Error: {photoError}</p>
          )}
        </div>
      )}

      {field.commentField === 1 && (
        <div className="pt-2">
          <input
            type="text"
            placeholder="Comment"
            value={commentValue}
            onChange={(e) => onChange(field.commentFieldName, e.target.value)}
            className={inputClassStyle}
            id="comment"
          />
        </div>
      )}

      {error && <p className="text-red-500 text-sm">Error: {error}</p>}
    </div>
  );
};

export default FormElements;
