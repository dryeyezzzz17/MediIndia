const mongoose=require("mongoose");
const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    experience:{
        type:Number
    },
    specialization: {
      type: String,
      required: true,
    },
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
    },
    treatments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Treatment",
      },
    ],

    profileImage: String,

    isActive: {
      type: Boolean,
      default: true,
    },
},{timestamps:true});

doctorSchema.index(
    { name: 1, hospital: 1 },
    { unique: true }
);

module.exports=mongoose.model("Doctor",doctorSchema);