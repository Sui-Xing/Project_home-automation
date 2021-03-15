var express = require('express');
var router = express.Router();
// 以下输出统计表信息
router.post('/tongjibiao',function(req,res,next){
    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host: '2001:da8:a000:262:262::5',
        user: 'root',
        password: '1234',
        database: 'sensordb',
        timezone:'Europe/London'
    });
    connection.connect();
    var query = 'SELECT ID,receiveTime,Tem FROM temhumsensor';
    connection.query(query, function(err,rows,fields){
      var arrID = [];
      var arrTime = [];
      var arrTem = [];
      for(var i=0;i<rows.length;i++){
     var Totaldata = JSON.stringify(rows[i]);
     var Totaldata = Totaldata.replace("{","");
     var Totaldata = Totaldata.replace("}","");
     var arr = Totaldata.split(",");
     Timedata = arr[1];
     Temdata = arr[2];
     IDdata = arr[0];
     var Timedata = Timedata.replace('"', '');
     var Timedata = Timedata.replace("receiveTime", " ");
     var Timedata = Timedata.replace(':', '');
     var Timedata = Timedata.replace('"', '');
     var Timedata = Timedata.replace('"', '');
     var Timedata = Timedata.replace("T", "--");
     var Timedata = Timedata.replace('"', '');
     var Timedata = Timedata.replace(".000Z", "");
     //var Timedata = Timedata.replace("2019-", "");

      var Temdata = Temdata.replace('"', '');
     var Temdata = Temdata.replace('Tem', ' ');
     var Temdata = Temdata.replace('"', '');
    var Temdata = Temdata.replace(':', '');

    var IDdata = IDdata.replace('"', '');
    var IDdata = IDdata.replace('"', '');
    var IDdata = IDdata.replace('ID', '');
    var IDdata = IDdata.replace('"', '');
    var IDdata = IDdata.replace(':', '');
    var IDdata = IDdata.replace('"', '"');
    var IDdata = IDdata.replace('"', '"');
    var IDdata = IDdata.replace('"', '');

    arrTime[i] = Timedata;
    arrTem[i] = Temdata;
    arrID[i] = IDdata;

}
 //console.log(arrID);
 //console.log(arrTem);
//console.log(arrTime);
res.json({listTime:arrTime,listTem:arrTem,listID:arrID});
// res.json(
//
//         [{"userID":"111","Tem":"33","time":"2019-1-1"},{"userID":"112","Tem":"34","time":"2019-1-2"}]);
   });

});

//以下输出直方图信息
router.post('/zhifangtu',function(req,res,next){
    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host: '2001:da8:a000:262:262::5',
        user: 'root',
        password: '1234',
        database: 'sensordb',
        timezone:'Europe/London'
    });
    connection.connect();
    var query = 'SELECT Tem FROM temhumsensor';
    connection.query(query, function(err,rows,fields){
      var arrTem = [];
      for(var i=0;i<rows.length;i++){
     var Totaldata = JSON.stringify(rows[i]);
     var Totaldata = Totaldata.replace("{","");
     var Totaldata = Totaldata.replace("}","");
     var Temdata = Totaldata;
     var Temdata = Temdata.replace('"', '');
     var Temdata = Temdata.replace('Tem', ' ');
     var Temdata = Temdata.replace('"', '');
     var Temdata = Temdata.replace(':', '');
    arrTem[i] = Temdata;
}
res.json({listTem:arrTem});
 });
});

//以下输出饼状图信息
router.post('/bingzhuangtu',function(req,res,next){
    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host: '2001:da8:a000:262:262::5',
        user: 'root',
        password: '1234',
        database: 'sensordb',
        timezone:'Europe/London'
    });
    connection.connect();
    var query = 'SELECT Tem FROM temhumsensor';
    connection.query(query, function(err,rows,fields){
      var arrTem = [];
      for(var i=0;i<rows.length;i++){
     var Totaldata = JSON.stringify(rows[i]);
     var Totaldata = Totaldata.replace("{","");
     var Totaldata = Totaldata.replace("}","");
     var Temdata = Totaldata;
     var Temdata = Temdata.replace('"', '');
     var Temdata = Temdata.replace('Tem', ' ');
     var Temdata = Temdata.replace('"', '');
     var Temdata = Temdata.replace(':', '');
    arrTem[i] = Temdata;
}
res.json({listTem:arrTem});
 });
});

//以下输出数据分析
router.post('/shujufenxi',function(req,res,next){
    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host: '2001:da8:a000:262:262::5',
        user: 'root',
        password: '1234',
        database: 'sensordb',
        timezone:'Europe/London'
    });
    connection.connect();
    var query = 'SELECT Tem FROM temhumsensor';
    connection.query(query, function(err,rows,fields){
      var arrTem = [];
      for(var i=0;i<rows.length;i++){
     var Totaldata = JSON.stringify(rows[i]);
     var Totaldata = Totaldata.replace("{","");
     var Totaldata = Totaldata.replace("}","");
     var Temdata = Totaldata;
     var Temdata = Temdata.replace('"', '');
     var Temdata = Temdata.replace('Tem', ' ');
     var Temdata = Temdata.replace('"', '');
     var Temdata = Temdata.replace(':', '');
    arrTem[i] = Temdata;
}
res.json({listTem:arrTem});
 });
});


module.exports = router;
