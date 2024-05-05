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


const getAllTeams = asyncHandler(async (req,res) => {
try{
    console.log("here");
   const allTeam = await Team.find();
   res.status(200).json(allTeam);
}
catch(e)
{
    console.log("error in getting tems",e);
    res.status(400);
    throw new Error ("error in getting tems!");
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

//@desc Fetch teams by member ID
//@route GET /api/teams/member/:memberId
//@access private
const getTeamsByMemberId = asyncHandler(async (req, res) => {
    const memberId = req.params.memberId;
    
    if(!memberId) {
        res.status(400);
        throw new Error("Member ID is required");
    }

    try {
        const teams = await Team.find({ "members.id": memberId });

        // if (teams.length === 0) {
        //     res.status(404).json({ message: "No teams found for this member." });
        // } else {
        //     res.json(teams);
        // }
        res.status(200).json(teams);
    } catch (error) {
        console.error("Error fetching teams by member ID: ", error);
        res.status(500).throw(new Error("Error fetching teams by member ID"));
    }
});

//@desc Fetch teams by member ID
//@route GET /api/teams/members/:teamId
//@access private
const getTeamMembers = asyncHandler( async(req,res) => {
  const teamId = req.params.teamId;
  if(!teamId)
  {
    res.status(400);
    throw new Error("team id is required!");
  } 

  try {

    const team = await Team.findById(teamId);
    if(team)
    {
        res.status(200);
        res.json(team.members);
    }
    else{
        res.status(404),json({message: "team not found!"});
    }
  }
  catch(e)
  {
    res.status(400);
    throw new Error("error in getting members",e);
  }
});
//@desc Add a member to a team
//@route PATCH /api/teams/:teamId/members/add
//@access private
const addMemberToTeam = asyncHandler(async (req, res) => {
    const { teamId } = req.params;
    const { memberId, memberName } = req.body;

    if (!memberId || !memberName) {
        res.status(400);
        throw new Error("Member ID and name are required");
    }

    const team = await Team.findById(teamId);
    if (!team) {
        res.status(404);
        throw new Error("Team not found");
    }

    // Check if member already exists in the team
    const isMemberExists = team.members.some(member => member.id === memberId);
    if (isMemberExists) {
        res.status(400);
        throw new Error("Member already exists in the team");
    }

    team.members.push({ id: memberId, name: memberName });
    await team.save();

    res.status(200).json({ message: "Member added successfully", team });
});

//@desc Remove a member from a team
//@route PATCH /api/teams/:teamId/members/remove
//@access private
const removeMemberFromTeam = asyncHandler(async (req, res) => {
    const { teamId } = req.params;
    const { memberId } = req.body;

    if (!memberId) {
        res.status(400);
        throw new Error("Member ID is required");
    }

    const team = await Team.findById(teamId);
    if (!team) {
        res.status(404);
        throw new Error("Team not found");
    }

    // Check if the member exists in the team
    const isMemberExists = team.members.some(member => member.id === memberId);
    if (!isMemberExists) {
        res.status(404);
        throw new Error("Member does not exist in the team");
    }

    team.members = team.members.filter(member => member.id !== memberId);
    await team.save();

    res.status(200).json({ message: "Member removed successfully", team });
});

module.exports = {newTeam, updateTeam, deleteAllTeam, getTeamsByMemberId, addMemberToTeam, removeMemberFromTeam, getAllTeams, getTeamMembers}