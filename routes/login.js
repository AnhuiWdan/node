"use strict";
const MyUser = require('../common/mongoose-db').MyUser;


module.exports = function (app) {
    app.get('/login', (req, res) => {
        res.render('login');
    });
    app.post('/login', (req, res)=>{
        let uname = req.body.uname;
        MyUser.findOne({name: uname}, (error, doc)=>{
            if(error) {
                
                res.sendStatus(500);
                console.log(error);
            } else if(!doc){
                req.session.error = '用户名不存在！';
                res.sendStatus(404);
            } else {
                if(req.body.upwd != doc.password){
                    req.session.error = "密码错误！";
                    res.sendStatus(404);
                } else {
                    req.session.user = doc;
                    res.sendStatus(200);
                }
            }
        });
    });
}