var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var banque = require('./banque');

function isInt(value) {
  return !isNaN(value) &&
         parseInt(Number(value)) == value &&
         !isNaN(parseInt(value, 10));
}

/*
// Si on lance l'application Angular.js avec grunt serve
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
*/
// Si on veut que l'application Angular.js soit envoyé par notre application Node.js
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(bodyParser.json()); // pour parser du JSON

app.post('/compte/', function (req, res) {
        console.log(req.body);
        if(typeof req.body.id === 'undefined' || ! isInt(req.body.somme)) {
          res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        } else if(banque.creerCompte(req.body.id,parseInt(req.body.somme))) {
                var pos = banque.positionDuCompte(req.body.id);
                if(pos) {
                        console.log(pos);
                        res.json(pos);
                } else {
                        res.status(404).json({ error: "Le compte d'id "+req.params.id+" n'existe pas." });
                }
        } else {
                res.status(409).json({ error: "Le compte d'id "+req.body.id+" existe déjà." });
        }
});

app.get('/compte/:id', function(req, res) {

        console.log(req.query);
        if(typeof req.params.id === 'undefined') {
                res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        } else {
                var pos = banque.positionDuCompte(req.params.id);
                if(pos) {
                        console.log(pos);
                        res.json(pos);
                } else {
                        res.status(404).json({ error: "Le compte d'id "+req.params.id+" n'existe pas." });
                }
        }
});

app.put('/compte/:id', function(req, res) {
        console.log(req.query);
        var pos;
        if(typeof req.params.id === 'undefined' ||  ! isInt(req.body.somme)) {
                res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        } else {
                if(req.body.somme > 0) {
                        if(banque.ajouterAuCompte(req.body.id,parseInt(req.body.somme))) {
                              pos = banque.positionDuCompte(req.params.id);
                              if(pos) {
                                      console.log(pos);
                                      res.json(pos);
                              } else {
                                      res.status(404).json({ error: "Le compte d'id "+req.params.id+" n'existe pas." });
                              }
                        } else {
                              res.status(404).json({ error: "Le compte d'id "+req.params.id+" n'existe pas." });
                        }
                } else {
                        if(banque.retirerDuCompte(req.body.id, - parseInt(req.body.somme))) {
                              pos = banque.positionDuCompte(req.params.id);
                              if(pos) {
                                      console.log(pos);
                                      res.json(pos);
                              } else {
                                      res.status(404).json({ error: "Le compte d'id "+req.params.id+" n'existe pas." });
                              }
                        } else {
                              res.status(404).json({ error: "Le compte d'id "+req.params.id+" n'existe pas." });
                        }
                }
        }
});

// app.listen(3000, function () {
// console.log('Example app listening on port 3000!') ;
// }) ;
module.exports = app;
