// MongoDB Stitch function for bcryptjs hashing
exports = async function(password) {
  try {
    const bcrypt = require('bcryptjs');

    // Generate a salt
    const salt = bcrypt.genSaltSync(10);

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    return { error: 'Internal server error - bcryptjsHash' };
  }
};
