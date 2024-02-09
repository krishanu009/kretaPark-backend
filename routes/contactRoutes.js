const express = require("express");

const router = express.Router();
const {getContacts,getContact, createNewContact, updateContact, deleteContact} = require("../controllers/contactController");


router.route("/").get(getContacts).post(createNewContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;
