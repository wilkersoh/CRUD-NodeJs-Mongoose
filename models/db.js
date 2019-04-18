const mongoose =  require("mongoose");
require("./employee.model");

mongoose.connect("mongodb://localhost:27017/CRUD", {
    useNewUrlParser: true }, (err) => {
        if(!err){console.log("MongoDB connected")}
        else {console.log("Error in DB connection")};
})
    
