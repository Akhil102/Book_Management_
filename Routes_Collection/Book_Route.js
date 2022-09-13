const express=require("express");

const {bookModels,userModels} = require("../models/Export.js")

const router=express.Router();

const { All_books, GetBookById ,IssuedBooks, AddNewBooks, UpdateBooks, DeleteById} = require("../controllers/BookController.js");


router.get('/',All_books);

router.get('/:id',GetBookById);

router.post('/',AddNewBooks);

router.put('/:id',UpdateBooks);

router.delete('/:id',DeleteById);

router.get('/issued/list',IssuedBooks);

   
module.exports=router;
