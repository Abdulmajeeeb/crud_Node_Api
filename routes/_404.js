// Handle requests that do not match any defined route.
const _404 = function (request, response) {

    // Return a route-not-found message to the client.
    response.end("ROUTE NOT FOUND !!");

    return;
}

module.exports = _404;