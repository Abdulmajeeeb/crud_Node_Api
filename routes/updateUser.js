const fs = require('fs/promises');
const path = require('path');

const updateUser = async (request, response) => {
    const filePath = path.resolve(__dirname, '../users.txt')
    const id = request.url.split('/')[2];

    let body = "";
    request.on('data', chunk => {
        body += chunk;
    })
    request.on('end', async () => {
        const receivedData = JSON.parse(body);
        const allUsersText = await fs.readFile(filePath, 'utf8');
        const allUsers = allUsersText.split('\r\n');
        const user = allUsers[id - 1];
        const splitUser = user.split(';');
        const firstName = receivedData.firstName ?? splitUser[0];
        const lastName = receivedData.lastName ?? splitUser[1];
        const age = receivedData.age ?? splitUser[2];
        const userLine = `${firstName};${lastName};${age}`;
        allUsers[id - 1] = userLine;
        const updateUsers = allUsers.join('\r\n');
        await fs.writeFile(filePath, updateUsers);
        response.writeHead(202, {
            "Content-Type": "application/json"
        })
        response.end(JSON.stringify({
            message: 'user updated successfully'
        }))
    })
}
module.exports = updateUser;