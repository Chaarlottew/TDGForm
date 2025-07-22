import "./App.css";
import formSpec from "./data/formSpec.json";
import FormRender from "./components/formRender";
import React from "react";

function App() {
  // render the dynamic form using a form rendered
  // design later just get the scaffold done
  return (
    <div>
      <h1>hello</h1>
      <FormRender formSpec={formSpec} />
    </div>
  );
}

export default App;
