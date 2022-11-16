let tj = document.querySelector(".layui-btn")
let zh = document.querySelector("[name=title]")
let mm = document.querySelector("[name=password]")
let jc = document.querySelectorAll(".layui-form-mid")
let zhjy;
let mmjy;
zh.addEventListener("blur", function () {

    zhjy = /^[a-zA-Z0-9_-]{4,16}$/.test(zh.value)
    if (zhjy) {
        jc[0].innerText = "账号正确"
    } else {
        jc[0].innerHTML = "账号错误"
    }
})


mm.addEventListener("blur", function () {
    mmjy = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/.test(mm.value)
    if (mmjy) {
        jc[1].innerText = "密码格式正确"
    } else {
        jc[1].innerText = "密码格式错误"
    }
})

tj.addEventListener("click", function () {
    if (zhjy) {
        if (mmjy) {
            request({
                method: "GET",
                path: "/api/register",
                query: `userName=${zh.value}&password=${mm.value}`
            }, function (data) {
                console.log(data);
                if (data.code == 1) {
                    alert("注册成功，即将跳转到登录页")
                    location.href = "./login.html"
                } else {
                    alert("注册失败")
                    location.href = "./zhuce.html"
                }

            })
        } else {
            alert("密码格式不正确，请重新检查")
        }
    } else {
        alert("账号格式不正确,请重新检查")
    }
})

let spans = document.querySelectorAll("span")
spans[0].addEventListener("click", function () {
    location.href = "../home.html"
})
spans[1].addEventListener("click", function () {
    location.href = "./login.html"
})
