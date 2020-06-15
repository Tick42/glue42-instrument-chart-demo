const ystocks = require('yahoo-stocks');
const yf = require('yahoo-finance');
const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');
const fs = require('fs');
const moment = require('moment')
const port = 5005;


const fileOptions = { encoding: 'utf-8' };
const fetchOptions = { interval: '1d', range: '5y' };
const cacheDir = './.cache';

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use('/', express.static('client/build'));

app.get('/rest', function (req, res) {

  const instrument = req.query.instrument;
  console.log(instrument)
  if (!instrument) {
    res.send('');
    return;
  }
  
  const end = moment().format('YYYY-MM-DD');
  const start = moment().subtract(1, 'years').format('YYYY-MM-DD');

  console.log(start)
  console.log(end)

  yf.historical({
    symbol: instrument,
    from: start,
    to: end,
    period: 'd'
  }, (err, quotes) => {
    if (err) {
      throw err
    }
    // const responseAsString = JSON.stringify(quotes);
    res.send(quotes);
  })
})

console.log('\033c');
console.log('Compiled successfully!'.green);
console.log();
console.log('You can now view the application in the browser.');
console.log('Local:            ' + `http://localhost:${port}/`.yellow);
console.log();
console.log();
console.log('Note that this is not a development build and it doesn\'t auto-refresh.');
console.log('To see changes applied you have to start ' + 'npm run start'.cyan + ' again');

app.listen(port)
