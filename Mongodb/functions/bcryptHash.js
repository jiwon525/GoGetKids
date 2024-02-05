// MongoDB Stitch function for scrypt hashing
exports = async function(password) {
  try {
    const scrypt = require('scrypt');

    // Parameters for scrypt hashing
    const scryptParams = scrypt.paramsSync(0.1);

    // Hash the password
    const hashedPassword = scrypt.kdfSync(password, scryptParams);

    return hashedPassword.toString('hex');
  } catch (error) {
    console.error('Error hashing password:', error);
    return { error: 'Internal server error - scryptHash' };
  }
};
