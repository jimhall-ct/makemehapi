const Hapi = require('hapi');
const Joi = require('joi');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route([
    {
        method: 'POST',
        path: '/login',
        handler: function (request, reply) {
            reply('login successful');
        },
        config: {
            validate: {
                payload: Joi.object({
                    isGuest: Joi.boolean(),
                    username: Joi.string().when('isGuest',{ is: false, then: Joi.required() }),
                    password: Joi.string().alphanum(),
                    accessToken: Joi.string().alphanum(),
                    birthyear: Joi.number().integer().min(1900).max(2013),
                    email: Joi.string().email()
                })
                    .options({allowUnknown: true})
                    .without('password', 'accessToken')
            }
        }
    }
]);

server.start(function(err) {
    if (err) throw err;
    console.log('Server listening at:', server.info.uri);
})




