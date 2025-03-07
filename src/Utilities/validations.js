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

export const resetPaswordValidation = (
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
    setConfirmPasswordError("Password does not match.");
  } else {
    setConfirmPasswordError("");
  }

  if (newPassword !== confirmPassword) {
    isValid = false;
    setConfirmPasswordError("Password does not match.");
  } else {
    setConfirmPasswordError("");
  }

  return isValid;
};
