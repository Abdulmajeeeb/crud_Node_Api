// Import file system and path utilities.
const fs = require('fs/promises');
const path = require('path');

const getUser = async (request, response) => {

    // Read all user records from the data file.
    const allUsersText = await fs.readFile(path.resolve(__dirname, '../users.txt'), 'utf8');

    // Convert the file contents into an array of user records.
    const allUsers = allUsersText.split('\r\n');

    // Extract the user ID from the request URL.
    // console.log(JSON.stringify(request.url, null, 2, false))
    const id = request.url.split('/')[2];


    // Check whether the requested user exists.
    let user = null;
    if (allUsers[id - 1] !== undefined) {
        user = allUsers[id - 1];
        console.log(user);
    }

    // Return a 404 response if the user does not exist.
    if (user === null) {
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'user not found'
        }));
        return;
    }

    // Convert the stored user record into an object.
    const split = user.split(";");
    const userById = {
        firstName: split[0],
        lastName: split[1],
        age: Number(split[2])
    }

    // Return the requested user as JSON.
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(userById));
}

module.exports = getUser;