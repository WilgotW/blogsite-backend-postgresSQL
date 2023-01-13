const client = require("../database");
const router = require("express").Router();

router.post("/register", async (req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    
    const rows = await client.query(`insert into users(name, email, password) values ('${newUser.name}', '${newUser.email}','${newUser.password}')`);
    console.log(rows)
    res.send(newUser);
})

module.exports = router;