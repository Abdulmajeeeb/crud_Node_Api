// Import file system and path utilities.
const fs = require('fs/promises');
const path = require('path');

const createUser = async (request, response) => {

    // Resolve the path to the user data file.
    const filePath = path.resolve(__dirname, '../users.txt');

    // Collect the request body data.
    let body = "";
    request.on('data', chunk => {
        body = body + chunk;
    })

    request.on('end', async () => {

        // Parse the request body into a JavaScript object.
        const newUser = JSON.parse(body);

        // Format the new user as a semicolon-separated record.
        const userLine = `\r\n${newUser.firstName};${newUser.lastName};${newUser.age}`;

        // Append the new user record to the data file.
        await fs.appendFile(filePath, userLine);

        // Return a successful creation response.
        response.writeHead(201, {
            "Content-Type": "application/json"
        })
        response.end(JSON.stringify({
            message: 'user created successfully'
        }))
    })
}

module.exports = createUser;