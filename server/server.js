const path = require('path');
const result = require('dotenv').config({
    path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
});

if (result.error) {
    throw new Error(result.error);
}

const express = require('express');
const pino = require('pino-http');
const userRoute = require('./routes/users');
const mongoose = require('mongoose');

const app = express();

app.use(require('cors')());
app.use(pino({ level: process.env.LOG_LEVEL }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));


app.use('/users', userRoute);
app.use('/reviews', require('./routes/reviews'));
app.use('/toilets', require('./routes/toilets'));

const HOST = process.env.HOST || "127.0.0.1";
const PORT = +process.env.PORT || 5000;

app.listen(PORT, HOST, () => console.log(`Server running on port ${PORT}`))

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => 
//     app.listen(PORT, HOST, () => console.log(`Server running on port ${PORT}`))
// ).catch((error) => console.log(error));

// mongoose.set('useFindAndModify', false);