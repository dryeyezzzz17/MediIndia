const User=require("../models/User")
const Hospital=require("../models/Hospital")
const Booking=require("../models/Booking")
const Treatment=require("../models/Treatment")

exports.getAdminStats=async (req,res)=>{
    try{
        const [totalUsers,totalHospitals,totalTreatments,totalBookings,pendingBookings,appraovedBookings,cancelledBookings]=await Promise.all([
            User.countDocuments(),
            Hospital.countDocuments({isActive:true}),
            Treatment.countDocuments({isActive:true}),
            Booking.countDocuments(),
            Booking.countDocuments({status:"Pending"}),
            Booking.countDocuments({status:"Approved"}),
            Booking.countDocuments({status:"Cancelled"}),
        ]);
        res.json({
            totalUsers,
            totalHospitals,
            totalTreatments,
            totalBookings,
            pendingBookings,
            appraovedBookings,
            cancelledBookings
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}