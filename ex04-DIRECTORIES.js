const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: __dirname
            }
        }
    }
});

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(Inert, function (err) {
    if (err) throw err;
});

server.route([
    {
        method: 'GET',
        path: '/foo/bar/baz/{file}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'public')
            }
        }
    }
]);

server.start(function(err) {
    if (err) throw err;
    console.log('Server listening at:', server.info.uri);
})
