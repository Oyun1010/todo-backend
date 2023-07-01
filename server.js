const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();
require('./connected_db');

const db = require('./database');

app.use(cors({ origin: '*' }));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', db);

app.listen(process.env.PORT, () => {
    console.log("Server started on port ", process.env.PORT);
});