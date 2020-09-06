const BlogPost = require("../models/blogPost.js");
const path = require("path");

module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, "..", "public/img", image.name), async(err) => {
        await BlogPost.create({...req.body, image:"/img/"+image.name})
        res.redirect("/");
    });
}