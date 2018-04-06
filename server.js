const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router.get('/test', (ctx) => {
    const { callback } = ctx.query;
    const data = {
        name: '山里有个蓝精灵'
    };
    if (callback) {
        ctx.body = `${callback}(${JSON.stringify(data)})`;
    } else {
        ctx.body = "it's not jsonp request";
    }
});

app.use(router.routes());
app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('listen on port: 3000');
});