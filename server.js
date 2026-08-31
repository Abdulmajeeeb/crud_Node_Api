const http = require('node:http');

const route_404 = require('./routes/_404');
const getUser = require('./routes/user');
const getAllUsers = require('./routes/allUsers');
const createUser = require('./routes/createUser');

const crudServer = http.createServer(async function (request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');


    const url = request.url;

    switch (url) {
        case '/users':
            await getAllUsers(request, response);
            break;
        case '/user':
            if (request.method === 'POST') {
                await createUser(request, response);
            }
            break;
        default:
            if (url.startsWith('/user/')) {
                await getUser(request, response);
            } else {
                route_404(request, response);
            }
            break;
    }
    return;
})

crudServer.listen(4001);
