const express = require("express");
const router = express.Router();
const { users } = require("../DATA_BASE/Users.json");
const { books } = require("../DATA_BASE/Books.json");

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });

});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
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
    }
})
router.post('/', (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);

    if (user) {
        return res.status(404).json({
            success: false,
            message: "user already exist"
        })
    }
    else {
        users.push({
            id,
            name,
            surname,
            email,
            subscriptionType,
            subscriptionDate,
        })
        return res.status(201).json({
            success: true,
            data: users,
        })
    }
})
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { data } = req.body;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return req.status(404).json({
            success: false,
            message: "user not found"
        })
    }

    const newUpdate = users.map((every) => {
        if (every.id === id) {
            return {
                ...every,
                ...data,

            }
        }
        return every;
    })
    return res.status(200).json({
        success: true,
        data: newUpdate
    })

})
router.get('/user/withIssuedBook', (req, res) => {
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
})
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