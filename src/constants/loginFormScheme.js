const inputs = [
  {
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    name: "email",
    type: "email",
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
    match: "email",
  },
  password: {
    sameAs: "confirmPassword",
  },
  confirmPassword: {
    sameAs: "password",
  },
};

export { inputs, validationRooles };
