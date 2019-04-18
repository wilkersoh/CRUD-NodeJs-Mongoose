### My note
* express-handlebars
* mongoose.Schema
* validation
* findOneAndUpdate()

#### express-handlebars
<p>epxress-handlebars和hbs有点差别，他的extname是 .handlerbars而不是 hbs</p>

#### Schema
<p>mongoose Schema里的 required 可以写 String</p>
<p>不必 required: true能够被String 代替。一样是true</p>
``` javascript
required: 'This field is required'
```

#### Validation
``` javascript
// from database file
employeeSchema.path("email").validate((val) => {
    emailRegex = 	
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(val);
}, 'Invalid e-mail.');
```
<p>validationError 是 上面如果返回这个，它就把哪个用函数handleValitionError渲染</p>
``` javascript 
    if(err.name == 'ValidationError')
    handleValidationError(err, req.body);
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee",
        employee: req.body
    });
```

#### findOneAndUpdate()
              条件  update
               v     v
<p>接受4个参数 query, doc , options, cb(err, doc)</p>
<p>Options new 接受 boolean， true代表更换新更改的资料去覆盖旧的资料, default is false</p>

