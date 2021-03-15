var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/drawbar',function(req,res,next){
    var mysql = require('mysql');
    //配置连接
    var connection = mysql.createConnection({
      host: '2001:da8:a000:262:262::5',//主机地址
        user: 'root',//登录名
        password: '1234',//密码
        database: 'sensordb',//数据库
        timezone:'Europe/London'
    });

    connection.connect();
    var query = 'SELECT receiveTime,Tem,Hum,sensorIP FROM temhumsensor';
     // var queryTem = 'SELECT Tem FROM temhumsensor';
     // var queryHum = 'SELECT Hum FROM temhumsensor';



//以下调取数据库中的数据并去除无用字符串
    connection.query(query, function(err,rows,fields){
      var arrTime = [];
      var arrTem = [];
      var arrHum = [];
      var arrIP = [];
      for(var i=0;i<rows.length;i++){
     var Totaldata = JSON.stringify(rows[i]);
     var Totaldata = Totaldata.replace("{","");
     var Totaldata = Totaldata.replace("}","");
     var arr = Totaldata.split(",");
     Timedata = arr[0];
     Temdata = arr[1];
     Humdata = arr[2];
     IPdata = arr[3];

     var Timedata = Timedata.replace('"', '');
     var Timedata = Timedata.replace("receiveTime", " ");
     var Timedata = Timedata.replace(':', '');
     var Timedata = Timedata.replace('"', '');
     var Timedata = Timedata.replace('"', '');
     var Timedata = Timedata.replace("T", "--");
     var Timedata = Timedata.replace('"', '');
     var Timedata = Timedata.replace(".000Z", "");
     var Timedata = Timedata.replace("2019-", "");

     var Temdata = Temdata.replace('"', '');
     var Temdata = Temdata.replace('Tem', ' ');
     var Temdata = Temdata.replace('"', '');
     var Temdata = Temdata.replace(':', '');

     var Humdata = Humdata.replace('"', '');
     var Humdata = Humdata.replace('Hum', ' ');
     var Humdata = Humdata.replace('"', '');

     var IPdata = IPdata.replace('"', '');
     var IPdata = IPdata.replace('"', '');
     var IPdata = IPdata.replace('sensorIP', '端口');
     var IPdata = IPdata.replace('"', '');
     var IPdata = IPdata.replace('"', '');

    // console.log(Timedata);
    // console.log(Temdata);
    // console.log(Humdata);
    // console.log(IPdata);
    arrTime[i] = Timedata;
    arrTem[i] = Temdata;
    arrHum[i] = Humdata;
    arrIP[i] = IPdata;

}

res.json({listTime:arrTime,listTem:arrTem,listHum:arrHum,listIP:arrIP});
 });


});

module.exports = router;
