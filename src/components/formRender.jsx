import React from "react";
import FormElement from "./formElements";

function FormRender({ formSpec }) {
  // render each dynamic form
  // - need to include handleChange i.e set the data
  // - handleSubmit - JSON return and alert the user
  // - convert into components otherwise this will be too large

  function handleSubmit() {
    console.log("submitted");
  }
  return (
    //make the formspec an array, creates a formelement for each individual object
    // remove the [0] as this is just testing for each form
    <form>
      <h1>{formSpec[0].formName}</h1>
      {/*} {formSpec.map((field) => (
        <FormElement key={field.fieldid} field={field} />
      ))}
        */}
      <FormElement key={formSpec[0].fieldid} field={formSpec[0]}></FormElement>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}

export default FormRender;
