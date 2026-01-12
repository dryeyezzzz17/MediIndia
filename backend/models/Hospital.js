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
    country:{
         type: String, default: "India" 
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
},{timestamps:true});

hospitalSchema.index(
  { name: 1, city: 1 },
  { unique: true }
);

module.exports=mongoose.model("Hospital",hospitalSchema);