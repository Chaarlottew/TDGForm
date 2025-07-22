import React, { useState } from "react";

// recieves the prop of a certain object from the JSON
function FormElement({ field }) {
  // json has spec defaultval wrong

  const [value, setValue] = useState(field.defautVal || "");
  // store optional comment
  const [comment, setComment] = useState("");
  // store the uploaded photo
  const [photo, setPhoto] = useState("");

  // need to include the "select" type meaning we need dropdown values

  return (
    <div>
      <label></label>
    </div>
  );
}

export default FormElement;
