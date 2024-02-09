const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const {newPost, allPost, updatePost} = require('../controllers/postController');
const router = express.Router();

router.post("/new",validateToken, newPost).get("/all",validateToken, allPost);
router.put("/update/:id", validateToken, updatePost);
module.exports =  router;