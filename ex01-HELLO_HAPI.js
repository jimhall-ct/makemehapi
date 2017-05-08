const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    method: 'GET',
    path: '/',
    handler: function(response, reply) {
        reply('Hello hapi');
    }
});

server.start(function(err) {

    if (err) throw err;

   console.log('Server listening at:', server.info.uri);
});