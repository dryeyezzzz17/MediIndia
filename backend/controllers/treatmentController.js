const Treatment=require("../models/Treatment");

exports.createTreatment=async (req,res)=>{
    try{
        const treatment=await Treatment.create(req.body);
        res.status(201).json({
            success: true,
            message: "Treatment created successfully",
            data: treatment,
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "Failed to create treatment", 
        });
    }
}

exports.getAllTreatment=async (req,res)=>{
    try{
        const treatments=await Treatment.find({isActive:true});
        res.status(200).json({
            success: true,
            data: treatments,
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch treatments", 
        });
    }
}

exports.getTreatmentById=async (req,res)=>{
    try{
        const treatment=await Treatment.findById(req.params.id);
        if(!treatment){
            return res.status(400).json({
                success:false,
                message:"Treatment not found"
            })
        }
        res.status(200).json({
            success: true,
            data: treatment,
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch treatment", 
        });
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
            return res.status(404).json({ 
                success:false,
                message: "Treatment not found" 
            });
        }
        res.status(200).json({
            success: true,
            message: "Treatment updated successfully",
            data: treatment,
        });
    }catch(error){
        res.status(400).json({ 
            success:false,
            message: "Failed to update treatment", 
        });
    }
}

exports.deleteTreatment=async (req,res)=>{
    try{
        const treatment = await Treatment.findByIdAndUpdate(
            {_id:req.params.id},
            { isActive: false },
            { new: true }
        );

        if (!treatment) {
            return res.status(404).json({ 
                success:false,
                message: "Treatment not found" 
            });
        }

        res.status(200).json({ 
            success:true,
            message: "Treatment deactivated successfully" 
        });
    }catch(error){
        res.status(500).json({ 
            success:false,
            message: "Failed to delete treatment", 
        });
    }
}