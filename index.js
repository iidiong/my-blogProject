const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const newPostController = require("./controllers/newPost")

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true }, { useUnifiedTopology: true } );

// BlogPost.create({
//     title: "The Mythbuster's Guide to Saving Money on Energy Bills",
//     body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this"
// }, (err, blogpost) => console.log( err));

// BlogPost.find({}, (err, blogpost) => console.log(err, blogpost));

const validateMiddleWare = (req, res, next) => {
    if(req.files == null || req.body.title == null || req.body.body == null){
    // if(req.body.title == null || req.body.body == null){
        return res.redirect("/posts/new");
    }
    next();
}

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use("/posts/store", validateMiddleWare);

app.get("/", async(req, res) => {
    const blogposts = await BlogPost.find({})
    res.render("index", {blogposts});
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/post", (req, res) => {
    res.render("post");
});
app.get("/post/:id", async(req, res) => {
    console.log(req.params)
    const blogpost = await BlogPost.findById(req.params.id);
    console.log(blogpost)
    res.render("post", {blogpost});
});

app.get("/posts/new", newPostController);

// app.post("/posts/store", (req, res) => {
    
//     BlogPost.create(req.body, (err, blogpost) => {
//         console.log(err ? err : "Success");
//         res.redirect("/");
//     });
// });


app.post("/posts/store", async(req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, "public/img", image.name), async(err) => {
        await BlogPost.create({ ...req.body, image:"/img/"+image.name
    })
        res.redirect("/");
    })
    
});

app.listen(4000, () => console.log("App listening on port 4000"))