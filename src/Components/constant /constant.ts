export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const getErrorMessage = (code: string) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/invalid-email":
      return "The email address is invalid.";
    case "auth/weak-password":
      return "The password is too weak.";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled.";
    case "auth/too-many-requests":
      return "You’ve tried logging in too many times. Please take a break and try again later.";
    case "auth/invalid-credential":
      return "Invalid Email/password";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};
