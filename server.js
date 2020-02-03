var http=require('http'); //用来启服务
var fs=require('fs'); //用来读取文件
var url = require("url");//用来获取url中的参数

//开启服务
var server=http.createServer(function(req,res){
    console.log(req.url);//返回001
    if(req.url==="/loginGithub.html"){
        fs.readFile("./loginGIthub.html",function(err,data){
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(data);//将index.html显示在客户端
            res.end();
        })
    }else{
        var arg = url.parse(req.url,true).query;
        //回调地址接收code
        if(arg && arg.code){
            //如果参数中有code，说明是GitHub通过重定向传递code
            //携带code请求token
            var param = "?client_id=1994fe209a6970a75a26" +
                "&client_secret=1c0de0b18501cfa419a250ebe855207ba6d2b6d7" +
                "&redirect_uri=http://localhost:8080" +
                "&state=" +
                "&code="+arg.code;

            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>token</h1><p>token</p>');
            res.end();
        }else{
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }
    }

}).listen(8080); //端口号
console.log('node server.js服务器开启成功: http://localhost:8080/loginGIthub.html');