import { useState } from "react";
import classes from "./App.module.css";
import {
  inputs as loginInputs,
  validationRooles as loginValidationRooles,
} from "./constants/loginFormScheme";

import LoginForm from "./components/Form";

function App() {
  return (
    <LoginForm inputs={loginInputs} validationRooles={loginValidationRooles} />
  );
}

export default App;
