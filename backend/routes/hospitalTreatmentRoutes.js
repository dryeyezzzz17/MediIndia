const express=require("express");

const {updateHospitalTreatment,
    getHospitalsByTreatment,
    getTreatmentsByHospital,
    createHospitalTreatment,
    deleteHospitalTreatment
}=require("../controllers/hospitalTreatmentController");

const {protect,adminOnly}=require("../middleware/authMiddleware");

const router=express.Router();

router.post("/",protect,adminOnly,createHospitalTreatment);
router.put("/:id",protect,adminOnly,updateHospitalTreatment);
router.delete("/:id",protect,adminOnly,deleteHospitalTreatment);
router.get("/hospital/:hospitalId",getTreatmentsByHospital);
router.get("/treatment/:treatmentId", getHospitalsByTreatment);

module.exports=router;