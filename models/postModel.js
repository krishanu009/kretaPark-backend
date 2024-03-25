const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    scheduled: {
      type: Boolean,
      required: [true, "Please let us know if its scheduled or not"],
    },
    scriptId: {
      id: String,
      name: String
    },
    date: {
      type: Date,
    },
    status: {
      type: String,
    },
    assigned: [
      {
        id: { type: String, required: true },
        role: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    companyId: {
      type: String,
    },
  },

  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
