const handleErrors = (err) => {
  let errors = { name: "" };

  // duplicate tags error
  if (err.code === 11000) {
    errors.name = "that tag name already";
    return errors;
  }

  // validation errors
  if (err.message.includes("Tags validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

export default handleErrors;
