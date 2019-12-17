const express = require("express");
const alert = require("alert-node");

const {User} = require("../models/User");

const router = express.Router();

router.post("/", async(req, res)=>{
    const credentials = req.body;

    const user = await User.query()
      .where("user_email", "=", credentials["user_email"])
      .where("user_password", "=", credentials["user_password"])
      .first();
    console.log(user);

    if(user)
    res.send({
        success: 1,
        user_email: user["user_email"],
        user_birthdate: user["user_birthdate"]
    });
    else {
      alert('아이디가 존재하지 않거나 비밀번호가 틀렸습니다.');
      res.redirect("./");
    }
});

module.exports = router;