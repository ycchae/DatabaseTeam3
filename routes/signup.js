const express = require("express");
const alert = require("alert-node");

const {User} = require("../models/User");

const router = express.Router();

router.get("/", (req, res) => {
    res.render('signup', {
        pagetitle: 'Signup',
        pagecss: 'signup.css'
       });
});

router.post("/", async (req, res) => {
    const newRow = req.body;
    
    const check = await User.query()
        .where("user_email", "=", newRow["user_email"])
        .first();
    console.log(check);

    if (!check) {
        const newUser = {
            user_email: newRow["user_email"],
            user_password: newRow["user_password"],
            user_birthdate: new Date(newRow["user_birthdate"])
        };
        console.log(newUser);
        await User.query().insert(newUser);

        res.redirect("/login");
    }
    else{
        alert('이미 존재하는 이메일입니다.');
        res.redirect("/signup");
    }
});

module.exports = router;