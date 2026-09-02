// Import file system and path utilities.
const fs = require('fs/promises');
const path = require('path');

const allUsers = async (request, response) => {

    // Read all user records from the data file.
    const allUsersText = await fs.readFile(path.resolve(__dirname, '../users.txt'), 'utf8');

    // Convert the file contents into an array of user records.
    const allUsers = allUsersText.split('\r\n');

    // Convert each user record into a structured object.
    const finalUsers = allUsers.map(userLine => {

        // Split the record into individual fields.
        const split = userLine.split(";");

        return {

            // Map each field to its corresponding user property.
            firstName: split[0],
            lastName: split[1],
            age: Number(split[2])

        }
    })

    // Return the complete user list as JSON.
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(finalUsers));

}

module.exports = allUsers;