const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quoting_dojo');

var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String
});

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', function(request, response) {
    response.render('index');
});

app.post('/quotes', function(request, response) {
    var quote = new Quote({name: request.body.name, quote: request.body.quote});
    quote.save(function(err) {
        if(err) {
            console.log('something went wrong');
        } else {
            console.log('successfully added a user');
            response.redirect('/quotes');
        }
    })
});

app.get('/quotes', function(request, response) {
    Quote.find({}, function(err, quotes) {
        if(err) {console.log(err);}
        response.render('quotes', {quotes: quotes});
    });
});

app.listen(8000, function() {
    console.log("Listening on port 8000");
})