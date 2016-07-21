const express = require('express');
const app = express();

const port = process.env.port || 8080;

const meetup = require('meetup-api')({
  key: process.env.MEETUP_API_KEY
});

const parameters = {
  group_urlname: process.env.MEETUP_GROUP_URL
}

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

app.get('*', function(req, res) {
  res.json({
    oops: 'Nothing to see here... yet.'
  });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});