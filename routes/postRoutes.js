const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const {newPost, allPost, updatePost, deleteAllPost, allPostByCompanyID} = require('../controllers/postController');
const router = express.Router();

router.post("/new",validateToken, newPost).get("/all",validateToken, allPost).delete("/deleteAll",validateToken, deleteAllPost)
.get("/all/:companyId",validateToken, allPostByCompanyID);
router.put("/update/:id", validateToken, updatePost);
module.exports =  router;