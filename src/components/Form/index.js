import { useState } from "react";

const LoginForm = ({ inputs, validationRooles }) => {
  const [formData, setFormData] = useState(
    inputs.reduce(
      (acc, input) => ({ ...acc, [input.name]: { value: "", valid: true } }),
      {}
    )
  );
  const [showValidation, setShowValidation] = useState(false);

  // |--- Handlers
  const handleInput = (e, name) => {
    const updatedFormData = { ...formData };

    updatedFormData[name].value = e.target.value;

    setShowValidation(false);
    setFormData( validateInput(name, updatedFormData) );
  };

  const handleSubmit = (e) => {
    setShowValidation(true);

    e.preventDefault();
  }

  // |--- Utils
  const validateInput = (name, formData) => {
    const 
      inputData = formData[name],
      inputValidationRooles = validationRooles[name],
      matchers = {
        email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      };

    Object.entries(inputValidationRooles).forEach(([roole, rooleVal]) => {
      switch (roole) {
        case "required":
          if( inputData.value.length ){
            formData[name].valid = true;
          } else {
            formData[name].valid = false;
          }
          break;
        case "match":
          if( matchers.email.test(inputData.value) ){
            formData[name].valid = true;
          } else {
            formData[name].valid = false;
          }
          break;
        case "sameAs":
          if( inputData.value===formData[rooleVal].value ){
            formData[name].valid = true;
          } else {
            formData[name].valid = false;
          }
          break;
        default:
      }
    });

    return formData;
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      {inputs.map(({ name, type, placeholder }) => (
        <input
          key={name}
          value={formData[name].value}
          type={type}
          placeholder={placeholder}
          onInput={(e) => handleInput(e, name)}
          className={(!formData[name].valid && showValidation)? 'm-invalid': ''}
        />
      ))}
      <input type="submit" value="Submit"/>
    </form>
  );
};

export default LoginForm;
