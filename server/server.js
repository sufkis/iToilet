require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const userRoute = require('./routes/users');
const mongoose = require('mongoose');


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/users', userRoute);



const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => 
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
).catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);

