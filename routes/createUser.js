const fs = require('fs/promises');
const path = require('path');

const createUser = async (request, response) => {
    const filePath = path.resolve(__dirname, '../users.txt');

    let body = "";
    request.on('data', chunk => {
        body = body + chunk;
    })
    request.on('end', async () => {
        const newUser = JSON.parse(body);
        const userLine = `${newUser.firstName};${newUser.lastName};${newUser.age}`;
        await fs.appendFile(filePath, userLine);
        response.writeHead(201, {
            "Content-Type": "application/json"
        })
        response.end(JSON.stringify({
            message: 'user created successfully'
        }))
    })
}
module.exports = createUser;