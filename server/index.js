const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');

const authentication = require('./routes/authentication');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

app.use('/', authentication);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});