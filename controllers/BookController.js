const { bookModel, userModel } = require("../models/Export.js");

const IssuedBooks = require('../DTOS/BookDTO')

// async because when ever we connect our data base it takes some time so if we instantly call any function it leads to an error async await wait until db is connecting
exports.All_books = async (req, res) => {
    try{const books=await bookModel.find();
    if(books.length===0){
        return res.status(404).json({
            success: false,
            message:"empty"
        })
    }
    return res.status(200).json({
        success: true,
        data : books,
    })}
    catch{
        return res.status(404).json({
            message:"error is occured"
        })
    }
}

exports.GetBookById = async (req,res)=>{
   try{ const {id}=req.params;
    const book = await bookModel.findById(id);
    if(book){
        return res.status(200).json({
            success : true,
            data : book
        })
    }
    else{
        return res.status(404).json({
            success: false,
            message : "book not found",
        })
    }}
    catch{
        return res.status(404).json({
            message:"error is occured"
        })
    }
}

exports.IssuedBooks = async (req,res)=>{
   try{ const issued_books = await userModel.find({
        issuedBook : {
            $exists:true
        }
    }).populate("issuedBook");

    const IssuedBooks=issued_books.map((every)=> new IssuedBooks(every));

    if(IssuedBooks.length===0){
        return res.status(404).json({
            success: false,
            message:"No issued books found"
        })
    }

    return res.status(200).json({
        success: true,
        data : IssuedBooks
    })}
    catch{
        return res.status(404).json({
            message:"error is occured"
        })
    }
    
    
}

exports.AddNewBooks = async (req,res)=>{
    try {
        const {data} = req.body;
   
    if(!data){
        return res.status(404).json({
            success:false,
            message: "No data is provided"
        })
    }

    await bookModel.create(data);

    const Total_Books=await bookModel.find();

    return res.status(200).json({
        success: true,
        data : Total_Books
    })}
    catch{
        return res.status(404).json({
            message:"error is occured"
        })
    }
   
}

exports.UpdateBooks = async (req,res)=>{
   try {const {id} =req.params;
    const {data}=req.body;
   const newUpdate = await bookModel.findOneAndUpdate({_id : id},data,{new: true});
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

exports.DeleteById = async (req,res)=>{
   try {const {id}=req.params;
    if(!id){
        return res.status(404).json({
            message: "id is not provided"
        })
    }
    await bookModel.deleteOne({_id:id},{new:true})
    return res.status(200).json({
        success:true,
        message : "book is deleted"
    })}
    catch{
        return res.status(404).json({
            message:"error is occured"
        })
    }
}