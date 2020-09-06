const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const newPostController = require("./controllers/newPost")
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const validateMiddleWare = require("./middleware/validationMiddleware")

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true }, { useUnifiedTopology: true } );

// BlogPost.create({
//     title: "The Mythbuster's Guide to Saving Money on Energy Bills",
//     body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this"
// }, (err, blogpost) => console.log( err));

// BlogPost.find({}, (err, blogpost) => console.log(err, blogpost));


const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use("/posts/store", validateMiddleWare);

app.get("/", homeController);

app.get("/post/:id", getPostController);

app.get("/posts/new", newPostController);

app.post("/posts/store", storePostController);

app.listen(4000, () => console.log("App listening on port 4000"))