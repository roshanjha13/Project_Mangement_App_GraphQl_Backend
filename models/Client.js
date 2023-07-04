const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Client", ClientSchema);
