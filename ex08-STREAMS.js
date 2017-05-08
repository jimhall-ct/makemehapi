const Hapi = require('hapi');
const Path = require('path');
const fs = require('fs');
const Rot13 = require('rot13-transform');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

const streamData = fs.createReadStream(Path.join(__dirname, '/stream.txt'));

server.route([
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply(streamData.pipe(Rot13()));
        }
    }
]);

server.start(function(err) {
    if (err) throw err;
    console.log('Server listening at:', server.info.uri);
})



