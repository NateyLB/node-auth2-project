const router = require("express").Router();
var jwtDecode = require('jwt-decode');


const Users = require("./users-model.js");


router.get("/", (req, res)=>{
    var decoded = jwtDecode(req.headers.token)
    Users.findBy({"users.username": decoded.username})
    .then(([user])=>{
        if(user.loggedIn === 1){
            Users.find().where("users.department", user.department)
            .then(users=>{
                res.status(200).json({ data: users})
            })
            .catch(err=>{
                res.status(500).json({message: "Could not get users"})
            })
        }else{
            res.status(500).json({ message: "Please login"})
        }
    })
})



module.exports = router;