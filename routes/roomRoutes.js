const express = require("express");

const router = express.Router();
const {getAllRoom,getRoom, createNewRoom, addMemberToRoom, findRoomsByMemberId } = require("../controllers/roomController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/").get(getAllRoom).post(createNewRoom);
// router.route("/:id").get(getRoom);
// router.route("/addNew").post(addMemberToRoom);

router.get("/:id", validateToken, getRoom);
router.post("/addNew",validateToken, addMemberToRoom);
router.get("/myRooms/:memberId",validateToken, findRoomsByMemberId);

//

// router.post("/new",validateToken, newScript).post("/findOrCreateScript",validateToken, findOrCreateScript).get("/all",validateToken, allScript);
// router.put("/update/:id",validateToken, updateScript);
// router.delete("/",validateToken,deleteContact);

module.exports = router;