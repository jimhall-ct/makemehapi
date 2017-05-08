const Hapi = require('hapi');
const H2o2 = require('h2o2');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(H2o2, function(err) {
    if (err) throw err;
});

server.route([
    {
        method: 'GET',
        path: '/proxy',
        handler: {
            proxy: {
                host: '127.0.0.1',
                port: 65535
            }
        }
    }
]);

server.start((err) => {
    if (err) throw err;
console.log('Server listening at:', server.info.uri);
});