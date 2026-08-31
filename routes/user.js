const fs = require('fs/promises');
const path = require('path');

const getUser = async (request, response) => {
    const allUsersText = await fs.readFile(path.resolve(__dirname, '../users.txt'), 'utf8');
    const allUsers = allUsersText.split('\r\n');

   // console.log(JSON.stringify(request.url, null, 2, false))
    const id = request.url.split('/')[2];


    let user = null;
    if (allUsers[id - 1] !== undefined) {
        user = allUsers[id - 1];
        console.log(user);
    }

    if (user === null) {
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'user not found'
        }));
        return;
    }
    const split = user.split(";");
    const userById = {
        firstName: split[0],
        lastName: split[1],
        age: Number(split[2])
    }

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(userById));
}

module.exports = getUser;