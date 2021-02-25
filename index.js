const express = require('express');
const expHandlebars  = require('express-handlebars');
const countriesList = require('countries-list');
const FileReader = require('filereader');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`

mongoose.connect(dbURL, {useUnifiedTopology: true, useNewUrlParser: true});

const landen = Object.values(countriesList.countries);
const continenten = Object.values(countriesList.continents);

const app = express();
const port = 5555;

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
