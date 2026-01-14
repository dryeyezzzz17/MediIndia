const User=require("../models/User");

exports.getMyProfile=async (req,res)=>{
    try{
        const user=await User.findById(req.user.id || req.user._id);
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        res.json({
            name:user.name,
            email:user.email,
            phone:user.phone,
            country:user.country,
            medicalhistory:user.medicalhistory,
            avatar:user.avatar,
            createdAt: user.createdAt,
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
};

exports.updateMyprofile=async (req,res)=>{
    try{
        const updates={};
        const allowedFeilds=[
            "name",
            "phone",
            "country",
            "medicalhistory",
            "avatar",
        ];
        allowedFeilds.forEach((field)=>{
            if(req.body[field]!==undefined){
                updates[field]=req.body[field];
            }
        })
        const user=await User.findByIdAndUpdate(
            req.user.id || req.user._id,
            updates,
            {new:true}
        )
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        res.json({
            message:"Profile updated successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                country:user.country,
                medicalhistory:user.medicalhistory,
                avatar:user.avatar,
            }
        })
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}