// import { isValid } from "react-datepicker/dist/date_utils";
import { toast } from "react-toastify";

let emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidation = (email) => {
  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email != null && emailRegex.test(String(email).toLowerCase());
};

export const passwordValidation = (password) => {
  return password != null && password.length >= 6;
};

export const isSamePassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const loginFormValidation = (
  email,
  password,
  setEmailError,
  setPasswordError
) => {
  let isValid = true;
  if (!email.trim() || !email.match(emailRegex)) {
    isValid = false;
    setEmailError("Please provide valid email.");
  } else {
    setEmailError("");
  }

  if (!password.trim() || password.length < 6) {
    isValid = false;
    setPasswordError("Password must be at least 6 characters.");
  } else {
    setPasswordError("");
  }
  return isValid;
};

export const forgotPasswordEmailValidation = (email, setEmailError) => {
  let isValid = true;
  if (!email.trim() || !email.match(emailRegex)) {
    isValid = false;
    setEmailError("Please provide valid email.");
  } else {
    setEmailError("");
  }
  return isValid;
};

export const otpValidation = (otp, setOtpError) => {
  let isValid = true;
  if (!otp.trim() || otp.length !== 6) {
    isValid = false;
    setOtpError("OTP must be 6 digits.");
  } else {
    setOtpError("");
  }
  return isValid;
};

export const forgotPasswordValidation = (
  newPassword,
  confirmPassword,
  setNewPasswordError,
  setConfirmPasswordError
) => {
  let isValid = true;
  if (!newPassword.trim() || newPassword.length < 6) {
    isValid = false;
    setNewPasswordError("Password must be at least 6 characters.");
  } else {
    setNewPasswordError("");
  }

  if (!confirmPassword.trim() || confirmPassword.length < 6) {
    isValid = false;
    setConfirmPasswordError(
      "New Password does not match with Confirm Password."
    );
  } else {
    setConfirmPasswordError("");
  }

  if (newPassword !== confirmPassword) {
    isValid = false;
    setConfirmPasswordError(
      "New Password does not match with Confirm Password."
    );
  } else {
    setConfirmPasswordError("");
  }

  return isValid;
};

export const resetPasswordValidation = (resetPasswordInfo) => {
  let isValid = true;
  if (
    resetPasswordInfo.oldPassword.length < 6 ||
    resetPasswordInfo.newPassword.length < 6 ||
    resetPasswordInfo.confirmPassword.length < 6
  ) {
    isValid = false;
    toast.error("Password must be at least 6 characters.", {
      className: "toast-font",
    });
  } else if (
    resetPasswordInfo.newPassword !== resetPasswordInfo.confirmPassword
  ) {
    isValid = false;
    toast.error("New Password does not match with Confirm Password.", {
      className: "toast-font",
    });
  }
  return isValid;
};

export const registerUserValidations = (
  userForm,
  userFormErrors,
  setUserFormErrors
) => {
  let isValid = true;
  let userErrors = { ...userFormErrors };
  if (!userForm.first_name.trim()) {
    isValid = false;
    userErrors.first_name = "First Name Required";
  } else {
    delete userErrors.first_name;
  }

  if (!userForm.last_name.trim()) {
    isValid = false;
    userErrors.last_name = "Last Name Required";
  } else {
    delete userErrors.last_name;
  }

  if (!userForm.address.trim()) {
    isValid = false;
    userErrors.address = "Address Required";
  } else {
    delete userErrors.address;
  }

  if (!userForm.contactNo.trim() || userForm.contactNo < 10) {
    isValid = false;
    userErrors.contactNo = "Invalid Contact Number";
  } else {
    delete userErrors.contactNo;
  }

  if (!userForm.email.trim() || !userForm.email.match(emailRegex)) {
    isValid = false;
    userErrors.email = "Invalid Email";
  } else {
    delete userErrors.email;
  }

  if (
    !userForm.enterPassword.trim() ||
    !userForm.password.trim() ||
    userForm.enterPassword.length < 6 ||
    userForm.password.length < 6
  ) {
    isValid = false;
    userErrors.enterPassword = "Password must be at least 6 characters.";
    userErrors.password = "Password must be at least 6 characters.";
  } else if (userForm.enterPassword !== userForm.password) {
    isValid = false;
    userErrors.enterPassword = "Password mismatch.";
    userErrors.password = "Password mismatch.";
  } else {
    delete userErrors.password;
    delete userErrors.enterPassword;
  }

  console.log("User Errors", userErrors);
  setUserFormErrors((prevErrors) => ({ ...prevErrors, ...userErrors }));
  return Object.keys(userErrors).length === 0;
};
