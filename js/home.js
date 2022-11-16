/* 
1. 项目的文件结构。
2. 一级分类数据获取并展示。
3. 从首页跳转到详情页面时，告诉详情页，应该显示哪个商品的数据？页面跳转时，将goodId数据以查询字符串的方式传递到详情页。
4. 请求封装
    任意请求，步骤是一样的，都是新建请求对象，与服务器建立链接，发送请求，监听请求状态变化，解析响应数据。
    不一样的是：请求方式、资源路径、携带数据、获取数据并解析后的后续操作。
    将请求封装为一个function；
    para1:options,请求的配置对象，包含：methed、path、query。
    para2:cb,回调函数，请求成功后执行该回调函数。回调函数必然有一个参数data（请求获取的数据）
5. 分页加载的实现；监听窗口滚动事件。
    添加 节流 操作，限制滚动回调函数的执行频率。
    1）每页数据请求
    2）判断是否到底部
    3）节流
    4）分页结束：当某次加载数据，获取数据长度小于一页的数据长度，说明没有下一页了
*/

// 获取一级分类并展示
var kinds = document.querySelector(".kinds");
request({ method: "GET", path: "/api/getTypeOne" }, function (data) {
    // console.log(data);
    // 数据渲染到页面。
    var html = "";
    for (var i = 0; i < data.length; i++) {
        html += `<li><a href="./pages/kinds.html?type_one=${data[i]}">${data[i]}</a></li>`
    }
    kinds.innerHTML = html;
});

// 分页加载
// 定义变量page，记录当前显示的第几页数据，初始值1；
var page = 1;
var container = document.querySelector(".container");
function loadMore() {
    request({
        method: "GET",
        path: "/api/goodList",
        query: "page=" + page
    }, function (data) {
        // console.log(data);
        var html = ""
        for (var i = 0; i < data.length; i++) {
            // onclick="showDetail(this)" 函数调用时，将当前元素作为参数传递(this)
            html += `
                <div class="cell" data-id="${data[i].Id}" data-keywords="${data[i].type_one}" onclick="showDetail(this)">
                    <img src="${data[i].img_list_url}" alt="">
                    <p>${data[i].title}</p>
                    <p>
                        <span> ${data[i].price} ¥</span>
                        <span>${data[i].mack}</span>
                    </p>
                </div>
            `
        }
        container.innerHTML += html;
        // 判断是否还有数据
        if (data.length < 30) {
            // 不够一页，说明没有下一页
            // 可以不在监听滚动事件了;
            window.onscroll = null;
        }
    })
}
// 调用加载首屏数据
loadMore();

// 监听窗口的滚动事件
window.onscroll = throttle(function () {
    // 可视区域高度
    var windowHeight = document.documentElement.clientHeight;
    // 页面滚动高度
    var scrollHeight = document.documentElement.scrollTop;
    // 获取html总高度
    var htmlHeight = document.documentElement.scrollHeight;
    if (windowHeight + scrollHeight >= htmlHeight - 5) {
        page++;
        loadMore();
    }
}, 2000);
// currentEle: 触发点击的元素。
function showDetail(currentEle) {
    // console.log(currentEle.dataset.id);
    // console.log(currentEle.dataset.keywords);
    location.href = `./pages/detail.html?goodId=${currentEle.dataset.id}&keywords=${currentEle.dataset.keywords}`
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
    location.href = "./home.html"
})

span[1].addEventListener("click", function () {
    if (this.innerHTML == "登录") {
        location.href = "./pages/login.html"
    }
})

span[2].addEventListener("click", function () {
    location.href = "./pages/zhuce.html"
})

span[3].addEventListener("click", function () {
    location.href = "./pages/login.html"
})
span[4].addEventListener("click", function () {
    document.querySelector("nav").style.display = "block"
})
btn[1].addEventListener("click", function () {
    localStorage.removeItem("token")
    location.href = "./pages/login.html"
})
btn[2].addEventListener("click", function () {
    document.querySelector("nav").style.display = "none"
})


// currentEle: 触发点击的元素。
function showDetail(currentEle) {
    console.log(currentEle.dataset.id);
    console.log(currentEle.dataset.keywords);
    if (span[1].innerHTML != "登录") {
        location.href = `./pages/detail.html?goodId=${currentEle.dataset.id}&keywords=${currentEle.dataset.keywords}`
    }
    else {
        alert("还未登录，请先登录！")
        location.href = "./pages/login.html"
    }
}


let lable = document.querySelector("label")
console.log(lable);
lable.addEventListener("click", function () {
    location.href = "./pages/shopcart.html"
})


let suosuo = document.querySelector(".sousuo")
console.log(suosuo);
btn[0].addEventListener("click", function () {
    console.log(suosuo.value);
    request({
        method: "GET",
        path: "/api/search",
        query: "word=" + suosuo.value
    }, function (data) {
        console.log(data);
        var html = ""
        for (var i = 0; i < data.length; i++) {
            // onclick="showDetail(this)" 函数调用时，将当前元素作为参数传递(this)
            html += `
                <div class="cell" id="xj" data-id="${data[i].Id}" data-keywords="${data[i].type_one}" onclick="showDetail(this)">
                    <img src="${data[i].img_list_url}" alt="">
                    <p>${data[i].title}</p>
                    <p>
                        <span> ${data[i].price} ¥</span>
                        <span>${data[i].mack}</span>
                    </p>
                </div>
            `
        }
        container.innerHTML = html;
        container.style.marginTop="100px"
        let sw = document.querySelector(".swiper.mySwiper")
        sw.style.display = "none"
    })
})


window.addEventListener("keyup", function (e) {
    // console.log(11);
    // console.log(e.key);
    if (e.key == "Enter") {
        btn[0].click();
    }
})