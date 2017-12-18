var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.set('debug', true);

var db = mongoose.connect('mongodb://localhost/test');

db.connection.on('error', function(error){
    console.log('数据库链接失败：'+error);
});

db.connection.on('open', function(){
    console.log('数据库连接成功');
});
