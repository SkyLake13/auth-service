import * as app from './app.express';

app.expressApp.listen('4300', () => {
    console.log('Listening at 4300');
});