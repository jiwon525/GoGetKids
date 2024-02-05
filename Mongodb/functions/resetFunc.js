exports = async ({ token, tokenId, username, password, currentPasswordValid }) => {
  try {
    // Check if the current password is valid
    if (currentPasswordValid) {
      // Notify the user and return 'fail' if trying to reset to the current password
      // Replace this with your notification logic
      console.error("Cannot reset password to current password.");
      return { status: "fail" };
    }

    // Obtain the email/password authentication service
    const app = context.services.get("GoGetKidsMobile");
    const emailPasswordAuthProvider = app.auth.emailPassword;

    // Proceed with the rest of your password reset logic
    await emailPasswordAuthProvider.resetPassword(token, tokenId, password);

    // Return 'success' to indicate that the password was successfully reset
    return { status: "success" };
  } catch (error) {
    // Handle errors and return 'fail' in case of an exception
    console.error("Error resetting password:", error.message);
    return { status: "fail" };
  }
};
