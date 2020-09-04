//* imports
const express = require('express');
const app = express();
const parser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

// todo app use
app.use(parser.json());
app.use(cors());

// connecting to db
MongoClient.connect('mongodb://localhost:27017')
    .then((client) => {
        const db = client.db('carbon');
        const usersCollection = db.collection('users');
        const usersRouter = createRouter(usersCollection);
        app.use('/api/users', usersRouter);
        const questionsCollection = db.collection('questions');
        const questionsRouter = createRouter(questionsCollection);
        app.use('/api/questions', questionsRouter);
    })
    .catch(console.err);

// todo running the server
app.listen(3000, function() {
    console.log(`Listening on port ${this.address().port}`);
});