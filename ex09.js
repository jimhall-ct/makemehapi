const Hapi = require('hapi');
const Joi = require('joi');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route([
    {
        method: 'GET',
        path: '/chickens/{breed}',
        handler: function (request, reply) {
            reply('Chicken: ' + request.params.breed);
        },
        config: {
            validate: {
                params: {
                    breed: Joi.string().required()
                }
            }
        }
    }
]);

server.start(function(err) {
    if (err) throw err;
    console.log('Server listening at:', server.info.uri);
})




