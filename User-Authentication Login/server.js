const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');


const app = express();
app.use(express.json());
let users = []


app.get('/users', (req, res) => {
    try {
        users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    } catch (error) {
        console.error(error);
        res.status(500).send();
        return;
    }

    res.json(users);
});

app.post('/users', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword);
        const user = {name:  req.body.name, password: hashedPassword};

        
        // Read users from the file
        try {
            users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
        } catch (error) {
            // If file does not exist, ignore the error
            if (error.code !== 'ENOENT') {
                console.error(error);
                res.status(500).send();
                return;
            }
        }

        // Add the new user
        users.push(user);

        // Write the updated users back to the file
        try {
            fs.writeFileSync('users.json', JSON.stringify(users), 'utf8');
        } catch (error) {
            console.error(error);
            res.status(500).send();
            return;
        }

        res.status(201).send();
    } catch(error){
        res.status(500).send();
        console.log(error);
    }
});

app.post('/users/login', async (req, res) => {
    try {
        users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Cannot find users file');
        return;
    }
    const user = users.find(user => user.name = req.body.name);

    if(user ==null){
        return res.status(400).send('Cannot find user');
    }
    try{
      if( await bcrypt.compare(req.body.password, user.password)){
        res.send('Success');
      } else {
        res.send('Not Allowed');
      }
    } catch{
        res.status(500).send();
    }

});

app.listen(3000);