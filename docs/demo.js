import zsonp from '../lib/zsonp';

zsonp({
    url: 'http://127.0.0.1:3000/test',
    params: {
        heads: 3,
        arms: 6
    }
}).then(res => {
    console.log('res: ', res);
}).catch(err => {
    console.error('error: ', err);
});