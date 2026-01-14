const express=require("express");
const {getMyProfile,updateMyprofile}=require("../controllers/userController");

const {protect}=require("../middleware/authMiddleware");

const router=express.Router();

router.get("/profile",protect,getMyProfile);
router.put("/profile",protect,updateMyprofile);

module.exports=router;