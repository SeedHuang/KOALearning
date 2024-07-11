// 如果要看protocol-buffers请查看以下网址https://www.npmjs.com/package/protocol-buffers
const protobuf = require('protocol-buffers');
const fs = require('fs');
module.exports = () => {
    const schema = protobuf(fs.readFileSync(`${__dirname}/test.proto`));
    console.log('It is schema:>>>>>>>>');
    console.log(schema);
    const buffer = schema.Column.encode({
        id: 123,
        name: 'HuangChunhua',
        price: 23
    });
    console.log('It is output buffer:>>>>>')
    console.log(buffer);
    const schemaString = schema.Column.decode(buffer);
    console.log(schemaString);
};