//connect db 
const slugify = require("slugify")
const Blogs = require("../models/blogs")
const { v4: uuidv4} = require("uuid")
//save data
exports.create = async (req, res) => {
    const {title,content,author} = req.body
    let slug = slugify(title)

    if(!slug)slug=uuidv4();

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

exports.getAllblogs = async (req,res) =>{
    const getblogs = await Blogs.find({})
    try{
        res.json(getblogs)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.singleBlog = async (req,res) =>{
    const {slug} = req.params
    const blog = await Blogs.findOne({slug})
    try{
        res.json(blog)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.remove = async (req,res) =>{
    const {slug} = req.params
    try{
        await Blogs.findOneAndRemove({slug})
        res.json({Status:"Success"})
    }catch(err){
        res.status(400).jsn({error:err.message})
    }
}

exports.update = async (req, res) =>{
    const {slug} = req.params
    const {title,content,author} = req.body
    try{
        const find_update = await Blogs.findOneAndUpdate({slug},{title,content,author},{new:true})
        res.json(find_update)
    }catch(err){
        res.status(400).jsn({error:err.message})
    }
    
}