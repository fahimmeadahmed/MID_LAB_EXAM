var express=require('express');
var router = express.Router();
var userModel=require('../models/employee');

router.get('/',function (req,res){
    res.render('admin/addEmployee');
});

router.post('/',function (req,res){
    console.log(req.body);
    var user={
        username:req.body.username,
        password:req.body.password,
        user_type:req.body.user_type
    };
    var userFlag;
    userModel.insert(user,function (result){
        console.log(result);
        if(result){
            res.redirect("/admin");
        }
        else{
            res.send("username taken </br> <a href='/admin/staff/addStaff'>try again</a>");
        }
    });

});



module.exports=router;