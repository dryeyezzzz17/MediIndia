const mongoose=require("mongoose");
const hospitalSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    city:{
        type:String,
        required:true
    },
    contactPhone:{
        type:String,
    },
    contactEmail:{
        type:String,
        required:true,
        unique:true
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    accreditation:String,
    description:String,
    treatmentsOffered:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Treatment",
        }
    ]
},{timestamps:true});
module.exports=mongoose.model("Hospital",hospitalSchema);