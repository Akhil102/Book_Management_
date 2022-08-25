const express=require("express");
const app =express();
const PORT=8081;
app.get(express.json());
app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Server is started",
    })
})
app.get('*',(req,res)=>{
    res.status(404).json({
        message:"Server not found",
    })
})
app.listen(PORT,()=>{
    console.log(`server is started at port ${PORT}`)
})