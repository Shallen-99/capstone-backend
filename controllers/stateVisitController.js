const StateVisit = require("../models/StateVisit");
const Trip = require("../models/Trip");

exports.createStateVisit = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { stateCode, comment, rating } = req.body;

    // 1️⃣ Check if trip exists
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // 2️⃣ Verify ownership
    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 3️⃣ Create state visit
    const stateVisit = await StateVisit.create({
      stateCode,
      comment,
      rating,
      trip: tripId,
      user: req.user._id
    });

    res.status(201).json(stateVisit);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStateVisits = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const states = await StateVisit.find({ trip: tripId });

    res.json(states);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStateVisit = async (req, res) => {
  try {
    const { stateVisitId } = req.params;

    const stateVisit = await StateVisit.findById(stateVisitId);

    if (!stateVisit) {
      return res.status(404).json({ message: "State visit not found" });
    }

    if (stateVisit.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await StateVisit.findByIdAndUpdate(
      stateVisitId,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStateVisit = async (req, res) => {
  try {
    const { stateVisitId } = req.params;

    const stateVisit = await StateVisit.findById(stateVisitId);

    if (!stateVisit) {
      return res.status(404).json({ message: "State visit not found" });
    }

    if (stateVisit.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await stateVisit.deleteOne();

    res.json({ message: "State visit removed" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
