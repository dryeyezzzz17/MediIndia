const Booking=require("../models/Booking");
const HospitalTreatment=require("../models/HospitalTreatment");

exports.createBooking=async (req,res)=>{
    try{
        const {hospitalTreatment,preferredDate,medicalNotes}=req.body;

        if(!hospitalTreatment){
            return res.status(400).json({
                success:false,
                message:"HospitalTreatment is required"
            })
        }

        const check=await HospitalTreatment.findOne({
            _id:hospitalTreatment,
            isActive:true,
        })
        if(!check){
            return res.status(400).json({
                success:false,
                message:"Invalid hospital treatment "
            })
        }
        const existingBooking = await Booking.findOne({
            user: req.user.id,
            hospitalTreatment,
            status: "Pending",
        });

        if (existingBooking) {
            return res.status(400).json({
                success:false,
                message:
                "You already have a pending booking for this treatment at this hospital",
            });
        }
        const booking=await Booking.create({
            user:req.user.id,
            hospitalTreatment,
            preferredDate,
            medicalNotes,
        })
        res.status(201).json({
            success:true,
            message:"Booking created successfully",
            data:booking
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message: "Failed to create booking.Try again!" 
        });
    }
}

exports.getMyBookings=async (req,res)=>{
    try{
        const bookings=await Booking.find({user:req.user.id}).
        populate({
            path:"hospitalTreatment",
            populate:[
                {path:"hospital",select:"name city contactEmail"},
                {path:"treatment",select:"name category"},
            ],
        }).sort({createdAt:-1});
        res.status(200).json({
            success:true,
            data:bookings
        });
    }catch(error){
        res.status(500).json({ 
            success:false,
            message: "Failed to fetch booking details." 
        });
    }
}

exports.getAllBookings=async (req,res)=>{
    try{

        const bookings=await Booking.find().
        populate("user","name email country")
        .populate({
            path:"hospitalTreatment",
            populate:[
                {path:"hospital",select:"name city"},
                {path:"treatment",select:"name"},
            ],
        }).sort({createdAt:-1});

        res.status(200).json({
            success:true,
            data:bookings
        }); 
    }catch(error){
        res.status(500).json({ 
            success:false,
            message: "Failed to fetch all bookings"
        });
    }
}

exports.updateBookingStatus=async (req,res)=>{
    try{
        const {status}=req.body;
        if(!["Pending","Approved","Rejected"].includes(status)){
            return res.status(400).json({
                success:false,
                message: "Invalid status value" 
            });
        }

        const booking=await Booking.findByIdAndUpdate(
            {_id:req.params.id},
            {status},
            {new:true}
        );
        if(!booking){
            return res.status(404).json({
                success:false,
                message: "Booking not found" 
            });
        }
        res.status(200).json({
            success:true,
            data:booking,
            message:"Booking status updated successfully"
        })
    }catch(error){
        res.status(500).json({ 
            success:false,
            message: "Failed to update booking status"
        });
    }
}

exports.cancelBooking = async (req, res) => {
    try{
        const booking = await Booking.findById(req.params.id);

        if(!booking){
            return res.status(404).json({ 
                success:false,  
                message: "Booking not found" 
            });
        }

        if(booking.user.toString() !== req.user.id){
            return res.status(403).json({ 
                success:false,
                message: "Not authorized to cancel this booking" 
            });
        }

        if (booking.status !== "Pending") {
            return res.status(400).json({
                success:false,
                message: "Only pending bookings can be cancelled",
            });
        }

        booking.status = "Cancelled";
        await booking.save();

        res.status(200).json({ 
            success:true,
            message: "Booking cancelled successfully" 
        });
    }catch (error) {
        res.status(500).json({ 
            success:false,
            message: "Failed to cancel booking" 
        });
    }
};