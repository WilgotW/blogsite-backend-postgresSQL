const client = require("../database");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

router.post("/register", async (req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    //check if email exists
    const data = await client.query(`select * from users where email = '${newUser.email}'`);
    if(data.rowCount === 0){

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newUser.password, salt);

        const rows = await client.query(`insert into users(name, email, password, id) values ('${newUser.name}', '${newUser.email}','${hashPassword}', '${uuid.v4()}')`);
        console.log(rows)
        res.send(newUser);
    }else{
        res.status(400).send("email already exists");
    }
})

router.post("/login", async (req, res) =>{
    const user = {
        email: req.body.email,
        password: req.body.password,
    }

    //check if user exist
    const data = await client.query(`select * from users where email = '${user.email}'`);

    if(data.rowCount === 0) {
        res.status(400).send("couldn't find user");   
    }else{
        const validPassword = await bcrypt.compare(user.password, data.rows[0].password);
        if(!validPassword) return res.status(400).send("Invalid password");
        
        const token = jwt.sign({_id: data.rows[0].id}, process.env.TOKEN_SECRET);
        res.json(token);
    }

})

module.exports = router;