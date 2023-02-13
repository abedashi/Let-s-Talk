const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');

const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => console.log(`Server started on port ${port.yellow}`));
