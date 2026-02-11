const mongoose = require("mongoose");

const stateVisitSchema = new mongoose.Schema(
  {
    stateCode: {
      type: String,
      required: true,
      uppercase: true,
      minlength: 2,
      maxlength: 2
    },
    visited: {
      type: Boolean,
      default: true
    },
    comment: {
      type: String,
      trim: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

stateVisitSchema.index({ stateCode: 1, trip: 1 }, { unique: true });

module.exports = mongoose.model("StateVisit", stateVisitSchema);
