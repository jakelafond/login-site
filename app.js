const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

const authenticate = (req, res, next) => {
  if (req.body.username === 'jake' && req.body.password === 'password') {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get('/login', (req, res) => {
  res.render('login');
});

app.use(authenticate);

app.post('/', (req, res) => {
  res.render('index', req.body);
});

app.listen(3000, (req, res) => {
  console.log('Your app is running!');
});
