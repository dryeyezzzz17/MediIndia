const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {getAdminStats}=require("../controllers/adminController")


router.get("/test", protect, adminOnly, (req, res) => {
  res.json({
    success: true,
    message: "Admin route working",
  });
});

router.get("/stats",protect,adminOnly,getAdminStats);
module.exports = router;
