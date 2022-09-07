const express=require("express");

const { users }=require("./DATA_BASE/Users.json");

const { books }=require("./DATA_BASE/Books.json");
const user_route=require('./Routes_Collection/User_Route');

const book_route=require('./Routes_Collection/Book_Route');

const app =express();

const PORT=8081;

app.use(express.json());


// app.get('/users/:name',(req,res)=>{
//     const {name}=req.params;
//     const user = users.find((each)=> each.name===name);
//     if(user){
//         res.status(200).json({
//             sucess : true,
//             data : user,
//         })
//     }
//     else{
//         return res.status(404).json({
//             sucess : false,
//             message : "username not found",
//         })
//     }
// })



app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Server is started",
    })
})
app.use('/users',user_route);

app.use('/books',book_route);

app.get('*',(req,res)=>{
    res.status(404).json({
        message:"Server not found",
    })
});



app.listen(PORT,()=>{
    console.log(`server is started at port ${PORT}`)
});
// app.get('*',(req,res)=>{
//     res.status(404).json({
//         message:"Server not found",
//     })
// })
// app.listen(PORT,()=>{
//     console.log(`server is started at port ${PORT}`)
// })