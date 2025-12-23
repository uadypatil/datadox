// Example usage in a user service file (e.g., src/services/userService.js)

const { readDataFromFile, writeDataToFile } = require('../helper/Text');

function getAllUsers() {
    const users = readDataFromFile('users.json');
    return users || [];
}

function saveNewUser(userData) {
    const users = getAllUsers();
    users.push(userData);
    writeDataToFile('users.json', users);
    return userData;
}

// module.exports = { getAllUsers, saveNewUser };
