const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const {newScript, allScript, updateScript, findOrCreateScript, deleteContact, allPostByTeamID } = require('../controllers/scriptController');
const router = express.Router();


router.post("/new",validateToken, newScript).post("/findOrCreateScript",validateToken, findOrCreateScript).get("/:teamId",validateToken,allPostByTeamID ).get("/all",validateToken, allScript);
router.put("/update/:id",validateToken, updateScript);
router.delete("/",validateToken,deleteContact);
module.exports = router;

