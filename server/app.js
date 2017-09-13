const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const todos = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];
// add your code here
//Respond with generic object.
app.get('/', (req, res) => {
    res.send({status: 'OK'});
});
//Response with all items in the dataset
app.get('/api/TodoItems', (req, res) => {
    res.send(todos);
});
app.get('/api/TodoItems/:number', (req, res) => {  
    todos.forEach(function(todo) {
    if(todo.todoItemId === parseInt(req.params.number)){
    res.send(todo);
        }
    });

});
app.post('/api/TodoItems/', (req, res) => {
    var newDo = req.body;
    newDo.todoItemId = Number();
    newDo.name = '';
    newDo.priority = Number();
    newDo.completed = Boolean();
    todos.push(newDo);
    console.log(newDo);
    res.status(201).json(newDo);
});    


//Use a route parameter to respond with a single item with a matching toItemId
app.post("/api/TodoItems/", (req, res, next) => {
    todos.push(req.body);
    console.log(req.body);
    res.status(201).json(req.body);
});

app.delete("/api/TodoItems/:number", (req, res) => {
    todos.forEach(function(todo, index) {
    if (todo.todoItemId === parseInt(req.params.number)) {
    let remove = todos.splice(index, 1);
    console.log({ remove });
    return res.json(remove[0]);
        }
    });
    res.status(200).send("IT WORKS");
});


module.exports = app;