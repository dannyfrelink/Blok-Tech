var express = require('express');
var app = express();
var port = 4567;

app.get('/', (req, res) => {
    res.send('helloworld')
});

app.listen(port, () => {

});
