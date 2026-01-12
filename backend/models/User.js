const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    role:{
        type: String,
        enum: ["user", "admin","doctor","hospitalAdmin"],
        default: "user",
    },
    phone:{
        type:String,
    },
    country:{
        type:String,
    },
    medicalhistory:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    }

},{timestamps:true});
module.exports=mongoose.model("User",userSchema);