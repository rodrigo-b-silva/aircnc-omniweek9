const port = process.env.PORT || 3333;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/aircnc', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes.js'));

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})