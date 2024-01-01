import validator from "validator";

export function validateUserEmail(email) {
  return validator.isEmail(email);
}

export function validateUserPassword(password) {
  return password.length >= 6;
}
