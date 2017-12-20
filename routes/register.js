"use strict";
const MyUser = require('../common/mongoose-db').MyUser;

module.exports = function (app) {

    // 进入注册页
    app.get('/', (req, res) => {
       
        res.render('register');
    });
    //同上
    app.get('/register', (req, res) => {
       
        res.render('register');
    });

    //注册方法
    app.post('/register', (req, res) => {
        let uname = req.body.uname;
        
        MyUser.findOne({ name: uname }, (error, doc) => {
            if(error){
                res.sendStatus(500);
                req.session.error = '网络异常错误';
                console.log(error);
            } else if (doc) {
                req.session.error = '用户名已经存在！';
                //res.json({code:1});
                res.sendStatus(500);
            } else {
                let userName = new MyUser({
                    name: uname,
                    password: req.body.upwd
                });
                userName.save(function(err){
                    if(err){
                        res.sendStatus(500);
                        console.log(err);
                    } else {
                        console.log('存入成功!');
                        req.session.error = '存入成功!';
                        res.sendStatus(200);
                    }
                });
            }
        });
    });


}