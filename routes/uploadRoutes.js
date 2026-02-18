const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, unique + "-" + safeName);
  }
});

const fileFilter = (req, file, cb) => {
  const ok =
    file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/");
  cb(null, ok);
};

const upload = multer({ storage, fileFilter });

// POST /api/uploads (form-data key: "file")
router.post("/", protect, upload.single("file"), (req, res) => {
  const type = req.file.mimetype.startsWith("video/") ? "video" : "image";

  res.json({
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename,
    type
  });
});

module.exports = router;
