const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../keys");


const Profile = require("../../schemas/Profile");
const User = require("../../schemas/User");

router.get("/all", authenticateToken, (req, res) => {
    Profile.find().then(profiles => {
        res.json(profiles);
    })
})

router.post("/add", authenticateToken, (req, res) => {
    const user = req.user;
    if (!user.isAdmin) return res.sendStatus(403);

    const newProfile = Profile({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        imgUrl: req.body.imgUrl,
        dob: req.body.doj,
        doj: req.body.doj,
        department: req.body.department,
        designation: req.body.designation,
    })

    newProfile
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));

})

router.get("/search", authenticateToken,(req,res)=>{
    const regex = new RegExp(req.body.name,'i');
    Profile.find({firstName:regex}).then(r1=>{
        Profile.find({lastName:regex}).then(r2=>{
            const combined = r1.concat(r2);
            res.json([...(new Set(combined))])
            
        })
    })
    
})

function authenticateToken(req, res, next) {
    const authHeader = req.body.auth;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, keys.secretOrKey, (err, user) => {
        if (err) { return res.sendStatus(403); }
        req.user = user;
        return next();
    })
}
module.exports = router;