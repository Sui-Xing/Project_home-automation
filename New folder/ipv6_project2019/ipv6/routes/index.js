var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/test1', function(req, res, next) {
    res.render('test1');
});
router.post('/test', function(req, res, next) {
    res.render('test');
});

router.post('/test2', function(req, res, next) {
    res.render('test2');
});



module.exports = router;




















//添加登录验证
router.post('/test', function(req, res, next) {
    var name = req.body.username;
    var pwd = req.body.password;
    var mysql = require('mysql');
    //配置连接
    var connection = mysql.createConnection({
        host: 'localhost',//主机地址
        user: 'root',//登录名
        password: 'chenweining',//密码
        database: 'ipv6'//数据库
    });
    //输入验证
    // if (!name || name == "") {
    //
    //     res.send('用户名不能为空');
    //     return;
    // }
    // if (!pwd || pwd == "") {
    //
    //     res.send('密码不能为空');
    //     return;
    // }
    //查库比较
//     connection.connect();
//     connection.query('SELECT COUNT(*) checkNum FROM `user` WHERE username = \'' + name + '\' AND password =\'' + pwd + '\'', function (err, rows, fields) {
//         if (err) throw err;
//         var checkNum = rows[0].checkNum;
//         console.log('结果为: ', rows[0].checkNum);
//         if (checkNum == 0) {
//             console.log('账号或密码不正确');
//             res.send('账号或密码不正确');
//         } else {
//             console.log('登录成功');
//             //返回结果
//             res.send('登录成功，账号密码为：' + name + "---" + pwd);
//         }
//     });
//     //关闭连接
//     connection.end();
// });
    connection.connect();
    var query = 'SELECT * FROM user WHERE username=' + mysql.escape(name) +'AND password=' + mysql.escape(pwd);
    connection.query(query, function(err,rows,fields){
     if(err){console.log(err);
     return;
     }
     var user = rows[0];
     if(user){

         setTimeout(function(){ res.render('test'); }, 2000);
       console.log("登录成功");


     }
     else{
       console.log("登录失败");
       res.send('登录失败！！！请退出重登！！！');
     }
    })




});
