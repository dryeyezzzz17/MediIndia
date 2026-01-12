const express=require("express")
const {createTreatment,
       getAllTreatment,
       getTreatmentById,
       updateTreatment,
       deleteTreatment}=require("../controllers/treatmentController");

const {protect,adminOnly}=require("../middleware/authMiddleware")
const router=express.Router();

router.get("/",getAllTreatment);
router.get("/:id",getTreatmentById);
router.post("/",protect,adminOnly,createTreatment);
router.put("/:id",protect,adminOnly,updateTreatment);
router.delete("/:id",protect,adminOnly,deleteTreatment);

module.exports=router;