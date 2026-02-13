const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createStateVisit,
  getStateVisits,
  updateStateVisit,
  deleteStateVisit
} = require("../controllers/stateVisitController");

router.post("/:tripId/states", protect, createStateVisit);
router.get("/:tripId/states", protect, getStateVisits);
router.put("/state/:stateVisitId", protect, updateStateVisit);
router.delete("/state/:stateVisitId", protect, deleteStateVisit);

module.exports = router;
