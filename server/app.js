const mongodb = require('mongodb');
const client = mongodb.MongoClient;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const url = "mongodb://127.0.0.1:27017/library";
const dbName = "library";

const bookCollectionName = 'book';

app.get('/book', (req, res) => {
    client.connect(url, async function (err, client) {
        const db = client.db(dbName);
        const booksCollection = db.collection(bookCollectionName);
        let books = await booksCollection.find({}).toArray();

        res.send(books)
    })
});

app.post('/book', (req, res) => {
    client.connect(url, async function (err, client) {
        const db = client.db(dbName);
        const booksCollection = db.collection(bookCollectionName);
        await booksCollection.insertOne(req.body);
        res.send('ok')
    })
});

app.delete('/book/:id', (req, res) => {
    client.connect(url, async function (err, client) {
        const db = client.db(dbName);
        const booksCollection = db.collection(bookCollectionName);
        await booksCollection.removeOne({_id: new mongodb.ObjectID(req.params.id)});
        res.send('ok')
    })
});

app.get('/', (req, res) => {
    res.send("ok")
});

app.listen(3000, () => console.log(`Node js server started`));