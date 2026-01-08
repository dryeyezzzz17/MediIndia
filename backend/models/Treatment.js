const mongoose=require("mongoose");
const treatmentSchema=new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        required:true,
        trim:true,
    },
    description:{
        type: String,
        required:true,
    },
    category:{
        type: String,
        required: true,
      enum: [
        "Cardiology",
        "Orthopedics",
        "Neurology",
        "Oncology",
        "Cosmetic",
        "IVF",
        "Dental",
        "General",
      ],
    },
    estimatedcost:{
        min:{type:String},
        max:{type:String}
    },
    successrate:{
        type:String
    },
    duration:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true,
    }

},{timestamps:true});
module.exports=mongoose.model("Treatment",treatmentSchema);