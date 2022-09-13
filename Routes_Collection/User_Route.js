const express = require("express");

const router = express.Router();

const { GetAllUsers, GetUserById, CreateUser, UpdateUser } = require("../controllers/UserController");

router.get('/', GetAllUsers);

router.get('/:id', GetUserById);

router.post('/', CreateUser);

router.put('/:id', UpdateUser);

router.get('/user/withIssuedBook', )
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((every) => every.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: " user not found"
        })
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    return res.status(200).json({
        success: true,
        data: users,
    })
})
router.get('/subscription/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find((every) => every.id === id);
    if (!user) {
        return res.status(404).json({
            success: true,
            message: "user not found"
        })
    }
    const getInDays = (Data = "") => {
        let date;
        if (Data === "") {
            date = new Date();
        }
        else {
            date = new Date(Data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    }
    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        }
        else if (user.subscriptionType === "Standard") {
            date = date + 180;
        }
        else if(user.subscriptionDate==="Premium"){
            date = date + 365;
        }
        return date;
    }
    let returnDate = getInDays(user.returnDate);
    let currentDate = getInDays();
    let subscriptionDate = getInDays(user.subscriptionDate);
    let subscriptionEnd = subscriptionType(subscriptionDate);

    const userData = {
        ...user,
        "Has Subscription": subscriptionEnd < currentDate ,
        "Subscription Ends In": (subscriptionEnd - currentDate)<0 ? 0 :subscriptionEnd - currentDate
         ,
        "Total Fine": currentDate < returnDate ? currentDate < subscriptionDate ? 200 + (currentDate - returnDate) * 20:200 : 0
    };
    return res.status(200).json({
        success:true,
        data:userData

    })
})

module.exports = router;