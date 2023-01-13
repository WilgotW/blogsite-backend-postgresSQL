const router = require("express").Router();
const verify = require("../routes/verifyToken");
const client = require("../database");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

router.get("/my-posts", verify, async (req, res) => {
    const decoded = jwt.verify(req.headers.token, process.env.TOKEN_SECRET); 
    const userId = decoded._id;

    if(!userId){
        return res.status(400).send("couldn't find user");
    }

    const data = await client.query(`select * from blogs where userid = '${userId}'`);
    res.send(data.rows);
})


router.post("/post", verify, async (req, res) => {
    const decoded = jwt.verify(req.headers.token, process.env.TOKEN_SECRET); 
     
    const blog = {
        title: req.body.title,
        content: req.body.content,
        userId: decoded._id,
        likes: 0
    }

    if(!blog.title || !blog.content || !blog.userId){
        return res.status(400).send("invalid input");
    }

    const data = await client.query(`insert into blogs(title, content, userId, blog_id, likes) values ('${blog.title}', '${blog.content}', '${blog.userId}', '${uuid.v4()}', ${blog.likes})`);
    res.send(data.rows);
})

router.delete("/delete/:blogId", verify, async (req, res) => {
    if(!req.params.blogId){
        return res.status(400).send("invalid blog id");
    }

    const data = await client.query(`delete from blogs where blog_id = '${req.params.blogId}'`)

    res.send("deleted blog");
})

router.like("/like/:blogId", verify, async (req, res) => {
    if(!req.params.blogId){
        return res.status(400).send("invalid blog id");
    }

    const data = await client.query(`select * from blogs where blog_id = '${req.params.blogId}'`);
    const blogLikes = data.rows[0].likes;

    
})


module.exports = router;