const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    description: {
      type: String,
      trim: true,
      default: ""
    },

    states: {
      type: [String],
      default: []
    },

    comment: {
      type: String,
      trim: true,
      default: ""
    },

    rating: {
      type: Number,
      min: 1,
      max: 5
    },

    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },

    // Keep for MVP / backward compatibility
    photos: {
      type: [String],
      default: []
    },

    // New: uploaded media objects
    media: [
      {
        url: { type: String, required: true }, // "/uploads/filename.ext"
        type: { type: String, enum: ["image", "video"], required: true },
        filename: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
