const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//To dodałam:
const db_mod = require('./db_mod/db.js');

const port = 3000;

app.use(bodyParser.json());

// to jest tylko by spr czy serwer działa
app.get('/', (req, res) => {
    res.send('Welcome to learn backend with express on port ' + port)
});

app.listen(port);

// Po co mi to teraz??
// To pobiera pojedyncze zadanie:
// app.get('/list/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const task = list.find(task => task.id === id);
//     res.send(task);
// });


// To pobiera całą listę zadań:
app.get('/list', async (req, res) => {
    const myList = await db_mod.showList();
        // nie moze byc z pluem bo to castuje a stringa
    res.send(myList);
});

// To ma dodawać do listy:
app.post('/list', async (req, res) => {
    console.log(req.body);
    // tu mam summary i ono musi być w actionie rpzeazane w api
    const summary = req.body.summary
    const newList = await db_mod.addTask(summary);
    res.send(newList);
});

// tego id sie ni daje w body
app.delete('/list/:id', async (req, res) => {
    const id = Number(req.params.id);
    let removeList = await db_mod.removeTask(id);
    res.send(removeList);
    //nie moge robic senda i redirecta jednoczesnie
});

// Test na edycję:
app.put('/list/:id', async (req, res) => {
    const id = Number(req.params.id);
    const summary = req.body.summary;
    const editedList = await db_mod.editTask(id, summary);
    res.send(editedList);
});