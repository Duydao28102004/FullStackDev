const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');

const authentication = require('./routes/authentication');
const user = require('./routes/user');
const post = require('./routes/post');
const reaction = require('./routes/reaction');
const friendsRequest = require('./routes/friendsRequest');
const comment = require('./routes/comment');
const search = require('./routes/search');
const group = require('./routes/group');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

app.use('/', authentication);
app.use('/', user);
app.use('/', post);
app.use('/', reaction);
app.use('/', friendsRequest);
app.use('/', comment);
app.use('/', search);
app.use('/', group);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});