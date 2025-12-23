const { readDataFromFile, writeDataToFile } = require('../helper/Text');
const USERS_FILE = 'users.json';
// In a real application, you would require your bcrypt utility here:
// const bcrypt = require('bcryptjs');

/**
 * @typedef {object} User
 * @property {string} id - A unique identifier for the user.
 * @property {string} name - The user's full name.
 * @property {string} email - The user's email address (unique).
 * @property {string} passwordHash - A hashed password string.
 * @property {Date} createdAt - The date the user was created.
 */

// ... (getAllUsers and getUserByEmail functions remain the same) ...
function getAllUsers() {
  const users = readDataFromFile(USERS_FILE);
  return users || [];
}

function getUserByEmail(email) {
  const users = getAllUsers();
  return users.find(user => user.email === email);
}
// ...

/**
 * Validates user credentials for login.
 * @param {string} email - The user's email address.
 * @param {string} password - The plain-text password provided during login.
 * @returns {User | null} The user object if validation succeeds, otherwise null.
 */
function validateUserCredentials(email, password) {
  const user = getUserByEmail(email);

  if (user) {
    // In a real app, you would use bcrypt.compareSync(password, user.passwordHash)
    // For this simple JSON file example, we assume passwordHash is a plain string match for now:
    const isPasswordValid = (user.passwordHash === password); 
    
    if (isPasswordValid) {
      // Return the user object (excluding the hash for security in a real API response)
      const { passwordHash, ...userWithoutHash } = user;
      return userWithoutHash; 
    }
  }
  
  return null; // Login failed
}


/**
 * Saves a new user to the JSON file store.
 * NOTE: Passwords should be hashed before calling this function in a real app.
 */
function saveUser(userData) {
  // Example of hashing the password *before* saving (requires bcryptjs library)
  // userData.passwordHash = bcrypt.hashSync(userData.passwordHash, 10);
  
  const users = getAllUsers();
  const newUser = {
    id: Date.now().toString(),
    ...userData,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeDataToFile(USERS_FILE, users);
  
  return newUser;
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  saveUser,
  validateUserCredentials, // Export the new function
};
