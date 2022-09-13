const mongoose=require("mongoose");

function DBConnect(){
    const DB_url=process.env.DATABASE_URL;

    mongoose.connect(DB_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    const DATABASE=mongoose.connection;

    DATABASE.on("error",console.error.bind(console,"connection error"));
    DATABASE.once("open",function (){
        console.log("Connection is established with DataBase........")
    });

}

module.exports = DBConnect;