const fs = require('fs/promises');
const path = require('path');

const deleteUser = async (request, response) => {
    const filePath = path.resolve(__dirname, '../users.txt');
    const id = request.url.split('/')[2];

    const allUsersText = await fs.readFile(filePath, 'utf8');
    const allUsers = allUsersText.split('\r\n');
    allUsers.splice(id - 1, 1);
    const updateUsers = allUsers.join('\r\n');
    await fs.writeFile(filePath, updateUsers);
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.end(JSON.stringify({
        message: 'user deleted successfully'
    }))
}
module.exports = deleteUser;