const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");


//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  console.log("called");
  res.status(200).json(contacts);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json(contact);
  } catch (error) {
    res.status(404);
    throw new Error("Contact not found");
  }
});
//@desc Create New contacts
//@route POST /api/contacts
//@access public
const createNewContact =  asyncHandler(async (req, res) => {
    console.log("The body is:",req.body)
    const {name, email, phone, address} = req.body;

    if(!name || !email || !phone || !address)
    {
        res.status(400);
        throw new Error("All Fileds are mandatory");
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      address
    })

  res.status(200).json(contact);
});
//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async  (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(404);
    throw new Error("Contact not found");
  }
  
});
//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async  (req, res) => {

  try {
    const contact = await Contact.findById(req.params.id);
    await Contact.deleteMany();
    res.status(200).json("deleted all contacts");
  } catch (error) {
    res.status(404);
    throw new Error("Contact not found");
  }
  

});

module.exports = { getContacts,getContact, createNewContact, updateContact, deleteContact };
