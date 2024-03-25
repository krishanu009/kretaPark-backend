const asyncHandler = require("express-async-handler");
const Team = require("../models/teamModel");


//@desc Create a new Team
//@Route POST /api/team/new
//@access private

const newTeam = asyncHandler(async (req, res) => {
    const {title, members} = req.body;
    console.log(req.body);
    if(!title)
    {
        res.status(400);
        throw new Error("name field is mandatory");
    }

    try{

        const team = await Team.create({
            title,
            members
        });
        if(team)
        {
            res.status(201).json({
                message: "Team created successfully",
                team: {
                    _id: team._id,
                    title: team.title, // Ensure title is included here
                    members: team.members,
                    createdAt: team.createdAt,
                    updatedAt: team.updatedAt
                }
            });
        }

    }
    catch(e)
    {
        console.log("error on creating team ",e);
        res.status(400);
        throw new Error ("Team is not created!");
    }
});

//@desc update a team 
//@route POST /api/team/update/:id
//@access private
const updateTeam = asyncHandler(async (req, res) => {

    try{
     
        const team = await Team.findById(req.params.id);
        const updatedTeam = await Team.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );

        res.status(200).json(updatedTeam);
    }
    catch(e)
    {
        console.log("error in updating team");
        res.status(404);
        throw new Error(" error in updating team ");
    }
});
const deleteAllTeam = asyncHandler(async (req, res) => {
    try {
       
        await Team.deleteMany();
        res.status(200).json("deleted all team");
      } catch (error) {
        res.status(404);
        throw new Error("team not found");
      }

});
module.exports = {newTeam, updateTeam, deleteAllTeam}