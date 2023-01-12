const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const dotenv = require("dotenv");

//routes
const blogRoute = require("./routes/blogRoutes");

//middleware
app.use("/api/blog", blogRoute)
//route middleware
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
