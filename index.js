const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'))

app.get('/sum', (req, res) => {
    let a = Number(req.query.a);
    let b = Number(req.query.b);
    res.send(`a = ${a}, b = ${b}<br>sum = ${a + b}`);
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

//web
//a = 1, b = 2
//sum = 3