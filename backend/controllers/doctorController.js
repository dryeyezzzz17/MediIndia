const Doctor=require("../models/Doctor");
exports.createDoctor=async (req,res)=>{
    try{
        const doctor=await Doctor.create(req.body);
        res.status(201).json(doctor);
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}

exports.getAllDoctors=async (req,res)=>{
    try{
        const doctors=await Doctor.find({isActive:true}).populate("hospital","name city").populate("treatments","name");
        res.json(doctors);
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

exports.getDoctorById=async (req,res)=>{
    try{
        const doctor=await Doctor.findById(req.params.id).populate("hospital").populate("treatments")
        if(!doctor){
            if (!doctor){
                return res.status(404).json({ message: "Doctor not found"});
            }
        }
        res.json(doctor);
    }catch(error){
        res.status(500).json({ message: error.message});
    }
}

exports.updateDoctor=async (req,res)=>{
    try{
        const doctor=await Doctor.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            {new:true}
        );
        res.json(doctor);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

exports.deleteDoctor=async (req,res)=>{
    try{
        await Doctor.findByIdAndDelete(req.params.id,{isActive:false});
        res.json({message:"Doctor deactivated"});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}