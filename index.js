const ystocks = require('yahoo-stocks');
const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');
const fs = require('fs');
const port = 5005;

const fileOptions = { encoding: 'utf-8' };
const fetchOptions = { interval: '1d', range: '5y' };
const cacheDir = './.cache';

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use('/', express.static('client/build'));

app.get('/rest', function (req, res) {
//  var reqBody = bodyParser.raw();
//  const instrument = reqBody.instrument;
  const instrument = req.query.instrument;
  if (!instrument) {
    res.send('');
    return;
  }

  const filePath = `${cacheDir}/${instrument}`;
  if (fs.existsSync(filePath)) {
    res.send(fs.readFileSync(filePath, fileOptions));
    return;
  }

  ystocks.history(instrument, fetchOptions).then(response => {
    const adjustedResponse = response;
    adjustedResponse.records = adjustedResponse.records.map((rec) => {
      const { time, ...rest } = rec;
      return {
        date: time,
        ...rest
      }
    });
    const responseAsString = JSON.stringify(adjustedResponse);
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, 0744);
    }
    fs.writeFileSync(filePath, responseAsString, fileOptions);
    res.send(responseAsString);
    return;
  });
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
