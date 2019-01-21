///require express
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
///declare
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('unable to append to server.log');
  })
  next();
});

///app.use((req, res, next) => {
///  res.render('maintinence.hbs')
/// })

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIT', (text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the home page!'
  });
});


app.get('/help',(req,res) => {
  res.send('help page');
});

app.get('/about',(req,res) =>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
})

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: "Error, it failed jim."
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
