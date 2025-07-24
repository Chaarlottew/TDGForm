import React from "react";
import formSpec from "./data/formSpec.json";
import FormRender from "./components/formRender";
import "./index.css";

function App() {
  const handleSubmit = (data) => {
    // Simply submit everything inputted as a JSON output
    console.log("Submitted JSON:", JSON.stringify(data, null, 2));
  };

  return (
    <div>
      {/** Call Form Render */}
      <FormRender formSpec={formSpec} onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
