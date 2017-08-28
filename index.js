'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const port = process.env.PORT || 4000;
server.connection({port: port});

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

server.start(() => {
    console.log(`Server listening at: ${server.info.uri}`);
});