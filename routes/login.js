const express = require("express");
const router = express.Router();
const alert = require("alert-node");

const { User } = require("../models/User");

router.get('/', async(req, res) => {
  res.render('login', {
     pagetitle: 'Login',
     pagecss: 'login.css'
    });
    
});
router.post("/", async(req, res)=>{
    const credentials = req.body;

    const user = await User.query()
      .where("user_email", "=", credentials["user_email"])
      .where("user_password", "=", credentials["user_password"])
      .first();
    console.log(user);

    sess = req.session;

    if(user){
      sess.username = user['user_email'];
      sess.user_id = user['user_id'];
      res.redirect("/");
    }
    else {
      alert('아이디가 존재하지 않거나 비밀번호가 틀렸습니다.');
      res.redirect("/login");
    }
});

module.exports = router;