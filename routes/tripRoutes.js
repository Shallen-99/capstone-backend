const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  addTripMedia
} = require("../controllers/tripController");

router.route("/")
  .post(protect, createTrip)
  .get(protect, getTrips);

router.route("/:tripId")
  .get(protect, getTripById)
  .put(protect, updateTrip)
  .delete(protect, deleteTrip);

// Attach uploaded media to trip
router.post("/:tripId/media", protect, addTripMedia);

module.exports = router;
