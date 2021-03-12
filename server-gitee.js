const http = require('http'); //用来启动web服务
const fs = require('fs'); //用来读取文件
const url = require("url");//用来获取url中的参数
const request = require('request');//用来发起网络请求

//开启服务
const server = http.createServer(function (req, res) {
    res.writeHeader(200, {
        'content-type': 'text/html;charset="utf-8"'
    });

    if (req.url === "/loginGitee.html") {
        //返回页面
        fs.readFile("./loginGitee.html", function (err, data) {
            res.write(data);
            res.end();
        })
    } else {
        //获取回调地址中的code
        const arg = url.parse(req.url, true).query;
        //回调地址接收code
        if (arg && arg.code) {

            //如果参数中有code，说明是GitHub通过重定向传递code,携带code请求token
            const tokenUrl = "https://gitee.com/oauth/token" +
                "?client_id=0391e38b3f2017d77eb835d9a576b32828c554a38c0b45ecfa5ac2a57c96b470" +
                "&client_secret=35986c47881c7daf5c552030a4e06e1520030889b825569f8bb22c14151ea2df" +
                "&redirect_uri=http://localhost:8084" +
                "&grant_type=authorization_code" +
                "&state=" + arg.state +
                "&code=" + arg.code;

            //1 后台请求github的token
            request.post({url: tokenUrl}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    res.write('<h1>获取token失败</h1><p>' + err + '</p>');
                    res.end();
                } else {
                    // res.write('<h1>获取token成功</h1><p>' + body + '</p>');
                    // res.end();
                    //获取token成功
                    let accessToken = JSON.parse(body).access_token
                    
                    //2 使用token访问用户在github的信息
                    request({url: 'https://gitee.com/api/v5/user?access_token='+accessToken}
                    , function (error, response, b) {
                        if (error) {
                            res.write('<h1>获取token成功,但是使用token获取用户信息失败</h1><p>' + body + '</p>');
                            res.end();
                        } else {
                            res.write('<h1>获取token成功,使用token获取用户信息成功</h1><p>' + body + '</p><p>' + b + '</p>');
                            res.end();
                        }
                    })
                }
            });
        } else {
            res.write('<h1>404</h1><p>此示例只有 http://localhost:8084/loginGitee.html 一个页面</p>');
            res.end();
        }
    }
}).listen(8084); //端口号

console.log('服务器开启成功,请访问：http://localhost:8084/loginGitee.html');