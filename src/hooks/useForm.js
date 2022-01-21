import { useState } from 'react';

const useForm = (fieldsConfig) => {
  const [allFields, setAllFields] = useState(fieldsConfig);
  const [showValidation, setShowValidation] = useState(false);

  const onFocus = (name) => {
    let fields = {...allFields};

    fields[name].dirty = true;
    fields[name].focused = true;

    fields = validateFields(fields);
    fields = validateForm(fields);
    // setAllFields( validateFields( validateForm(fields) ) );

    setAllFields(fields);
  }

  const onChange = (name, value) => {
    let fields = {...allFields};

    fields[name].value = value;

    fields = validateFields(fields);
    fields = validateForm(fields);

    setAllFields(fields);
  }

  const onBlur = (name) => {
    let fields = {...allFields};

    fields[name].focused = false;

    fields = validateFields(fields);
    fields = validateForm(fields);

    setAllFields(fields);
  }

  const onSubmit = () => {
    let fields = {...allFields};

    Object.entries(fields).forEach(([name]) => {
      fields[name].dirty = true;
    });

    fields = validateFields(fields);
    fields = validateForm(fields);

    setAllFields(fields);
    setShowValidation(true);

    if (isValid(fields)) {
      console.log('The form was sent');
    }
  }

  const validateForm = (fields) => {
    const { password, confirmPassword } = fields;
    if (isValid({password, confirmPassword})) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.errors.push('Passoword and confirm password must be the equil');
      }
    }

    return fields;
  };

  const validateFields = (fields) => {
    Object.entries(fields).forEach(([_, field]) => {
      const { value, validators = [] } = field;
      field.errors = validators
        .map(validator => {
          return validator(value);
        })
        .filter((error) => {
          return error;
        });
    });

    return fields;
  }

  const isValid = (fields) => {
    return Object.entries(fields).every(([_, field]) => {
      return !field.errors.length;
    });
  }

  return {
    fields: allFields,
    showValidation,
    handlers: {
      onFocus,
      onChange,
      onBlur,
      onSubmit
    }
  }
}

export default useForm;
