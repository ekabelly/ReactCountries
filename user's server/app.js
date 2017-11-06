const express = require('express');
const app = express();
var cors = require('cors')
const data = require('./data.json');

app.use(cors())
app.use(express.static('public'))

app.get('/data', (req, res) => {
  return res.json(imageUrlHost(data, req));
});

const imageUrlHost = (data, req) => data.map(x => {
  x.image = `http://${req.headers.host}/${x.avatar}`;
  return x;
});

app.listen(4500, () => console.log('server up'));