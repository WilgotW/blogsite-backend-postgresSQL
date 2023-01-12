const router = require("express").Router();

const client = require("./database");

client.connect();

client.query(`select * from citiesTable`, (err, res) => {
    if(!err) {
        console.log(res.rows);
    }else{
        console.log(err);
    }

    client.end;
})

router.post("/post", (req, res) => {
    
})


module.exports = router;