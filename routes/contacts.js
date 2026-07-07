const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");

const router = express.Router();

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: List of all contacts
 */
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts" });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get one contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single contact
 *       404:
 *         description: Contact not found
 */
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    const contact = await db.collection("contacts").findOne({
      _id: new ObjectId(id),
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: "Invalid contact ID" });
  }
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     responses:
 *       201:
 *         description: Contact created
 */
router.post("/", async (req, res) => {
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
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating contact" });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Contact updated
 */
router.put("/:id", async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    await db.collection("contacts").replaceOne(
      { _id: new ObjectId(id) },
      updatedContact
    );

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: "Error updating contact" });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted
 */
router.delete("/:id", async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    await db.collection("contacts").deleteOne({
      _id: new ObjectId(id),
    });

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting contact" });
  }
});

module.exports = router;