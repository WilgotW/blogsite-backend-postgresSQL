const router = require("express").Router();
const verify = require("../routes/verifyToken");
const client = require("../database");
const jwt = require("jsonwebtoken");

router.post("/post", verify, async (req, res) => {
    const decoded = jwt.verify(req.headers.token, process.env.TOKEN_SECRET); 
     
    const blog = {
        title: req.body.title,
        content: req.body.content,
        userId: decoded._id
    }

    if(!blog.title || !blog.content || !blog.userId){
        return res.status(400).send("invalid input");
    }

    const data = await client.query(`insert into blogs(title, content, userId) values ('${blog.title}', '${blog.content}', '${blog.userId}')`);
    res.send("created blog");
})

module.exports = router;