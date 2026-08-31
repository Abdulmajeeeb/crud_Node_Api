const fs = require('fs/promises');
const path = require('path');

const allUsers = async (request, response) => {
    const allUsersText = await fs.readFile(path.resolve(__dirname, '../users.txt'), 'utf8');
    const allUsers = allUsersText.split('\r\n');
    const finalUsers = allUsers.map(userLine => {
        const split = userLine.split(";");
        return {
            firstName: split[0],
            lastName: split[1],
            age: Number(split[2])
        }
    })
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(finalUsers));
}

module.exports = allUsers;