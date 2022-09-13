const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const UserSchema= new Schema({
    name:{
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
    },
    issuedBook : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Books",
        required : false
    },
    issuedDate: {
        type: String,
        required : false
    },
    returnDate:{
        type: String,
        required : false
    },
    subscriptionType: {
        type : String,
        required : true
    },
    subscriptionDate:{
        type : String,
        required: false
    }
},{
    timestamps:true

});


module.exports = mongoose.model("Users",UserSchema);