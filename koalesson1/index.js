const koa = require('koa');
const mount = require('koa-mount');
const fs = require('fs');

module.exports = () => {
    const app = new koa();
    let winCount = 0;

    app.use(
        mount('/favicon.ico', (ctx) => {
            ctx.status = 200;
        })
    );

    const gameKoa = new koa();

    gameKoa.use(async (ctx, next) => {
        console.log('in gamekoa')
        const { request, response } = ctx;
        const action = request.query.action || '';
        console.log(`Action is ${action}`);
        // res.status(200); //一般情况下不写res.status，默认就是200
        ctx.action = action;
        try {
            const message = await next();
            console.log('set win count');
            response.status = 200;
            response.body = message;
            winCount++;
            console.log(`result is ${message}`);
        } catch(e) {
            console.log(`error: ${e} >>>>>>`);
            response.status = 500;
            response.body = e;   
        } 
    });

    gameKoa.use((ctx) => {
        return new Promise((resolve, reject) => {
            console.log('In next');
            const { action, response } = ctx;
            console.log('action is ', action);
            if(winCount > 5) {
                let message = `I won't play`;
                reject(message);
                reject()
            } else if(action !== '') {
                setTimeout(()=>{
                    let message = '';
                    switch(action) {
                        case 'jiandao':
                            message = '成功';        
                            break;
                        case 'shitou':
                            message = '失败';
                            break;
                        case 'bu':
                            message = '平局';
                            break;
                    }
                    resolve(message);
                }, 500);
            } else {
                setTimeout(()=>{
                    let message = 'You have no action';
                    console.log(message);
                    reject(message);
                }, 500);
            } 
        })
    });

    app.use(
        mount('/game', gameKoa)
    );

    app.use(
        mount('/reset', (ctx) => {
            const { response } = ctx;
            winCount = 0;
            console.log('winCount has been reset');
            response.body = 'winCount has been reset';
        })
    );

    app.use(
        mount('/', (ctx) => {
            console.log(ctx.request.url);
            ctx.body = fs.readFileSync(`${__dirname}/index.html`, 'utf-8');
        })
    );

    app.listen(3000);
}