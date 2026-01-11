const express=require("express")
const {createDoctor,getAllDoctors,getDoctorById,updateDoctor,deleteDoctor}=require("../controllers/doctorController");

const {protect,adminOnly}=require("../middleware/authMiddleware");

const router=express.Router();

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);

router.post("/", protect, adminOnly, createDoctor);
router.put("/:id", protect, adminOnly, updateDoctor);
router.delete("/:id", protect, adminOnly, deleteDoctor);

module.exports = router;