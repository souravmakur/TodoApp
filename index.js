const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // ✅ Serves HTML, CSS, JS files

let todos = [];

function findIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return i;
    }
    return -1;
}

function removeAtIndex(arr, index) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (i !== index) newArray.push(arr[i]);
    }
    return newArray;
}

app.get('/todos', (req, res) => {
    res.json(todos);
});

let ctr = 1;
app.post('/todos', (req, res) => {
    const newTodo = {
        id: ctr,
        title: req.body.title,
        description: req.body.description
    };
    ctr++;
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
        res.status(404).send();
    } else {
        todos = removeAtIndex(todos, todoIndex);
        res.status(200).send();
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});
