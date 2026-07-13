const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const validateContact = (contact) => {
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "favoriteColor",
    "birthday"
  ];

  const missingFields = requiredFields.filter((field) => {
    return (
      contact[field] === undefined ||
      contact[field] === null ||
      String(contact[field]).trim() === ""
    );
  });

  return missingFields;
};

const getAll = async (req, res) => {
  try {
    const contacts = await mongodb
      .getDb()
      .collection("contacts")
      .find()
      .toArray();

    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Error retrieving contacts:", error);

    return res.status(500).json({
      error: "An error occurred while retrieving contacts."
    });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        error: "Invalid contact ID."
      });
    }

    const contact = await mongodb
      .getDb()
      .collection("contacts")
      .findOne({ _id: new ObjectId(contactId) });

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found."
      });
    }

    return res.status(200).json(contact);
  } catch (error) {
    console.error("Error retrieving contact:", error);

    return res.status(500).json({
      error: "An error occurred while retrieving the contact."
    });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const missingFields = validateContact(contact);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "All contact fields are required.",
        missingFields
      });
    }

    const response = await mongodb
      .getDb()
      .collection("contacts")
      .insertOne(contact);

    return res.status(201).json({
      message: "Contact created successfully.",
      id: response.insertedId
    });
  } catch (error) {
    console.error("Error creating contact:", error);

    return res.status(500).json({
      error: "An error occurred while creating the contact."
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        error: "Invalid contact ID."
      });
    }

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const missingFields = validateContact(contact);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "All contact fields are required.",
        missingFields
      });
    }

    const response = await mongodb
      .getDb()
      .collection("contacts")
      .updateOne(
        { _id: new ObjectId(contactId) },
        { $set: contact }
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({
        error: "Contact not found."
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Error updating contact:", error);

    return res.status(500).json({
      error: "An error occurred while updating the contact."
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        error: "Invalid contact ID."
      });
    }

    const response = await mongodb
      .getDb()
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(contactId) });

    if (response.deletedCount === 0) {
      return res.status(404).json({
        error: "Contact not found."
      });
    }

    return res.status(200).json({
      message: "Contact deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting contact:", error);

    return res.status(500).json({
      error: "An error occurred while deleting the contact."
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};