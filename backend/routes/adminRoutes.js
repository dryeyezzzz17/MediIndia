const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/test", protect, adminOnly, (req, res) => {
  res.json({
    success: true,
    message: "Admin route working",
  });
});

module.exports = router;
