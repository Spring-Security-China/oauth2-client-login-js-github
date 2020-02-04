const http = require('http'); //用来启服务
const fs = require('fs'); //用来读取文件
const url = require("url");//用来获取url中的参数
const request = require('request');//用来发起网络请求

//开启服务
const server = http.createServer(function (req, res) {
    res.writeHeader(200, {
        'content-type': 'text/html;charset="utf-8"'
    });

    if (req.url === "/loginGithub.html") {
        fs.readFile("./loginGIthub.html", function (err, data) {
            res.write(data);
            res.end();//将index.html显示在客户端
        })
    } else {
        const arg = url.parse(req.url, true).query;
        //回调地址接收code
        if (arg && arg.code) {
            //如果参数中有code，说明是GitHub通过重定向传递code,携带code请求token
            const tokenUrl = "https://github.com/login/oauth/access_token?client_id=1994fe209a6970a75a26" +
            "&client_secret=1c0de0b18501cfa419a250ebe855207ba6d2b6d7" +
            "&redirect_uri=http://localhost:8080" +
            "&state=" + arg.state +
            "&code=" + arg.code;

            //后台请求github的token
            request.post({url: tokenUrl}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    res.write('<h1>获取token失败</h1><p>err</p>');
                    res.end();
                }else{
                    res.write('<h1>获取token成功</h1><p>body</p>');
                    res.end();
                }
            });
        } else {
            res.write('<h1>404</h1><p>此示例只有 http://localhost:8080/loginGithub.html 一个页面</p>');
            res.end();
        }
    }
}).listen(8080); //端口号

console.log('服务器开启成功,请访问：http://localhost:8080/loginGithub.html');