const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

let shape = [2, 1, 2, 1, 2, 1, 2, 1];
app.get('/:algorithm', (req, res) => {
    const Square1 = require('./square1');
    let alg = req.query.algorithm;
    if (!alg) alg = '';
    if (alg.length > 200) return res.send('input algorithm too long');
    console.log(alg);
    try {
        let sq = new Square1(alg);
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(sq.toSVG());
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
