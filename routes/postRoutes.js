const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const {newPost, allPost, updatePost, deleteAllPost} = require('../controllers/postController');
const router = express.Router();

router.post("/new",validateToken, newPost).get("/all",validateToken, allPost).delete("/deleteAll",validateToken, deleteAllPost);;
router.put("/update/:id", validateToken, updatePost);
module.exports =  router;