const handleErrors = (err) => {
  let errors = { slug: "" };

  // duplicate tags error
  if (err.code === 11000) {
    errors.name = "that post name already";
    errors.slug = "that post slug already";
    return errors;
  }

  // validation errors
  if (err.message.includes("Posts validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

export default handleErrors;
