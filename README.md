### My note
* express-handlebars
* mongoose.Schema
* validation
* findOneAndUpdate()
* ValidationError
* for(x in obj) loop
* {{#each}}
* 通过mongodb的id来确定是insert还是update

#### express-handlebars
<p>epxress-handlebars和hbs有点差别，他的extname是 .handlerbars而不是 hbs</p>

#### Schema
<p>mongoose Schema里的 required 可以写 String</p>
<p>不必 required: true能够被String 代替。一样是true</p>
``` javascript
required: 'This field is required'
```

#### Validation
<p>'Invalid e-mail.' 当email不合标准就会返回这个</p>

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


#### ValidationError
<p>数据库储存save时出现和Schema不相同的就会err，它里面有个name: ValidationError，通过这个就知道是验证不通过</p>

``` javascript
Employee.findOneAndUpdate({_id: req.body._id}, req.body, { new: true}, (err, doc) => {
    if(err.name == "ValidationError"){
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit", {
            viewTitle: "update Employee",
            employee: req.body
        })
    }
}
```
#### for/in loop
<p>这个是循环会返回 string属性</p>
<p>errors里面也有path属性，它是指向Schema里哪个出错</p>

``` javascript
function handleValidationError(err, body) {
    for(field in err.errors){
        // 有 form 有 error的话
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
```

#### {{#each person}} -- {{/each}} from handlebars modules
<p>它的功能如下</p>

``` javascript
<ul class="people_list">
  {{#each people}}
    <li>{{this}}</li>
  {{/each}}
</ul>
// people context
{
  people: [
    "Yehuda Katz",
    "Alan Johnson",
    "Charles Jolley"
  ]
}
// result
<ul class="people_list">
  <li>Yehuda Katz</li>
  <li>Alan Johnson</li>
  <li>Charles Jolley</li>
</ul>

```
#### <input type="hidden" name="_id" value="{{employee._id}}">
<p>觉得很有意思，这个是通过有没有_id来检测是 update还是insert</p>
<p>如果是新create的话，它就不会有id这种东西。</p>
<p>this指向本身，它熏染的时候是通过"/list",它上面的data也是通过this来实现</p>
``` javascript
  <a href="/employee/{{this._id}}"><i class="fas fa-pencil-alt" aria-hidden="true"></i></a>
```
<p>通过点击目标的_id去到这个地址</p>
<p>然后取database找这个地址的资料，过后熏染网页</p>

``` javascript
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
```




