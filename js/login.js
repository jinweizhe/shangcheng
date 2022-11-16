//点击登录操作
let from = document.querySelector("form")
from.onsubmit = function (e) {
    //阻止表单的默认行为
    e.preventDefault()

    //获取表单数据
    let username = document.querySelector("[type=text]").value
    let password = document.querySelector("[type=password]").value

    console.log(username, password);
    request({
        method: "GET",
        path: "/api/login",
        query: `userName=${username}&password=${password}`
    }, function (data) {
        console.log(data);
        //code=0账号不存在，1有数据，密码错误  2登录成功
        if (data.code == 0) {
            alert("账号不存在")
            //重置表单
            from.reset();
            return
        } else if (data.code == 1) {
            alert("密码错误，请重新输入")
            //清除密码
            document.querySelector("[type=password]").value = ""
            return
        } else {
            alert("登录成功，即将跳转到首页")
            // 登录成功返回的数据:{
            //     code:2,
            //     token: "sgfhjsghjsdgjs",
            //     username : "lucy"
            //   }

            /* token:令牌﹔是一个身份凭证，用来鉴别用户身份;通常，登录成功后，服务器会返回一个token，浏览器需要将这个token保存下来。之后，一些需要识别用户身份的请求就需要携带这个token，服务器接收到请求，从请求中拿到token就可以知道这个用户的身份。 */
            /* 浏览器端存储数据;local:本地; storage:存储;
                    本地存储;只能存储基本类型的数据，复杂类型(数组、对象)需要通过JSON.stringify转化为字符串再存储。是持久化存储（不删除就一直存在，即使浏览器关闭)。本地存储最多存储5M的数据。 */
            localStorage.setItem("token", data.token);
            location.href = "../home.html"
        }
    })
}

let spans = document.querySelectorAll("span")
spans[0].addEventListener("click", function () {
    location.href = "../home.html"
})
spans[1].addEventListener("click", function () {
    location.href = "./zhuce.html"
})