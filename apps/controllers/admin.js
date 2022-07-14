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
        res.redirect("/admin/signin");
    }).catch(function (error) {
        res.render("signup",{data:{error:"Could not inser data to DB"}});
    });
    // if(!result){
    //     res.render("signup",{data:{error:"Could not inser data to DB"}});
    // }else {
    //     res.json({message:"Insert Success"});
    // }

});


router.get("/signin",function (req, res){
    res.render("signin",{data:{}});

});
router.post("/signin",function (req, res) {
    var params = req.body;
    console.log(params.password);
    console.log(params.email);
    if(params.email.trim().length==0){
        res.render("signin",{data:{error:"Please enter an email"}});
    }else {
        var data = user_md.getUserByEmail(params.email);
        if(data){
            data.then(function (users) {
                var user = users[0];
                console.log("user la: ");
                console.log(user);
                var status = helper.compare_password(params.password,user.password);
                console.log(params.password);
                console.log(user.password);
                if(!status){
                    res.render("signin",{data:{error:"Password Wrong"}});
                }else {
                    res.redirect("/admin/");
                }
            });

        }else {
            res.render("signin",{data:{error:"User not exist"}});
        }
    }
});

module.exports = router;