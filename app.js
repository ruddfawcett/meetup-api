const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 8080));

const meetup = require('meetup-api')({
  key: process.env.MEETUP_API_KEY
});

const parameters = {
  group_urlname: process.env.MEETUP_GROUP_URL
}

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});


app.get('/v1/meetups/:status', function(req, res) {
  parameters.status = req.params.status;

  meetup.getEvents(parameters, function(err, resp) {
    if (err) {
      res.json(err);
      return;
    }

    res.json(resp);
  });
});

app.all('*', function(req, res) {
  res.json({
    oops: 'Nothing to see here... yet.'
  });
});

app.listen(app.get('port'), function () {
  console.log(`Example app listening on port ${app.get('port')}!`);
});
