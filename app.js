  export default (express, bodyParser, createReadStream, crypto, http) => {
    const app = express();

    app
    .use((r, res, next) => r.res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE"}) && next())
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/login/', (req, res) => res.send('bee_joo'))   
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res))
    .get('/sha1/:input/', r => res.send(crypto.createHash('sha1').update(r.params.input).digest('hex')))
    .all('/*', r => r.res.send('bee_joo'));

    return app;
}
