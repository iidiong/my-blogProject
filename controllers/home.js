const BlogPost = require("../models/blogPost.js");

module.exports = async(req, res) => {
    const blogposts = await BlogPost.find({});
    res.render("index", {blogposts});
}