const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../schemas/User");


router.post("/register", (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: false,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.get("/verified",authenticateToken, (req,res) =>{
    res.json({verified: true});
})

router.post("/login", (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {

        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
    
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    isAdmin: user.isAdmin
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 3000 
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            isAdmin: user.isAdmin,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});


function authenticateToken(req, res, next){
    const authHeader = req.body.auth;
    const token = authHeader && authHeader.split(' ')[1];

    if(token==null){
        return res.sendStatus(401);
    }

    jwt.verify(token, keys.secretOrKey, (err,user)=>{
        if(err){return  res.sendStatus(403);}
        req.user = user;
        return next();
    } )
}

module.exports = router;