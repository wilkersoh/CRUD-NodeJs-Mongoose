const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required',
    },
    email: {
        type: String,
        required: 'This field is required'
    },
    mobile: {
        type: String,
        required: 'Provide your number.'
    },
    city: {
        type: String
    }
});

// Validation for email
employeeSchema.path("email").validate((val) => {
    emailRegex = 	
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model("node", employeeSchema);