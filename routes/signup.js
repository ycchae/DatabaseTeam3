const express = require("express");
const alert = require("alert-node");

const {User} = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
    const newRow = req.body;
    console.log(newRow);
    const check = await User.query()
        .where("user_email", "=", newRow["user_email"])
        .first();


    if (!check) {
        const newUser = {
            user_email: newRow["user_email"],
            user_password: newRow["user_password"],
            user_birthdate: newRow["user_birthdate"]
        };
        console.log(newRow);
        const user = await User.query().insert(newUser);

        res.send({success:1});
    }
    else{
        alert('이미 존재하는 이메일입니다.');
        res.redirect("/signup");
    }
});

router.get("/", (req, res) => {
    res.render("signup");
});

module.exports = router;