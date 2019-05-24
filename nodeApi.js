let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser')
let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/user',(req,res)=>{
    res.end(JSON.stringify({
        name:'zs',
        age: 18
    }))
})

app.post('/login',(req,res)=>{
    console.log(req.body);
    let {password} = req.body;
    if( password === 123456){
        res.send({token:'jjjkkk'})
    }else{
        res.send({error:'密码错误'})
    }
})
app.listen(9898)
