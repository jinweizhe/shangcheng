// 获取并处理从地址携带的数据；
// console.log(location.search);
var urlData = formatqueryString(location.search);
console.log(urlData);
var smallImgs
// 发请求获取商品详情。
request({
    method: "GET",
    path: "/api/detail",
    query: `goodId=${urlData.goodId}`
}, function (data) {
    console.log(data[0]);
    // 小图。
    smallImgs = JSON.parse(data[0].imgs);
    console.log(smallImgs);
    // <div>
    //     <img src="${data[0].img_list_url}" alt="">
    //         <p class="mask"></p>
    //         <section style="background-image:url(${data[0].img_list_url})"></section>
    // </div>
    var html = `
    <button class="fanhuis">返回上一级</button>
        <div>
            
        <aside>
            <div class="xt">
            <img src="${data[0].img_list_url}"
                alt="">
            <p class="mask"></p>
        </div>
        <div class="datu">
            <p>
                <img src="${data[0].img_list_url}"
                    alt="">
            </p>
        </div>
        </aside>
            <ul> `

    for (var i = 0; i < smallImgs.length; i++) {
        html += `<li><img src="${smallImgs[i]}" alt=""></li>`
    }

    html += ` </ul>
        </div>
        <div class="gwc">
            <h1>${data[0].title}</h1>
            <p class="p1">${data[0].supplier}</p>
            <p class="p1">￥${data[0].price}</p>
            <p class="p1">添加到购物车</p>
        </div>
    `
    // console.log(html)
    var commodityShow = document.querySelector(".commodityShow");
    commodityShow.innerHTML = html;
})

var container = document.querySelector(".container")
// 获取相似商品
request({
    method: "GET",
    path: "/api/goodList",
    query: `page=1&type_one=${urlData.keywords}`
}, function (data) {
    var html = ""
    for (var i = 0; i < 10; i++) {
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
    container.innerHTML = html;

})

// currentEle: 触发点击的元素。
function showDetail(currentEle) {
    // console.log(currentEle.dataset.id);
    // console.log(currentEle.dataset.keywords);
    location.href = `./detail.html?goodId=${currentEle.dataset.id}&keywords=${currentEle.dataset.keywords}`
}





let commodityShow = document.querySelector(".commodityShow");
console.dir(commodityShow.childNodes);

let r = null;
r = setInterval(function () {
    if (commodityShow.childNodes.length != 0) {
        clearInterval(r)
        r = null

        //返回上下级
        let fanhuis = document.querySelector(".fanhuis")
        fanhuis.addEventListener("click", function () {
            history.back()
        })

        //获取所有元素
        let mask = document.querySelector(".mask");
        console.log(mask);
        let datu = document.querySelector(".datu");
        let xt = document.querySelector(".xt");
        let p = document.querySelector(".datu>p")
        //鼠标移入显示mask块和放大的块
        xt.addEventListener("mouseover", function () {
            mask.style.display = "block"
            datu.style.display = "block"
        })
        xt.addEventListener("mouseout", function () {
            mask.style.display = "none"
            datu.style.display = "none"
        })
        //鼠标移入隐藏mask块和放大的块
        xt.addEventListener("mousemove", function (e) {
            //获取鼠标在浏览器中的坐标e.pageX，e.pageY 
            //offsetLeft获取当前对象的左边距和上边距
            //两者相减就是鼠标在盒子中的坐标
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;

            //将鼠标光标移入到遮罩层mask的中央位置
            var maskx = x - mask.offsetWidth / 2
            var masky = y - mask.offsetHeight / 2

            //遮罩层父元素的宽-遮罩层的宽，剩余的就是可移动部分，即:max为最大可移动距离
            var max = xt.offsetWidth - mask.offsetWidth
            if (maskx <= 0) {
                maskx = 0
            } else if (maskx >= max) {
                maskx = max;
            }
            //y坐标同上方解释同理
            if (masky <= 0) {
                masky = 0
            } else if (masky >= max) {
                masky = max;
            }

            // 将判断完的mask的xy坐标赋值给mask的上左边距
            mask.style.left = maskx + "px"
            mask.style.top = masky + "px"


            //大图跟着滚动                                                                         
            //大图片最大可移动距离，解释同max的一样
            var imgs = datu.offsetWidth - p.offsetWidth
            // 由1/2=x/4可得x=1*4/2    所以大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
            var bigx = maskx * imgs / max
            var bigy = masky * imgs / max

            //得到大图片移动距离，然后赋值给p标签上，让p标签处于小图的移动事件内，在小图移动，大图片跟着动
            p.style.left = bigx + "px"
            p.style.top = bigy + "px"
        })

        let li = document.querySelectorAll("ul>li")
        let img = document.querySelector(".xt>img")
        let dt = document.querySelector(".datu>p>img")
        for (let s = 0; s < li.length; s++) {
            li[s].addEventListener("click", function () {
                img.src = `${smallImgs[s]}`
                dt.src = `${smallImgs[s]}`
            })
        }
    }
}, 50)


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


// currentEle: 触发点击的元素。
function showDetail(currentEle) {
    console.log(currentEle.dataset.id);
    console.log(currentEle.dataset.keywords);
    if (span[1].innerHTML != "登录") {
        location.href = `./detail.html?goodId=${currentEle.dataset.id}&keywords=${currentEle.dataset.keywords}`
    }
    else {
        alert("还未登录，请先登录！")
        location.href = "./login.html"
    }
}


let lable = document.querySelector("label")
lable.addEventListener("click", function () {
    location.href = "./shopcart.html"
})
