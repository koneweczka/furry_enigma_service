const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.json());

// to jest tylko by spr czy serwer działa
app.get('/', (req, res) => {
    res.send('Welcome to learn backend with express on port ' + port)
});

app.listen(port);

// tu mam zmienną na sztywno na razie:
let list = [
    {id: 0, summary: "Posprzątać kuchnię."},
    {id: 1, summary: "Wynieść śmieci."}
];

// To pobiera całą listę zadań:
app.get('/list', (req, res) => {
    res.send(list);
});

// To pobiera pojedyncze zadanie:
app.get('/list/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = list.find(task => task.id === id);
    res.send(task);
});

// To tworzy nowe id dla dodawanego zadania:
function newID() {
    let i = 0;
    // in zwraca index tablicy, of zwraca wartosc
    for (task of list) {
        console.log(task)
        // to sie iteruje poki sie nie przerwie
        if (task.id > i) {
            i = task.id
        } 
    }
    return i+1
};

// To ma dodawać do listy:
app.post('/list', (req, res) => {
    console.log(req.body);
    const id = newID();
    list.push({id: id, summary: req.body.summary});
    res.send(list);
});

// To jest na usuwanie:
app.delete('/list/:id', (req, res) => {
    const id = Number(req.params.id);
    const taskIndex = list.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        // to jest zabezpieczenie na index = -1
        res.status(404).send('Index not found.')
    } else {
        list.splice(taskIndex, 1);
        res.send(list);
    }
    //nie moge robic senda i redirecta jednoczesnie
});

// Test na edycję:
app.put('/list/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = list.find(task => task.id === id);
    const taskIndex = list.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        // to jest zabezpieczenie na index = -1
        res.status(404).send('Index not found.')
    } else {
        task.summary = req.body.summary
        list.splice(taskIndex, 1, task);
        res.send(list);
    }
});