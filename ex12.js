const Hapi = require('hapi');
const Boom = require('boom');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.state('session', {
    domain: 'localhost',
    path: '/',
    ttl: 10,
    encoding: 'base64json',
    isHttpOnly: false,
    isSecure: false,
    isSameSite: false
});

server.route([
    {
        method: 'GET',
        path: '/set-cookie',
        handler: function (request, reply) {
            reply('Cookie Set').state('session', {key: 'makemehapi'});
        },
        config: {
            state: {
                parse: true,
                failAction: 'log'
            }
        }
    }, {
        method: 'GET',
        path: '/check-cookie',
        handler: function (request, reply) {

            if (request.state.session) {
                reply({user: 'hapi'});
            } else {
                reply(Boom.unauthorized('Missing authentication'));
            }
        }
    }
]);

server.start(function(err) {
    if (err) throw err;
    console.log('Server listening at:', server.info.uri);
})




