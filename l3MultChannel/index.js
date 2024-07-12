const server = require('./server.js');
const client = require('./client.js');

module.exports = () => {
    server();

    setTimeout(()=> {
        client();
    }, 1000);
    
};
