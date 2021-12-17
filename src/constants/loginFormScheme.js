const inputs = [
  {
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    name: "email",
    type: "text",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
  },
];

const validationRooles = {
  name: {
    required: true,
  },
  email: {
    required: true,
    match: "email",
  },
  password: {
    required: true,
    sameAs: "confirmPassword",
  },
  confirmPassword: {
    required: true,
    sameAs: "password",
  },
};

export { inputs, validationRooles };
