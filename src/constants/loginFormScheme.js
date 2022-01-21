import {
  requireValidator,
  usernameLengthValidator,
  emailValidator,
} from '../utils/Validators';

const fields = {
  name: {
    name: "name",
    type: "text",
    placeholder: "Name",
    value: '',
    validators: [
      requireValidator,
      usernameLengthValidator
    ]
  },
  email: {
    name: "email",
    type: "text",
    placeholder: "Email",
    value: '',
    validators: [
      emailValidator
    ]
  },
  password: {
    name: "password",
    type: "password",
    placeholder: "Password",
    value: '',
  },
  confirmPassword: {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    value: '',
  },
};

export default fields;
