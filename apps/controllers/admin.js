var express = require("express");
var router = express.Router();
var user_md = require("../models/user");
var helper = require("../helpers/helper");


router.get("/",function (req, res) {
    res.json({"message":"This is Admin page"})
});

router.get("/signup",function (req, res){
    res.render("signup",{data:{}});

});
router.post("/signup",function (req, res) {
    var user = req.body;
    if(user.email.trim().length==0){
        res.render("signup",{data: {error: "Email is required"}});
    }
    if(user.password!= user.repassword && user.password.trim().length!=0){
        res.render("signup",{data:{error: "Password Not Match"}});
    }
    // Insert to DB

    var password = helper.hash_password(user.password);
    user ={
        email: user.email,
        password:password,
        first_name:user.firstname,
        last_name:user.lastname

    };

    // user_md.addUser(user);
    //var result = user_md.addUser(user);

    var result = user_md.addUser(user);

    result.then(function (data) {
        res.json({message:"insert Success!"});
    }).catch(function (error) {
        res.render("signup",{data:{error:"Could not inser data to DB"}});
    });
    // if(!result){
    //     res.render("signup",{data:{error:"Could not inser data to DB"}});
    // }else {
    //     res.json({message:"Insert Success"});
    // }

});
module.exports = router;