const express=require("express");
const router=express.Router();
const {books} = require("../DATA_BASE/Books.json");
const {users}=require("../DATA_BASE/Users.json");


router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data: books,
    })
    });
    router.get('/:id',(req,res)=>{
        const {id}=req.params;
        const book = books.find((each)=> each.id===id);
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
        }
    })
    router.post('/',(req,res)=>{
        const {id,name,author,genre,price,publisher} = req.body;
        const book = books.find((each)=> each.id===id);
        if(book){
            return res.status(404).json({
                success:false,
                message: "Book already exist"
            })
        }
        else{
            books.push({
                id,name,author,genre,price,publisher
            })
            return res.status(200).json({
                success:true,
                data : books 
            })
        }
    
    })
    router.put('/:id',(req,res)=>{
        const {id} =req.params;
        const {data}=req.body;
        const book = books.find((every)=> every.id===id);
    
        if(!book){
            return res.status(404).json({
                success:false,
                message:"book not found"
            })
        }
        const newUpdate=books.map((every)=>{
            if(every.id===id){
                return{
                    ...every,
                    ...data
                }
            }
            return every;
        })
        return res.status(200).json({
            success:true,
            data:newUpdate,
            
        })
    })
    router.delete('/:id',(req,res)=>{
        const {id}=req.params;
        const book=books.find((every)=> every.id===id);
        if(!book){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        const index=books.indexOf(book);
        books.splice(index,1);
        return res.status(200).json({
            success:true,
            data:books
        })
    })
    router.get('/issued/by',(req,res)=>{
        const issued_books=users.filter((every)=> {
            if(every.issuedBook){
                return every;
            }
        });
        const user_with_issued_book=[];
        issued_books.forEach((each)=>{
           const book=books.find((book)=> book.id===each.issuedBook)
           book.issuedBy=each.name,
           book.issuedDate=each.issuedDate,
           book.returnDate=each.returnDate

           user_with_issued_book.push(book);
        })
        if(user_with_issued_book.length===0){
            return res.status(404).json({
                success:false,
                message:"no issued books"
            })
        }
        return res.status(200).json({
            success:true,
            data:user_with_issued_book,
        })
        

    });

   
module.exports=router;
