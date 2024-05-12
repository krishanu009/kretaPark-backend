const asyncHandler = require("express-async-handler");
const Script = require("../models/scriptModel");



//@desc create a new post 
//@route POST /api/script/new
//@access private 
const newScript = asyncHandler( async (req, res) => {
    const {title, data, active} = req.body;

    if(!title || !data || !active || !teamId) 
    {
        res.status(400);
        throw new Error('All the fields are mendatory');
    }

    const script = await Script.create({
        title,
        data,
        active,
        teamId
    });

    if(script)
    {
        res.status(200).json({_id:script.id, title:script.title,
        data: script.data, active:script.active })
    }
    else{
        res.status(400);
        throw new Error("Script data is not valid ");

    }

})
//@desc find or create a script 
//@route POST /api/script/findOrCreate
//@access private 
const findOrCreateScript = asyncHandler( async (req, res) => {
    const {_id, title, data, active} = req.body;

    if(!_id || !title || !data || !active || !teamId) 
    {
        res.status(400);
        throw new Error('All the fields are mendatory');
    }
    try {
        const script = await Script.findById(_id);
        if(script)
        {
            res.status(200).json(script);

        }
        else{
            const newScript = await Script.create({
                _id,
                title,
                data,
                active,
                teamId
            });
        
            if(newScript)
            {
                res.status(200).json({_id:newScript._id, title:newScript.title,
                data: newScript.data, active:newScript.active })
            }
            else{
                res.status(400);
                throw new Error("Script data is not valid ");
        
            }
        }
        
        res.status(200).json(updatedScript);
    } catch (error) {
        res.status(404);
        throw new Error("script not found")
    }


    const script = await Script.create({
        title,
        data,
        active
    });

    if(script)
    {
        res.status(200).json({_id:script.id, title:script.title,
        data: script.data, active:script.active })
    }
    else{
        res.status(400);
        throw new Error("Script data is not valid ");

    }

})

//@desc get all post 
//@route POST /api/script/all
//@access private 
const allScript =  asyncHandler(async (req, res) => {
    const allScript =  await Script.find();
    res.status(200).json(allScript);
});

//@desc get all script by team Id
//@route POST /api/script/all/:teamId
//@access private
const allPostByTeamID = asyncHandler(async (req, res) => {
    const { teamId } = req.params;
    if (!teamId) {
      res.status(400);
      throw new Error("All the fileds are mendatory!");
    }
    try {
      const scripts = await Script.find({ teamId });
  
    //   if (!scripts) {
    //     return res
    //       .status(404)
    //       .json({ message: "No script found for the given company ID" });
    //   }
  
      res.status(200).json(scripts);
    } catch (error) {
      console.error("Error fetching scripts:", error);
      res.status(500).json({ message: "Server error" });
    }
   
  });

//@desc update a post 
//@route POST /api/script/update/:id
//@access private 

const updateScript = asyncHandler(async (req, res) => {
    try {
        const script = await Script.findById(req.params.id);
        const updatedPost = await Script.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404);
        throw new Error("script not found")
    }

});

//@desc Delete contacts
//@route DELETE /api/script
//@access private
const deleteContact = asyncHandler(async  (req, res) => {

    try {

      await Script.deleteMany();
      res.status(200).json("deleted all scripts");
    } catch (error) {
      res.status(404);
      throw new Error("Script not found");
    }
    
  
  });
 module.exports = {newScript, allScript, updateScript, findOrCreateScript, deleteContact, allPostByTeamID }