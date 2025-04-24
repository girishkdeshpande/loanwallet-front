import { toast } from "react-toastify";

let emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let contactNumberRegex = /^[0-9]+$/;

export const emailValidation = (email, setEmailError) => {
  let isValid = true;
  if (!email.trim() || !email.match(emailRegex)) {
    isValid = false;
    setEmailError("Please provide valid email.");
  } else {
    setEmailError("");
  }
  return isValid;
};

export const passwordValidation = (password, setPasswordError) => {
  let isValid = true;

  if (!password.trim() || password.length < 6) {
    isValid = false;
    setPasswordError("Password must be at least 6 characters.");
  } else {
    setPasswordError("");
  }
  return isValid;
};

export const PasswordMatchValidation = (
  password,
  confirmPassword,
  setConfirmPasswordError
) => {
  let isValid = true;
  if (password !== confirmPassword) {
    isValid = false;
    setConfirmPasswordError(
      "New Password does not match with Confirm Password."
    );
  } else {
    setConfirmPasswordError("");
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

export const userFormValidation = (modifiedFields) => {
  const userFormErrors = {};
  let isValid = true;

  const password = modifiedFields.password;
  const enterPassword = modifiedFields.enterPassword;

  for (let key in modifiedFields) {
    const value = modifiedFields[key];
    if (key === "first_name" && !value.trim()) {
      userFormErrors[key] = "First Name is required";
      isValid = false;
    }
    if (key === "last_name" && !value.trim()) {
      userFormErrors[key] = "Last Name is required";
      isValid = false;
    }
    if (
      key === "contactNo" &&
      (!value.trim() || value.length !== 10 || !value.match(contactNumberRegex))
    ) {
      userFormErrors[key] = "Invalid Contact Number";
      isValid = false;
    }
    if (key === "email" && (!value.trim() || !value.match(emailRegex))) {
      userFormErrors[key] = "Invalid email";
      isValid = false;
    }
    if (key === "address" && !value.trim()) {
      userFormErrors[key] = "Address is required";
      isValid = false;
    }

    if (key === "password" && (!value.trim() || value.length < 6)) {
      userFormErrors[key] = "Password must be at least 6 characters";
      isValid = false;
    }
    if (key === "enterPassword" && (!value.trim() || value.length < 6)) {
      userFormErrors[key] = "Password must be at least 6 characters";
      isValid = false;
    }
    if (password && enterPassword && password !== enterPassword) {
      userFormErrors.password = "Password Mismatch";
      isValid = false;
    }
  }
  return { isValid, userFormErrors };
};
