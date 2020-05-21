const router = require("express").Router();
var jwtDecode = require('jwt-decode');


const Users = require("./users-model.js");

function isLoggedIn(req, res, next) {
    var decoded = jwtDecode(req.headers.token)
    console.log(decoded)
    Users.findBy({ "users.username": decoded.username })
        .then(([user]) => {
            console.log(user)
            if (user.loggedIn == 1) {
                req.user = user;
                next()
            } else {
                res.status(500).json({ message: "Please login" })
            }
        })

}


router.get("/", isLoggedIn, (req, res) => {
    Users.find().where("users.department", req.user.department)
        .then(users => {
            res.status(200).json({ data: users })
        })
        .catch(err => {
            res.status(500).json({ message: "Could not get users" })
        })
})






module.exports = router;