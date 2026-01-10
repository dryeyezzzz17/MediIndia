const Hospital=require("../models/Hospital");

exports.createHospital=async (req,res)=>{
    try{
        const hospital=await Hospital.create(req.body);
        res.status(201).json({
            success:true,
            data:hospital,
            message:"Hospital created succesfully"
        })
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

exports.getAllHospitals=async (req,res)=>{
    try{
        const hospitals=await Hospital.find({isActive:true}).populate("treatmentsOffered", "name category");
        res.status(201).json({
            hospitals
        });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.getHospitalById =async (req,res)=>{
    try{
        const hospital=await Hospital.findById(req.params.id).populate("treatmentsOffered");
        if(!hospital){
            return res.status(404).json({ message: "Hospital not found" });
        }
        res.status(201).json({
            hospital
        });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

exports.updateHospital = async (req,res) => {
    try{
        const hospital=await Hospital.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {new:true}
        );
        res.json(hospital);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

exports.deleteHospital=async (req,res)=>{
    try{
        await Hospital.findByIdAndUpdate(req.params.id, { isActive: false });
        res.json({ message: "Hospital deactivated" });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}