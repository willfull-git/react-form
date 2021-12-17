import { useState, useEffect } from "react";
import classes from './styles.module.css';
import validationMetchers from '../../constants/validationMatchers';

const LoginForm = ({ inputs, validationRooles }) => {
  const [formData, setFormData] = useState(
    inputs.reduce(
      (acc, input) => ({ ...acc, [input.name]: { value: "", valid: true } }),
      {}
    )
  );
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    validateForm(formData);
  }, []);

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
      inputValidationRooles = validationRooles[name];

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
          if( validationMetchers.email.test(inputData.value) ){
            formData[name].valid = true;
          } else {
            formData[name].valid = false;
          }
          break;
        case "sameAs":
          if( inputData.value===formData[rooleVal].value ){
            formData[name].valid = true;
            formData[ inputValidationRooles.sameAs ].valid = true;
          } else {
            formData[name].valid = false;
            formData[ inputValidationRooles.sameAs ].valid = false;
          }
          break;
        default:
      }
    });

    return formData;
  };

  const validateForm = (formData) => {
    Object.entries(formData).forEach(([key, value]) => {
      validateInput(key, formData);
    });
  }

  return (
    <form
      className={classes.container}
      action=""
      onSubmit={handleSubmit}
    >
      {inputs.map(({ name, type, placeholder }) => (
        <input
          key={name}
          value={formData[name].value}
          type={type}
          placeholder={placeholder}
          onInput={(e) => handleInput(e, name)}
          className={classes.input +' '+ ((!formData[name].valid && showValidation)? classes.invalid: '')}
        />
      ))}
      <input className={classes.button} type="submit" value="Submit"/>
    </form>
  );
};

export default LoginForm;
