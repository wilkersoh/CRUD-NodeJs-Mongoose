const express =  require("express");
const router = express.Router();
const mongoose = require("mongoose");
// 连接 db node
const Employee = mongoose.model("node")

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
})

router.post('/', (req, res) => {
    if(req.body._id == ''){
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res){
    let employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city =req.body.city;
    employee.save((err, doc) => {
        if(!err){
            res.redirect('employee/list');
        } else {
            if(err.name == 'ValidationError')
            handleValidationError(err, req.body);
            res.render("employee/addOrEdit", {
                viewTitle: "Insert Employee",
                employee: req.body
            });
        }
    })
}

function updateRecord(req, res){
    Employee.findOneAndUpdate({_id: req.body._id}, req.body, { new: true}, (err, doc) => {
        if(!err){
            res.redirect('employee/list');
        } else {
            if(err.name == "ValidationError"){
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "update Employee",
                    employee: req.body
                })
            }
        }
    })
}

router.get("/list", (req, res) => {
    // res.json("from list");
    Employee.find((err, docs) => {
        if(!err){
            res.render("employee/list",{
                list: docs
            })
        } else {
            console.log('Error in retrieving employee list')
        }
    });
})

function handleValidationError(err, body) {
    for(field in err.errors){
        switch ( err.errors[field].path){
            case 'fullName':
            // message 是对database里 require的 信息
            body['fullNameError'] = err.errors[field].message;
              break;
            case "email":
              body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    // 找data里的 id 然后更改资料
    Employee.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/employee/list');
        } else {
            console.log("Error in employee delete:" + err);
        }
    })
})

module.exports = router;