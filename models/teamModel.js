const mongoose = require("mongoose");

const teamSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter a team name"],
    },
    members: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        permissions:{type: String},
      },
    ],
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Team", teamSchema);
