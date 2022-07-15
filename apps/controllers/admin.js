var express = require("express");
var router = express.Router();
var user_md = require("../models/user");
var post_md = require("../models/post");
var helper = require("../helpers/helper");


router.get("/",function (req, res) {

    var data = post_md.getAllPosts();
    data.then(function (posts) {
        var data ={
            posts:posts,
            error: false
        };
        res.render("admin/dashboard",{data:data});
    }).catch(function (err){
        res.render("admin/dashboard",{data:{error:"Get Post Data error"}});
    });

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

router.get("/post/new",function (req, res) {
    res.render("admin/post/new",{data:{error:false}});
});


router.post("/post/new",function (req, res) {
    var params = req.body;
    var now = new Date();
    params.created_at = now;
    params.updated_at = now;
    if(params.title.trim().length==0){
        res.render("admin/post/new",{data:{error:"Please enter a title"}});
    }else {
        var data = post_md.addPost(params);


        data.then(function (result) {
            res.redirect("/admin");
        }).catch(function (err) {
            var data = {
                error:"Could not insert post"
            };
            res.render("admin/post/new",{data:data});

        });
    }



});

router.get("/post/edit/:id",function (req, res) {
    var params = req.params;
    var id = params.id;
    var data = post_md.getPostById(id);
    if(data){
        data.then(function (posts){
            var post = posts[0];
            var data = {
                post:post,
                error:false
            };
            res.render("admin/post/edit",{data:data});
        }).catch(function (err) {
            var data ={
                error: "could not get post by ID"
            }
            res.render("admin/post/edit",{data:data});
        });
    }else {
        var data ={
            error: "could not get post by ID"
        }
        res.render("admin/post/edit",{data:data});
    }

    
})

router.put("/post/edit",function (req, res) {
    var params = req.body;
    data = post_md.updatePost(params);
    console.log(params.title);
    if(!data){
        res.json({status_code:500});
    }else {
        data.then(function (result) {
            res.json({status_code:200});
        }).catch(function (err) {
            res.json({status_code:500});
        })

    }
})


module.exports = router;