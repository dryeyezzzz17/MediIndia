const HospitalTreatment=require("../models/HospitalTreatment");

exports.createHospitalTreatment=async (req,res)=>{
    try{
        const hospitalTreatment=await HospitalTreatment.create(req.body);
        res.status(201).json({
            success: true,
            message: "Hospital treatment created successfully",
            data: hospitalTreatment,
        });
    }catch(error){
        res.status(400).json({
            success: false,
            message: "Failed to create hospital treatment",
        })
    }
}

exports.getTreatmentsByHospital =async (req,res)=>{
    try{
        const data=await HospitalTreatment.find({
            hospital:req.params.hospitalId,
            isActive:true,
        }).populate("treatment","name category description");
        res.status(200).json({
            success: true,
            data,
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch treatments for hospital",
        });
    }
}

exports.getHospitalsByTreatment  =async (req,res)=>{
    try{
        const data=await HospitalTreatment.find({
            treatment:req.params.treatmentId,
            isActive:true,
        }).populate("hospital", "name city contactEmail contactPhone");
        res.status(200).json({
            success: true,
            data,
        });

    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch hospitals for treatment", 
        });
    }
}

exports.updateHospitalTreatment =async (req,res)=>{
    try{
        const hospitalTreatment=await HospitalTreatment.findByIdAndUpdate(
            {_id:req.params.id},
            req.body,
            {new:true}
        );

        if(!hospitalTreatment){
            return res.status(404).json({
                success:false,
                message: "HospitalTreatment not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Hospital treatment updated successfully",
            data: hospitalTreatment,
        });
    }catch(error){
        res.status(400).json({ 
            success: false,
            message: "Failed to update hospital treatment", 
        });
    }
}

exports.deleteHospitalTreatment  =async (req,res)=>{
    try{
        const hospitalTreatment=await HospitalTreatment.findByIdAndUpdate(
            {_id:req.params.id},
            {isActive:false},
            {new:true}
        );

        if(!hospitalTreatment){
            return res.status(400).json({
                success:false,
                message: "HospitalTreatment not found"
            })
        }

        res.status(200).json({ 
            success:true,
            message: "Hospital treatment deactivated successfully" 
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "Failed to delete hospital treatment", 
        });
    }
}

