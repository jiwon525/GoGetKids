exports = async function(password, hashedPassword) {
  try {
    const bcrypt = require('bcryptjs');

    // Compare provided password with stored hashed password
    const passwordMatchSync = bcrypt.compareSync(password, hashedPassword);

    if (passwordMatchSync) {
      return true;
    }

    // If synchronous comparison fails, try asynchronous comparison
    const passwordMatchAsync = await new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return passwordMatchAsync;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};
