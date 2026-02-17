const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    //Optional short description (if you still want it)
    description: {
      type: String,
      trim: true,
      default: ""
    },

    //Using geo.id values (ex: "08" for Colorado)
    states: {
      type: [String],
      default: []
    },

    //Trip notes
    comment: {
      type: String,
      trim: true,
      default: ""
    },

    //Rating 1–5
    rating: {
      type: Number,
      min: 1,
      max: 5
    },

    //For MVP: store photo URLs
    photos: {
      type: [String],
      default: []
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
