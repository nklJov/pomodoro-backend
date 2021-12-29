const express = require('express');
const cors = require('cors');
const dbUserFunctions = require("./db/user")
const dbFunctions = require("./db/todos")
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.post('/createUser', async (req, res) => {
    const newUser = req.body.user;
    try {
        await dbUserFunctions.createUser(newUser);
        res.status(200).json({message: "Uspesno ste kreirali nalog"})
    } catch(err) {
        console.log("Doslo je do greske prilikom dodavanja novog korisnika ", err)
        res.status(500)
    }
})

app.get('/todos', async (req, res) => {
    const userId = req.query.userId
    let todos = await dbFunctions.getAllToDos(userId)
    res.status(200).json({todoList: todos})
})

app.post('/todos', async (req, res) => {
    const newTodo = req.body.newTodo;
    try {
        await dbFunctions.createToDo(newTodo);
        res.status(200).json({newTodo: newTodo})
    } catch(err) {
        console.error("Doslo je do greske prilikom upisivanja ", err)
        res.status(500);
    }
})

app.post('/login', async (req, res) => {
    const user = req.body.user;
    try {
        let dbUser = await dbUserFunctions.getOneUser(user);

        if(dbUser.length == 0){
            res.status(200).json({message: "Korisnik ne postoji", loged: false})
        }

        if(user.password === dbUser[0].password) {
            res.status(200).json({message: "Uspesno ste se ulogvali", user: dbUser[0], loged: true})
        } else {
            res.status(200).json({message: "Pogresna lozinka", loged: false})
        }

        res.status(200)
    } catch(err) {
        console.log("Doslo je do greske prilikom dodavanja novog korisnika ", err)
        res.status(500)
    }
})


app.listen(process.env.PORT || 3000, () => console.log("server is runniog on port 5000"));