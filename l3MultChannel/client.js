const net = require('net');
const { buffer } = require('protocol-buffers/compile');
const ids = [10333691,10461166,10369508,10465697,10290011,10457352,10409657,10450230,10464178,10445530,10463067,10391890];
module.exports = ()=> {
    const socket = new net.Socket({});
    socket.connect({
        host: '127.0.0.1',
        port: 4000
    });
    console.log('Client is created ...');  
    const buffer = Buffer.alloc(4);
    const index = Math.floor(Math.random() * ids.length);
    const id = ids[index];
    console.log(`request id is ${id}`)
    buffer.writeUInt32BE(id);
    socket.write(buffer); 
    socket.on('data', buffer => {
        console.log(buffer.toString());
    });

};
