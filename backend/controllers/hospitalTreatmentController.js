const HospitalTreatment=require("../models/HospitalTreatment");

exports.createHospitalTreatment=async (req,res)=>{
    try{
        const hospitalTreatment=await HospitalTreatment.create(req.body);
        res.status(201).json(hospitalTreatment);
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}

exports.getTreatmentsByHospital =async (req,res)=>{
    try{
        const data=await HospitalTreatment.find({
            hospital:req.params.hospitalId,
            isActive:true,
        }).populate("treatment","name category description");
        res.json(data);

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.getHospitalsByTreatment  =async (req,res)=>{
    try{
        const data=await HospitalTreatment.find({
            treatment:req.params.treatmentId,
            isActive:true,
        }).populate("hospital", "name city contactEmail contactPhone");
        res.json(data);

    }catch(error){
        res.status(500).json({ message: error.message });
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
            return res.status(400).json({
                message: "HospitalTreatment not found"
            })
        }

        res.json(hospitalTreatment);
    }catch(error){
        res.status(400).json({ message: error.message });
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
                message: "HospitalTreatment not found"
            })
        }

        res.json({ message: "Hospital treatment deactivated successfully" });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

