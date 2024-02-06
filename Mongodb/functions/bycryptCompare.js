// MongoDB Stitch function for bcryptjs password comparison
exports = async function(password, hashedPassword) {
  try {
    const bcrypt = require('bcryptjs');
    
    // Compare provided password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    
    return passwordMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};
