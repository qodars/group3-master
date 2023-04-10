const express = require("express");
const port = 8000;

const app = express();
app.use(express.json());

//db
const db = require("./models");
db.sequelize.sync({ alter: true});

//route
const { authRoutes } = require("./routes");

//middleware
app.use("/auth", authRoutes);

app.listen(port, function(){
    console.log(`server is running ${port}`);
})