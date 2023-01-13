const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const client = require("./database");

//routes
const blogRoute = require("./routes/blogRoutes");
const userRoute = require("./routes/userRoutes");

//route middleware
app.use(cors());
app.use(express.json());

//middleware
app.use("/api/blog", blogRoute);
app.use("/api/user", userRoute);

async function init(){
    await client.connect();
}
init();

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
