const mongoose=require("mongoose");
const hospitalTreatmentSchema= new mongoose.Schema(
    {
        hospital:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hospital",
            required:true,
        },
        treatment:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Treatment",
            required:true,
        },
        estimatedCostUSD:{
            min:{type:Number,required:true},
            max:{type:Number,required:true},
        },
        duration:{
            type:String
        },
        successRate:{
            type:Number,
            min:0,
            max:100
        },
        notes:String,
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {timestamps:true}
);
hospitalTreatmentSchema.index(
  {hospital: 1, treatment: 1},
  {unique: true}
);
module.exports=mongoose.model("HospitalTreatment",hospitalTreatmentSchema);