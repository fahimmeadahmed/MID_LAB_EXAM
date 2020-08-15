var express     = require('express');
var staffListModel = require('../models/employee');
var router      = express.Router();


router.get('/', function(req, res){

    staffListModel.getAll(function(results){
        var data={results:results}
        res.render('admin/allEmpList',data);
    });
});

module.exports = router;