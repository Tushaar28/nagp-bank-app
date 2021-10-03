export default function validate(values) {
  console.log(values);
  let errors = {};

  if (!values.username.trim()) errors["username"] = "Username required";

  if (!values.date.trim()) errors.date = "Birth date is required";

  if (!values.accountNumber.trim())
    errors.accountNumber = "Account Number is required";

  if (!values.accountType.trim())
    errors.accountType = "Account Type is required";

  if (!values.state.trim()) errors.state = "Please select valid state";

  if (!values.city.trim()) errors.city = "Please select valid city";

  if (!values.password) errors.password = "Password is required";
  else if (
    values.password.trim().length < 6 ||
    values.password.trim().length > 15
  )
    errors.password = "Password must be between 6-15 characters";

  if (!values.confirmPassword.trim())
    errors.confirmPassword = "Password is required";
  else if (values.password.trim() !== values.confirmPassword.trim())
    errors.confirmPassword = "Passwords do not match";
  console.log(errors);
  return errors;
}
