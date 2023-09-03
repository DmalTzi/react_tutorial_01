//connect db 
const slugify = require("slugify")
const Blogs = require("../models/blogs")
//save data
exports.create = async (req, res) => {
    const {title,content,author} = req.body
    const slug = slugify(title)

   try{ //validate
    switch (true) {
        case !title:
            return res.status(400).json({error:"please input title"})    
        case !content:
            return res.status(400).json({error:"please input content"})
    }
    //save data
    const blog = await Blogs.create({title,content,author,slug})
    res.json(blog)
    }
    catch (err) {
        res.status(400).json({error:err.message})
    }

}

