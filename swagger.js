const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description:
      "API for creating, reading, updating, and deleting contacts stored in MongoDB Atlas.",
    version: "1.0.0"
  },

  host: "contacts-api-52b9.onrender.com",

  schemes: ["https"],

  tags: [
    {
      name: "Contacts",
      description: "Contact management endpoints"
    }
  ],

  definitions: {
    ContactInput: {
      firstName: "Gwyn",
      lastName: "Smith",
      email: "gwyn@example.com",
      favoriteColor: "Blue",
      birthday: "1976-05-15"
    },

    ContactResponse: {
      _id: "64c285a87db761333e18d1d5",
      firstName: "Gwyn",
      lastName: "Smith",
      email: "gwyn@example.com",
      favoriteColor: "Blue",
      birthday: "1976-05-15"
    }
  }
};

const outputFile = "./swagger-output.json";

const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);