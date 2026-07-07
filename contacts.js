const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

// GET all contacts
router.get("/", contactsController.getAllContacts);

// GET one contact
router.get("/:id", contactsController.getContactById);

// POST
router.post("/", contactsController.createContact);

// PUT
router.put("/:id", contactsController.updateContact);

// DELETE
router.delete("/:id", contactsController.deleteContact);

module.exports = router;