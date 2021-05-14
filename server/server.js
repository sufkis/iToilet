const path = require('path');
const result = require('dotenv').config({
  path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
});

if (result.error) {
  throw new Error(result.error);
}

const express = require('express');
const pino = require('pino-http');

const app = express();

app.use(pino({ level: process.env.LOG_LEVEL }));
app.use(express.json());
app.use(require('cors')());

app.use('/reviews', require('./routes/reviews'));
// app.use('/toilets', require('./routes/toilets'));

const host = process.env.HOST;
const port = +process.env.PORT;

app.listen(port, host, () => {
    console.log(`server is listening at http://${host}:${port}`);
});
