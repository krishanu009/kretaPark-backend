const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');

const {newTeam, updateTeam, deleteAllTeam, getTeamsByMemberId, addMemberToTeam, removeMemberFromTeam, getAllTeams,getTeamMembers} = require('../controllers/teamController');
const router = express.Router();
 router.get("/myTeams/:memberId",validateToken,getTeamsByMemberId).get("/allTeam",validateToken,getAllTeams).get("/member/:teamId",validateToken,getTeamMembers).post("/new",validateToken, newTeam).delete("/deleteAll",validateToken,deleteAllTeam);
 router.put("/update/:id",validateToken, updateTeam).post("/addMember",validateToken,addMemberToTeam);
 module.exports = router;