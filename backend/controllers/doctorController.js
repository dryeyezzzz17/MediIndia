const Doctor=require("../models/Doctor");
exports.createDoctor=async (req,res)=>{
    try{
        const doctor=await Doctor.create(req.body);
        res.status(201).json({
            success:true,
            data:doctor,
            message:"Doctor created successfully"
        });
    }catch(error){
        res.status(400).json({
            success:false,
            message:"Failed to create doctor"
        })
    }
}

exports.getAllDoctors=async (req,res)=>{
    try{
        const doctors=await Doctor.find({isActive:true}).populate("hospital","name city").populate("treatments","name");
        res.status(200).json({
            success:true,
            data:doctors,
            message:"Fetched all doctors successfully"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to fetch doctors"
        })
    }
}

exports.getDoctorById=async (req,res)=>{
    try{
        const doctor=await Doctor.findById(req.params.id).populate("hospital").populate("treatments")
        
        if (!doctor || !doctor.isActive){
            return res.status(404).json({ 
                success:false,
                message: "Doctor not found"
            });
        }
        
        res.status(200).json({
            success:true,
            data:doctor
        });
    }catch(error){
        res.status(500).json({ 
            success:false,
            message: "Failed to fetch doctor"
        });
    }
}

exports.updateDoctor=async (req,res)=>{
    try{
        const allowedFields = [
            "name",
            "experience",
            "specialization",
            "hospital",
            "treatments",
        ];

        const updates = {};
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Doctor updated successfully",
            data: doctor,
        });
    }catch(error){
        res.status(400).json({ 
            success: false,
            message: "Failed to update doctor", 
        });
    }
}

exports.deleteDoctor=async (req,res)=>{
    try{
        const doctor=await Doctor.findByIdAndUpdate(req.params.id,{isActive:false},{new:true});

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }
        res.status(200).json({
            success:true,
            message:"Doctor deactivated successfully"
        });
    }catch(error){
        res.status(500).json({ 
            success:false,
            message: "Failed to delete doctor" 
        });
    }
}