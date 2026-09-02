// Import file system and path utilities.
const fs = require('fs/promises');
const path = require('path');

const updateUser = async (request, response) => {

    // Resolve the path to the user data file.
    const filePath = path.resolve(__dirname, '../users.txt')

    // Extract the user ID from the request URL.
    const id = request.url.split('/')[2];

    // Collect the request body data.
    let body = "";
    request.on('data', chunk => {
        body += chunk;
    })

    request.on('end', async () => {

        // Parse the request body into a JavaScript object.
        const receivedData = JSON.parse(body);

        // Read and split all user records from the data file.
        const allUsersText = await fs.readFile(filePath, 'utf8');
        const allUsers = allUsersText.split('\r\n');

        // Check whether the requested user exists.
        let user = null;
        if (allUsers[id - 1] !== undefined) {
            user = allUsers[id - 1];
            console.log(user);
        }

        // Return a 404 response if the user does not exist.
        if (user === null) {
            response.writeHead(404, {
                "Content-Type": "application/json"
            })
            response.end(JSON.stringify({
                message: 'user not found'
            }))
            return;
        }

        // Split the existing user record into individual fields.
        const splitUser = user.split(';');

        // Use the new value when provided; otherwise retain the existing value.
        const firstName = receivedData.firstName?.replaceAll(';','') ?? splitUser[0];
        const lastName = receivedData.lastName?.replaceAll(';','') ?? splitUser[1];
        const age = receivedData.age ?? splitUser[2];

        // Construct the updated user record.
        const userLine = `${firstName};${lastName};${age}`;

        // Replace the existing user record in the array.
        allUsers[id - 1] = userLine;

        // Convert the updated array back into file format.
        const updateUsers = allUsers.join('\r\n');

        // Save the updated user data to the file.
        await fs.writeFile(filePath, updateUsers);

        // Return a successful update response.
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        response.end(JSON.stringify({
            message: 'user updated successfully'
        }))
    })
}

module.exports = updateUser;