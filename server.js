// Import Node's built-in HTTP module.
const http = require('node:http');

// Import route handlers for each API operation.
const route_404 = require('./routes/_404');
const getUser = require('./routes/user');
const getAllUsers = require('./routes/allUsers');
const createUser = require('./routes/createUser');
const updateUser = require('./routes/updateUser');
const deleteUser = require('./routes/deleteUser');

const crudServer = http.createServer(async function (request, response) {

    // Configure CORS to allow requests from external clients.
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');


    const url = request.url;

    // Route requests based on the requested URL.
    switch (url) {

        // Retrieve all users.
        case '/users':
            await getAllUsers(request, response);
            break;

        // Create a new user.
        case '/user':
            if (request.method === 'POST') {
                await createUser(request, response);
            }
            break;

        // Handle requests containing a user ID.
        default:
            if (url.startsWith('/user/')) {

                // Retrieve a user by ID.
                if (request.method === "GET") {
                    await getUser(request, response);
                    break;
                }

                // Update an existing user by ID.
                if (request.method === "PATCH") {
                    await updateUser(request, response);
                    break;
                }

                // Delete an existing user by ID.
                if (request.method === "DELETE") {
                    await deleteUser(request, response);
                    break;
                }

            } else {

                // Handle requests that do not match any defined route.
                route_404(request, response);
            }
            break;
    }
    return;
})

// Start the CRUD server on port 4001.
crudServer.listen(4001);