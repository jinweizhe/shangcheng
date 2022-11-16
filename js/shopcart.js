let token = localStorage.getItem("token")
let ul = document.querySelector(".gwclb")
request({
    method: "GET",
    path: "/api/shoplist",
    query: `token=${token}`
}, function (data) {
    // console.log(data);
    let html = ""
    for (let i = 0; i < data.length; i++) {
        html += `<ul class="gwul">
    <li>
        <input class="kuang" type="checkbox">
        <img src="${data[i].img_list_url}" alt="">
    </li>
    <li><span>${data[i].title}</span></li>
    <li><span>分类：${data[i].type_two}</span></li>
    <li><span>${data[i].price}￥</span></li>
    <li>
         <span>
         <button class="add">+</button>
         <span>${data[i].count}</span>
         <button class="jian">-</button>
         </span>
    </li>
    <li><span>${data[i].price * data[i].count}</span></li>
    <li><span><a href="javascript:;" class="shanchu">删除</a></span></li></ul>
`
    }
    ul.innerHTML += html
    xj(data)
})

function xj(data) {
    let btn1 = document.querySelectorAll(".add")
    let btn2 = document.querySelectorAll(".jian")
    let span = document.querySelectorAll(".gwul>li:nth-child(5)>span>span")
    let span1 = document.querySelectorAll(".gwul>li:nth-child(6)>span")

    let shanchu = document.querySelectorAll(".shanchu")
    let tjsl = document.querySelectorAll(".tongji>span")
    let price;
    // console.log(span);
    // console.log(btn1, btn2);
    let num;
    for (let a = 0; a < btn1.length; a++) {
        // let count1 = 0
        let count = data[a].count
        num = count;

        btn1[a].addEventListener("click", function () {
            count++
            // console.log(count);
            // console.log(span[a]);
            tongji1()
            request({
                method: "GET",
                path: "/api/add",
                query: `goodId=${data[a].Id}&token=${token}`
            }, function (data) {
                // console.log(data);
            })
            span[a].innerHTML = count
            span1[a].innerHTML = count * data[a].price

        })

        btn2[a].addEventListener("click", function (e) {
            tongji1()
            request({
                method: "GET",
                path: "/api/remove",
                query: `goodId=${data[a].Id}&token=${token}`
            }, function (data) {
            })

            count--
            if (count < 1) {
                count = 0
                span[a].innerHTML = count
                span1[a].innerHTML = count * data[a].price
                btn2[a].disabled = true
                return false
            }
            console.log(count);
            btn2[a].disabled = false
            span[a].innerHTML = count
            span1[a].innerHTML = count * data[a].price
        })


        shanchu[a].addEventListener("click", function () {
            request({
                method: "GET",
                path: "/api/del",
                query: `goodId=${data[a].Id}&token=${token}`
            }, function (data) {
                // console.log(data);
                console.log("删除成功");
            })


            let c = tjsl[0].innerHTML
            let e = tjsl[1].innerHTML
            let d = parseInt(c.split("：")[1])
            let f = parseInt(e.split("：")[1])


            let b = parseInt(span[a].innerHTML)
            let h = parseInt(span1[a].innerHTML)
            console.log(b, h);
            if (!tjsl[0].innerHTML.includes(0)) {
                tjsl[0].innerHTML = `总数量：${d - b}件`
                tjsl[1].innerHTML = `总金额：${f - h}￥`
            }
            this.parentNode.parentNode.parentNode.remove()
        })


        let qx = document.querySelector(".qx")
        let xfxk = document.querySelectorAll(".kuang")
        qx.addEventListener("click", function () {
            xfxk[a].checked = qx.checked
            tongji1()

        })
        xfxk[a].addEventListener("click", function () {
            for (let j = 0; j < xfxk.length; j++) {
                if (xfxk[j].checked == false) {
                    tongji1()
                    qx.checked = false
                    return
                }
            }
            qx.checked = true
            tongji1()
        })
    }





    function tongji1() {
        let xfxk = document.querySelectorAll(".kuang")
        let he = 0
        let xj = 0
        for (let p = 0; p < span.length; p++) {
            if (xfxk[p].checked) {
                he += parseInt(span1[p].innerHTML)
                xj += parseInt(span[p].innerHTML)
            }
            tjsl[0].innerHTML = `总数量：${xj}件 `
            tjsl[1].innerHTML = `总金额：${he}￥ `
        }
    }
    tongji1()
}





let span = document.querySelectorAll("span")
let ab = localStorage.getItem("token")
let btn = document.querySelectorAll("button")
if (ab) {
    span[2].style.display = "none"
    span[1].innerHTML = `欢迎回来`
} else {
    span[3].style.display = "none"
    span[4].style.display = "none"
}

span[0].addEventListener("click", function () {
    location.href = "../home.html"
})

span[1].addEventListener("click", function () {
    if (this.innerHTML == "登录") {
        location.href = "./login.html"
    }
})

span[2].addEventListener("click", function () {
    location.href = "./zhuce.html"
})

span[3].addEventListener("click", function () {
    location.href = "./login.html"
})
span[4].addEventListener("click", function () {
    document.querySelector("nav").style.display = "block"
})
btn[0].addEventListener("click", function () {
    localStorage.removeItem("token")
    location.href = "./login.html"
})
btn[1].addEventListener("click", function () {
    document.querySelector("nav").style.display = "none"
})

let lable = document.querySelector("label")
lable.addEventListener("click", function () {
    location.href = "./shopcart.html"
})