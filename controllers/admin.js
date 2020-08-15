var express = require('express');
var userModel = require.main.require('../models/user');
var employeeModel = require.main.require('../models/employee');

var router = express.Router();

router.get('*', function(req, res, next){
    if(req.session.username == null){
        res.redirect('/login');
    }else{
        next();
    }
});

router.get('/', function(req, res){
    res.render('admin/index', {uname: req.session.username});
});


router.get('/allEmployeeList',function (req,res){
    if(req.session.username!=null){
        employeeModel.getAll(function (results){
            var data ={results:results}
            console.log(data);
            res.render('admin/allEmp',data);
        });

    }
    else {

    }
});

router.get('/update/:id',function (req,res) {
    if(req.session.username!=null){
        employeeModel.get(req.params.id,function (result) {
            console.log(result);
            res.render('admin/update',result);
        });
    }else {
        res.redirect('/login');
    }
});

router.post('/update/:id',function (req,res) {
    console.log(req.body);
    var emp=req.body;
    emp.id=req.params.id;
    employeeModel.update(emp,function(status){
        if(status){
            res.redirect('/admin/allEmployeeList');
        }
        else{
            res.send("All fields required");
        }
    });
});

router.get('/delete/:id',function (req,res) {
    if(req.session.username!=null){
        employeeModel.get(req.params.id,function (result) {
            console.log(result);
            res.render('admin/delete',result);
        });
    }else {
        res.redirect('/login');
    }
});

router.post('/delete/:id',function (req,res) {
    var id=req.params.id;
    employeeModel.delete(id,function(status){
        if(status){
            res.redirect('/admin/allEmployeeList');
        }
        else{
            res.send("Server Error");
        }
    });
});

router.get('/search',function (req, res) {
    if(req.session.username!=null){

        res.render('admin/search');

    }else {
        res.redirect('/login');
    }
});

router.get('/search/:searchString',function (req, res) {
    if(req.session.username!=null){

        employeeModel.search(req.params.searchString,function (results) {
            console.log(results);
            res.send(results);
        });

    }
});


module.exports = router;