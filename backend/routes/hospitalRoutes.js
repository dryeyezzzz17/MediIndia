const express=require("express");
const {
    deleteHospital,
    updateHospital,
    getHospitalById,
    getAllHospitals,
    createHospital
}=require("../controllers/hospitalController");

const {protect,adminOnly}=require("../middleware/authMiddleware");

const router=express.Router();

router.get("/",getAllHospitals);
router.get("/:id",getHospitalById);
router.post("/",protect,adminOnly,createHospital);
router.put("/:id",protect,adminOnly,updateHospital);
router.delete("/:id",protect,adminOnly,deleteHospital);

module.exports=router;