### oauth2-client-login-js-github
公众号文章[《最简洁实现Github登录的JS代码示例》](https://mp.weixin.qq.com/s/aHwcOwNpGjYZc1VBzSENYw)配套代码

### 代码结构说明：
因为国内有时候访问Github速度较慢，所以同时准备了码云的代码示例。
1. 使用码云Gitee作为OAuth2 Server
    * loginGitee.html：前端
    * server-gitee.js: 后端
1. 使用Github作为OAuth2 Server
    * loginGithub.html：前端
    * server.js: 后端
    
两组代码示例分别运行即可。以Github代码组为主，如果访问Github较慢可以使用码云Gitee。

### 运行与演示
（以Github组示例为主）
1. 安装nodejs环境
1. 安装依赖的request工具包：`npm install --save request`
1. 运行:`node server.js`
1. 打开浏览器访问：http://localhost:8080/loginGithub.html
1. 点击按钮：`使用Github登录`

### 注意
1. 为方便大家运行此示例程序，代码中暴露了client_secret，关联的OAuth App地址：https://github.com/settings/applications/1214669。
望不要将此密钥用于非法用途，发现必究。
1. 大家最好在Github上注册各自的OAuth App。
   