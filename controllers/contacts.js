const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET all contacts
async function getAllContacts(req, res) {
  try {
    const db = getDb();
    const contacts = await db.collection("contacts").find().toArray();

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET one contact by ID
async function getContactById(req, res) {
  try {
    const db = getDb();

    const contact = await db.collection("contacts").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// POST create a new contact
async function createContact(req, res) {
  try {
    const db = getDb();

    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await db.collection("contacts").insertOne(newContact);

    res.status(201).json({
      message: "Contact created successfully",
      id: result.insertedId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// PUT update an existing contact
async function updateContact(req, res) {
  try {
    const db = getDb();

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await db.collection("contacts").replaceOne(
      { _id: new ObjectId(req.params.id) },
      updatedContact
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE a contact
async function deleteContact(req, res) {
  try {
    const db = getDb();

    const result = await db.collection("contacts").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};