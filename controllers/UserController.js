const {userModel,bookModel} = require("../models/Export.js");

exports.GetAllUsers = async (req, res) => {
   try {const users=await userModel.find();
    if(users.length===0){
        return res.status(404).json({
            success: false,
            message: "No user is Present"
        })
    }

    return res.status(200).json({
        success: true,
        data: users,
    });}

    catch{
        return res.status(404).json({
            message:"error is occured"
        })
    }

}

exports.GetUserById = async (req, res) => {
   try {const { id } = req.params;

   const user=await userModel.findById(id);
    if (user) {
        res.status(200).json({
            success: true,
            data: user,
        })
    }
    else {
        return res.status(404).json({
            success: false,
            message: "user not found",
        })
    }}
    catch{
        return res.status(404).json({
            message:"error is occured"
        })
    }
}

exports.CreateUser = async (req, res) => {
    const { data} = req.body;

    if(!data){
        return res.status(404).json({
            message:"no data is provided"
        })
    }
    await userModel.create(data);

    const users =await userModel.find();
    return res.status(201).json({
            success: true,
            data: users,
        })
}

exports.UpdateUser = async (req,res)=>{
    try {const {id} =req.params;
     const {data}=req.body;
    const newUpdate = await userModel.findOneAndUpdate({_id : id},data,{new: true});
     return res.status(200).json({
         success:true,
         data:newUpdate,
         
     })}
     catch{
         return res.status(404).json({
             message:"error is occured"
         })
     }
 }

exports.GetUserWithBook = async (req, res) => {
    const userList = [];
    users.forEach((every) => {
        if (every.issuedBook) {
            userList.push(every.name + " " + every.surname);
        }
    })
    if (userList.length === 0) {
        return res.status(404).json({
            success: false,
            message: "no user with issued book"
        })
    }
    return res.status(200).json({
        success: true,
        data: userList
    })
}