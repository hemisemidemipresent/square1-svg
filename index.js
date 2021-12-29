const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const stream = require('stream');

app.get('/:algorithm:d', (req, res) => {
    const Square1 = require('./square1');
    let alg = req.query.algorithm;
    let d = req.query.d; //isDownload
    if (!alg || typeof alg != 'string') alg = '';
    if (alg.length > 200) return res.send('input algorithm too long');
    try {
        let sq = new Square1(alg);
        let svg = sq.toSVG();
        if (!d) {
            res.setHeader('Content-Type', 'image/svg+xml');
            res.send(svg);
        } else {
            let fileContents = Buffer.from(svg, 'utf-8');
            let fileName = (alg.length == 0 ? 'sq1' : alg.replaceAll('/', 'slice')) + '.svg';
            res.writeHead(200, {
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Type': 'image/svg'
            });

            res.end(fileContents);
        }
    } catch (e) {
        console.log(e);
        res.send('invalid algorithm');
    }
});
app.get('/', (req, res) => {
    res.redirect('https://github.com/hemisemidemipresent/square1/blob/main/README.md');
});
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
