const net = require('net');
const dataSource = require('./data.js');
module.exports = () => {
    const server = net.createServer((socket) => {
        socket.on('data', (buffer) => {
            // console.log(buffer, buffer.toString());
            const productId = buffer.readInt32BE();
            console.log(`I've heard the id:${productId}`);
            dataSource.list.some(item => {
                if(item.itemsId === productId){
                    console.log(`I got this items:${item.itemsId}`);
                    const id = item.itemsId;
                    const name = item.title;
                    const price = item.priceDesc[0];
                    socket.write(
                        Buffer.from(`${id} | ${name} | ${price}}`)
                    );
                    return true;
                }
            });
            
            
        });  
    });
    console.log('Server is created ...');

    server.listen(4000);
    
}