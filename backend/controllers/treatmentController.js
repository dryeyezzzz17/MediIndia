const Treatment=require("../models/Treatment");

exports.createTreatment=async (req,res)=>{
    try{
        const treatment=await Treatment.create(req.body);
        res.json(treatment);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.getAllTreatment=async (req,res)=>{
    try{
        const treatment=await Treatment.find({isActive:true});
        res.json(treatment);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.getTreatmentById=async (req,res)=>{
    try{
        const treatment=await Treatment.findById(req.params.id);
        if(!treatment){
            return res.status(400).json({
                message:"Treatment not found"
            })
        }
        res.json(treatment);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.updateTreatment=async (req,res)=>{
    try{
        const treatment=await Treatment.findByIdAndUpdate(
            {_id:req.params.id},
                req.body,
                {new:true}
        )
        if (!treatment) {
            return res.status(404).json({ message: "Treatment not found" });
        }
        res.json(treatment);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.deleteTreatment=async (req,res)=>{
    try{
        await Treatment.findByIdAndDelete(req.params.id,{isActive:false});
        res.json({
            message:"Treatment deactivated successfully"
        })
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}