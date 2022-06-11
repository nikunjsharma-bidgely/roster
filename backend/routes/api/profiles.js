const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../keys");


const Profile = require("../../schemas/Profile");
const User = require("../../schemas/User");

router.post("/all",authenticateToken,(req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    Profile.find().then(profiles => {
        res.json(profiles);
    })
})

router.post("/add",authenticateToken, (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    // const user = req.user;
    // if (!user.isAdmin) return res.sendStatus(403);

    const newProfile = Profile({
        empId: req.body.empId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        doj: req.body.doj,
        department: req.body.department,
        designation: req.body.designation,
    })

    newProfile
        .save()
        .then(user => res.json(user))
        .catch(err => res.json(err));

})
router.post("/delete",authenticateToken,(req,res)=>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const id = req.body.id;
    Profile.findByIdAndDelete(id,(err,docs)=>{
        if(err){
            res.sendStatus(404);
        }
        else{
            res.json(docs);
        }
    })
})
router.post("/update",authenticateToken,(req,res)=>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const id = req.body.id;
    const newProfile = ({
        empId: req.body.empId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        doj: req.body.doj,
        department: req.body.department,
        designation: req.body.designation,
    })
    Profile.findByIdAndUpdate(id,newProfile,(err,docs)=>{

        if(err){
            console.log(err);
            res.sendStatus(404);
        }
        else{
            res.json(docs);
        }
    })
})
router.post("/search", authenticateToken,(req,res)=>{
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const regex = new RegExp(req.body.name,'i');
    Profile.find({firstName:regex}).then(r1=>{
        Profile.find({lastName:regex}).then(r2=>{
            const combined = r1.concat(r2);
            res.json([...(new Set(combined))])
            
        })
    })
    
})

function authenticateToken(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const authHeader = req.body.auth ;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, keys.secretOrKey, (err, user) => {
        if (err) { console.log(err);return res.sendStatus(403); }
        req.user = user;
        return next();
    })
}
module.exports = router;