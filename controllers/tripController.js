const Trip = require("../models/Trip");

// CREATE Trip
exports.createTrip = async (req, res) => {
  try {
    const {
      title,
      description = "",
      states = [],
      comment = "",
      rating,
      photos = [],
      startDate,   
      endDate      
    } = req.body;

    const trip = await Trip.create({
      title,
      description,
      states,
      comment,
      rating,
      photos,
      startDate: startDate || undefined, 
      endDate: endDate || undefined,    
      user: req.user._id
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/trips/:tripId/media
exports.addTripMedia = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { url, type, filename } = req.body;

    if (!url || !type || !filename) {
      return res.status(400).json({ message: "url, type, and filename are required" });
    }

    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    trip.media.push({ url, type, filename });
    await trip.save();

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET All Trips
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Single Trip
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Trip
exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Trip.findByIdAndUpdate(
      req.params.tripId,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Trip
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await trip.deleteOne();

    res.json({ message: "Trip deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
