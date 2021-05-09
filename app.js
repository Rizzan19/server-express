export default (express, bodyParser, createReadStream, crypto, http) => {
    const app = express();
    const CORS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, Access-Control-Allow-Headers',
        'Content-Type': 'text/plain; charset=utf-8'
    };

    app
    .use((r, res, next) => r.res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE"}) && next())
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/login/', (req, res) => res.send('rizzan18'))   
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res))
    .get('/sha1/:input/', r => res.send(crypto.createHash('sha1').update(r.params.input).digest('hex'))
    .use(bodyParser.json())
    .all('/req/', (req, res) => {
        res.set(CORS);
        if (req.method === "GET" || req.method === "POST") {
            const url = req.method === "GET" ? req.query.addr : req.body.addr;
            if (url) {
                http.get(url, (response) => {
                    let rawData = '';
                    response.on('data', (chunk) => {
                        rawData += chunk;
                    });
                    response.on('end', () => {
                        res.send(rawData);
                    });
                });
            } else {
                res.send('rizzan18');
            }
        } else {
            res.send(login);
        }
    })
    .all('/*', (req, res) => {
        res.set(CORS);
        res.send('rizzan18');
        
    return app;
}
