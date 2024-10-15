require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn.js");
const cors = require("cors");
const router = require("./Routes/router.js");
const PORT = 4002;


// Middleware
app.use(express.json());
app.use(cors());
app.use(router);

app.get("/",(req,res)=>{
    res.send("Hello from server");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
