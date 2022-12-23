const express = require("express");
const path=require("path");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const cors=require("cors")
;
require("./db/mongoose.js");

const noteRouter = require("./routers/note-routers.js");
const userRouter = require("./routers/user-routers.js");

const app = express();


app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Allow-Methods", "*");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    next();
});
app.use(express.json());
app.use(noteRouter);
app.use(userRouter);


const port = process.env.PORT || 8000;
mongoose.connect(process.env.NOTER_MONGODB_URL)
.then(()=>console.log("connected to database"))
.then(()=>{
    app.listen(port,()=>{
        console.log("serevr started");
    })
});
