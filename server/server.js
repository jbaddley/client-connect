const express =require("express");
const bodyParser = require('body-parser')
const companies = require("./companies.json")
const fs = require("fs")
var cors = require('cors');

const app = express();
const port = 8080;
app.use(cors())
app.use(bodyParser.json())

const entityMap = {
    users: './users.json',
    connectedCompanies: './connectedCompanies.json'
}

function getEntity(entityName) {
    const path = entityMap[entityName]
    const entityJSON = fs.readFileSync(path)
    return JSON.parse(entityJSON);
}

app.post( "/sign-up", ( req, res ) => {
    const users = getEntity('users');
    const signUpForm = req.body;

    const { password, confirmPassword, ...user } = signUpForm;
    const hash = btoa(`${user.username}${password}`);
    users[hash] = user

    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2))

    res.send({
        data: user,
        status: 'success'
    });
} );

app.post("/login", (req, res) => {
    const users = getEntity('users');

    const { username, password } = req.body
    const hash = btoa(`${username}${password}`);
    const foundUser = users[hash];

    res.send({
        data: foundUser,
        status: !!foundUser ? 'success' : "error",
        message: !!foundUser ? "" : "Could not find user"
    });
})

app.get("/connected-companies/:username", (req,res) => {
    const { username } = req.params;
    const connectCompanies = getEntity('connectedCompanies')

    res.send({
        data: connectCompanies[username] || [],
        status: "success"
    });
})

app.post("/connected-companies/:username/:companyId", (req,res) => {
    const { username, companyId } = req.params;

    const connectedCompanies = getEntity('connectedCompanies')

    connectedCompanies[username] = connectedCompanies[username] || [];
    connectedCompanies[username].push(+companyId)

    fs.writeFileSync('./connectedCompanies.json', JSON.stringify(connectedCompanies, null, 2))

    res.send({
        data: connectedCompanies[username] || [],
        status: "success"
    });
})

app.delete("/connected-companies/:username/:companyId", (req,res) => {
    const { username, companyId } = req.params;

    const connectedCompanies = getEntity('connectedCompanies')

    connectedCompanies[username] = connectedCompanies[username] || [];
    
    connectedCompanies[username].splice(connectedCompanies[username].indexOf(+companyId), 1)

    fs.writeFileSync('./connectedCompanies.json', JSON.stringify(connectedCompanies, null, 2))

    res.send({
        data: connectedCompanies[username] || [],
        status: "success"
    });
})


app.get("/companies", (req,res) => {
    res.send({
        data: companies,
        status: "success"
    });
})

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );