'use strict';

const Hapi = require('hapi');
const HapiJwt = require('hapi-auth-jwt2');
const server = new Hapi.Server();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'OCW6s6K5yAtdLI2b/7GZpzWQNmxwmb5IF1bb1xv9WHQoBH/+Y9WBMyb9OSJfGvS+2Iza8g0U2oZhupVIjvJw4HVHIYZIGdcJJhvnrI0i3kRIB1HWAz0eh2myjFs7B5ZHM2vYBHxYdXUnEceg11RhClAc3+jLuCTkaDYbHwhZehHBIiTiLb1fSoF7x70tUAGrikChsfSKx7Kr+OKca7osk79e57jG67qG2hK0jevV/SCM/nOmw0HFke62GHM8HkY3nIQTWQ1p4o3VUta80C9ADU3Cs1DagUCyO/rYVD/WVgzv26YC8Ed8OIj3Rjby+OgJTGSL1SZKvuIVuIGObCAFHA==';
const port = process.env.PORT || 4000;
server.connection({port: port});

server.register(HapiJwt, (error) => {
    server.auth.strategy('jwt', 'jwt',
        { key: JWT_SECRET_KEY,
            validateFunc: (decoded, request, callback) => callback(null, true), // This should be replaced with a more robust function
            verifyOptions: { algorithms: [ 'HS256' ] }
        });

    server.auth.default('jwt');

    server.route([{
        method: 'GET',
        path: '/api/questions',
        handler: (request, reply) => {
            const questions = [
                'What is Hermione Granger\'s middle name?',
                'For how long are house-elves required to serve their family?',
                'What is Occlumency used for?',
                'What is the name of the widely read daily newspaper, in Britain\'s wizard community?',
                'Who is the editor of the Daily Prophet?'
            ];

            reply(questions);
        }
    }]);
});

server.start(() => {
    console.log(`Server listening at: ${server.info.uri}`);
});