const client = require("../database");
const router = require("express").Router();

router.post("/register", async (req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    //check if email exists
    const data = await client.query(`select * from users where email = '${newUser.email}'`);
    if(data.rowCount === 0){
        const rows = await client.query(`insert into users(name, email, password) values ('${newUser.name}', '${newUser.email}','${newUser.password}')`);
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

    const data = await client.query(`select * from users where email = '${user.email}'`);

    if(data.rowCount === 0) {
        res.status(400).send("couldn't find user");   
    }else{
        res.send(user);
    }

})

module.exports = router;