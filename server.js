require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const { connectDB } = require("./db/connect");

const contactRoutes = require("./routes/contacts");

const app = express();

// Parse JSON first
app.use(express.json());

// Routes
app.use("/contacts", contactRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home
app.get("/", (req, res) => {
  res.send("Welcome to the Contacts API!");
});

// Start server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server running on port ${process.env.PORT || 8080}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });