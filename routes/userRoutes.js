const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const {loginUser, registerUser, currentUser, getUserInfo, updateLastLogin} = require('../controllers/userController');
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.get("/current", validateToken, currentUser).get("/userInfo/:id",validateToken, getUserInfo).put("/updateLastLogin",validateToken,updateLastLogin);

module.exports = router;