const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const dotenv = require("dotenv");
const client = require("./database");

dotenv.config();

//routes
// const blogRoute = require("./routes/blogRoutes");
const userRoute = require("./routes/userRoutes");
//middleware
// app.use("/api/blog", blogRoute);
//route middleware
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);

async function init(){
    await client.connect();
}
init();

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
