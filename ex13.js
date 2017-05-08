const Hapi = require('hapi');
const Auth = require('hapi-auth-basic');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

const user = {name: 'hapi', password: 'auth'};

function validate (request, username, password, callback) {

    let isValid = (username === user.name && password === user.password);

    return callback(null, isValid, {name: user.name});
}

server.register(Auth, (err) => {
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route([
        {
            method: 'GET',
            path: '/',
            config: {
                auth: 'simple',
                handler: function (request, reply) {
                    reply();
                }
            }
        }
    ]);
});



server.start(function(err) {
    if (err) throw err;
    console.log('Server listening at:', server.info.uri);
})
