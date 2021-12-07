const mongoose = require('mongoose');

const carBookingSchema = new mongoose.Schema({
    car : {type : mongoose.Schema.Types.ObjectId, ref:'cars'},
    user : {type : mongoose.Schema.Types.ObjectId, ref:'user'},
    bookedTimeSlots :{
      from : {type:String}, 
      to: {type:String,}
    },
    totalHours : {type:Number},
    totalAmount : {type:Number},
    transcationId : {type:String},
    driverRequire : {type:Boolean}
},{timestamps:true}
)

const carBookingModel = mongoose.model('carBooking', carBookingSchema);

module.exports = carBookingModel;