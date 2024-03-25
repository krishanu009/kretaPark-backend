const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');

const {newTeam,updateTeam,deleteAllTeam} = require('../controllers/teamController');
const router = express.Router();
 router.post("/new",validateToken, newTeam).delete("/deleteAll",validateToken,deleteAllTeam);
 router.put("/update/:id",validateToken, updateTeam);
 module.exports = router;