var express = require('express');
var expHandlebars  = require('express-handlebars');
var countriesList = require('countries-list');
var FileReader = require('filereader');
var dotenv = require('dotenv').config();
var mongoose = require('mongoose');
var dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`

// console.log(dbURL)

mongoose.connect(dbURL, {​​​​useUnifiedTopology: true, useNewUrlParser: true })

// mongoose.connect(dbUrl, {​​​​ useUnifiedTopology: true }​​​​)

console.log(process.env.DB_USER)

// var {MongoClient} = require('mongodb');

// var uri = "mongodb://localhost:27018";

// async function connect () {
//     var client = new MongoClient(uri);
//     try {
//         await client.connect();
//         var db = client.db('Cluster-Project-Tech');
//         console.log(`Connectie gelukt ${db.databaseName}`)
//     }
//     catch (error) {
//         console.error('Connectie mislukt' + error)
//     }
//     finally {
//         client.close();
//     }
// }
// connect();

// var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/testaroo');

var landen = Object.values(countriesList.countries);
var continenten = Object.values(countriesList.continents);

var app = express();
var port = 5555;

app.use(express.static('static/public'));

app.engine('handlebars', expHandlebars());
app.set('view engine', 'handlebars');

app.get('/persoonsgegevens', (req, res) => {
    res.render('profiel-1');
});

app.post('/fotos', (req, res) => {
    res.render('addFoto');
});

// app.get('/profiel/fotos', (req, res) => {
//     res.render('profiel-2');
// });

app.post('/profiel/fotos', (req, res) => {
    res.render('profiel-2');
});

// app.get('/profiel-2', (req, res) => {
//     res.render('profiel-2');
// });

app.get('/zoekopdracht', (req, res) => {
    res.render('addZoekopdracht');
});

app.post('/profiel/zoekopdracht', (req, res) => {
    res.render('profiel-3');
});

// app.get('/profiel-3', (req, res) => {
//     res.render('profiel-3');
// });

app.get('/reizen', (req, res) => {
    res.render('addReizen');
});

app.post('/profiel/reizen', (req, res) => {
    res.render('profiel-4', {landen});
});

// app.get('/profiel-4', (req, res) => {
//     res.render('profiel-4', {landen});
// });

// app.get('/profiel/persoonsgegevens', (req, res) => {
//     res.render('Dit is de pagina waarop de persoonsgegevens worden ingevuld');
// });

// app.get('/profiel/fotos', (req, res) => {
//     res.render('Dit is de pagina waarop de fotos toe te voegen zijn.');
// });

// app.get('/profiel/zoekopdracht', (req, res) => {
//     res.render('Dit is de pagina waarop je kan aangeven waar je naar op zoek bent om mee te matchen.');
// });

// app.get('/profiel/reizen', (req, res) => {
//     res.render('Dit is de pagina waar je kan aangeven welke reizen je allemaal wilt maken.');
// });



app.use(function (req, res, next) {
    res.status(404).send('Sorry, deze pagina kon ik niet vinden.')
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
