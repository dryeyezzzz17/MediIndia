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
            message:"Failed to create hospital"
        });
    }
}

exports.getAllHospitals=async (req,res)=>{
    try{
        const hospitals=await Hospital.find({isActive:true}).populate("treatmentsOffered", "name category");

        res.status(200).json({
            success:true,
            data:hospitals
        });
    }catch(error){
        res.status(500).json({ 
            success:false,
            message: "Failed to fetch hospitals" 
        });
    }
}

exports.getHospitalById =async (req,res)=>{
    try{
        const hospital=await Hospital.findById(req.params.id).populate("treatmentsOffered");
        if(!hospital){
            return res.status(404).json({ 
                success:false,
                message: "Hospital not found" 
            });
        }
        res.status(200).json({
            success:true,
            data:hospital
        });
    }catch(error){
        res.status(500).json({ 
            success:false,
            message: "failed to fetch hospital" 
        });
    }
};

exports.updateHospital = async (req,res) => { 
    try{ 
        const hospital=await Hospital.findOneAndUpdate( 
            { _id: req.params.id }, 
            req.body, {new:true} ); 
            res.status(200).json({
                success: true,
                message: "Hospital updated successfully",
                data: hospital,
            }); 
        }catch(error){ 
            res.status(400).json({ 
                success:false,
                message: error.message 
            }); 
        } 
    }

exports.deleteHospital=async (req,res)=>{
    try{
        const hospital = await Hospital.findByIdAndUpdate(
            { _id: req.params.id },
            { isActive: false },
            { new: true }
        );

        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        res.status(200).json({ 
            success:true,
            message: "Hospital deactivated successfully" 
        });
    }catch(error){
        res.status(500).json({ 
            success:false,
            message: "Failed to delete hospital" 
        });
    }
}