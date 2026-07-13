const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAll);
/*
  #swagger.tags = ["Contacts"]
  #swagger.summary = "Get all contacts"
  #swagger.description = "Returns every contact stored in the contacts collection."

  #swagger.responses[200] = {
    description: "Contacts retrieved successfully.",
    schema: [{
      $ref: "#/definitions/ContactResponse"
    }]
  }

  #swagger.responses[500] = {
    description: "Server error."
  }
*/

router.get("/:id", contactsController.getSingle);
/*
  #swagger.tags = ["Contacts"]
  #swagger.summary = "Get a contact by ID"
  #swagger.description = "Returns one contact using its MongoDB ObjectId."

  #swagger.parameters["id"] = {
    in: "path",
    description: "MongoDB ObjectId of the contact.",
    required: true,
    type: "string"
  }

  #swagger.responses[200] = {
    description: "Contact retrieved successfully.",
    schema: {
      $ref: "#/definitions/ContactResponse"
    }
  }

  #swagger.responses[400] = {
    description: "Invalid contact ID."
  }

  #swagger.responses[404] = {
    description: "Contact not found."
  }

  #swagger.responses[500] = {
    description: "Server error."
  }
*/

router.post("/", contactsController.createContact);
/*
  #swagger.tags = ["Contacts"]
  #swagger.summary = "Create a new contact"
  #swagger.description = "Creates a contact. All five contact fields are required."

  #swagger.parameters["body"] = {
    in: "body",
    description: "Contact information.",
    required: true,
    schema: {
      $ref: "#/definitions/ContactInput"
    }
  }

  #swagger.responses[201] = {
    description: "Contact created successfully.",
    schema: {
      message: "Contact created successfully.",
      id: "64c285a87db761333e18d1d5"
    }
  }

  #swagger.responses[400] = {
    description: "One or more required fields are missing."
  }

  #swagger.responses[500] = {
    description: "Server error."
  }
*/

router.put("/:id", contactsController.updateContact);
/*
  #swagger.tags = ["Contacts"]
  #swagger.summary = "Update a contact"
  #swagger.description = "Updates the contact matching the supplied MongoDB ObjectId. All contact fields are required."

  #swagger.parameters["id"] = {
    in: "path",
    description: "MongoDB ObjectId of the contact to update.",
    required: true,
    type: "string"
  }

  #swagger.parameters["body"] = {
    in: "body",
    description: "Updated contact information.",
    required: true,
    schema: {
      $ref: "#/definitions/ContactInput"
    }
  }

  #swagger.responses[204] = {
    description: "Contact updated successfully."
  }

  #swagger.responses[400] = {
    description: "Invalid ID or missing required fields."
  }

  #swagger.responses[404] = {
    description: "Contact not found."
  }

  #swagger.responses[500] = {
    description: "Server error."
  }
*/

router.delete("/:id", contactsController.deleteContact);
/*
  #swagger.tags = ["Contacts"]
  #swagger.summary = "Delete a contact"
  #swagger.description = "Deletes the contact matching the supplied MongoDB ObjectId."

  #swagger.parameters["id"] = {
    in: "path",
    description: "MongoDB ObjectId of the contact to delete.",
    required: true,
    type: "string"
  }

  #swagger.responses[200] = {
    description: "Contact deleted successfully.",
    schema: {
      message: "Contact deleted successfully."
    }
  }

  #swagger.responses[400] = {
    description: "Invalid contact ID."
  }

  #swagger.responses[404] = {
    description: "Contact not found."
  }

  #swagger.responses[500] = {
    description: "Server error."
  }
*/

module.exports = router;