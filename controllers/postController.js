const asyncHandler =  require("express-async-handler");
const Post = require("../models/postModel");

//@desc create a new post 
//@route POST /api/post/new
//@access private 
const newPost =  asyncHandler(async (req, res) => {
    const {title, scheduled, scriptId, date, status,assigned } = req.body;
    console.log(req.body);
    if(!title || !scriptId) 
    {
        res.status(400);
        throw new Error("All the fileds are mendatory!");
    }
try{

    const post = await Post.create({
        title,
        scheduled,
        scriptId,
        date,
        status,
        assigned

    });
    if(post)
    {
        res.status(200).json(post);
    }
    else{
        res.status(400);
        throw new Error("Post data is not valid!");
    }

}
catch(error)
{
console.log("error",error);
res.status(400);
        throw new Error("Post data is not valid!");
}
   
});

//@desc get all post 
//@route POST /api/post/all
//@access private 
const allPost =  asyncHandler(async (req, res) => {
    const allPosts =  await Post.find();
    res.status(200).json(allPosts);
});

//@desc update a post 
//@route POST /api/post/update/:id
//@access private 
const updatePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404);
        throw new Error(" Post not found")
    }

});

module.exports = {newPost, allPost, updatePost}