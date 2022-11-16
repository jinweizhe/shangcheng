//获取当前的一级分类
let type_one = location.search.split("=")[1]
//解码
type_one = decodeURI(type_one)
// console.log(type_one);

let kinds = document.querySelector(".kinds")
request({
    method: "GET",
    path: "/api/getTypeOne",
}, function (data) {
    // console.log(data);
    let html = ""
    for (let i = 0; i < data.length; i++) {
        html += `
        <li><a href="./kinds.html?type_one=${data[i]}">${data[i]}</a></li>
        `
    }
    kinds.innerHTML += html
})


//获取二级分类并展示(请求发送太多，不推荐，看下面这种方法)
// let type_Two = document.querySelector(".typeTwo")
// request({
//     method: "GET",
//     path: "/api/getTypeTwo",
//     query: `type_one=${type_one}`
// }, function (data) {
//     console.log(data);
//     let html = ""
//     for (let i = 0; i < data.length; i++) {
//         // console.log(data[i])
//         html += `<li>${data[i]}</li>`
//     }
//     type_Two.innerHTML = html

//     // 遍历二级分类数组，发送请求，获取该二级分类下的商品列表
//     //不推荐for循环遍历发送多个请求
//     for (let j = 0; j < data.length; j++) {
//         console.log(data[j]);
//         request({
//             method: "GET",
//             path: "/api/getTypeTwoList",
//             query: `type_one=${type_one}&type_two=${data[j]}`
//         }, function (data) {
//             console.log(data);
//         })
//     }

// })

//获取二级分类并展示(二)
//根据一级分类，获取该一级分类下的所有商品，并通过type_two关键词获取二级列表
request({
    method: "GET",
    path: "/api/goodList",
    query: `type_one=${type_one}`
}, function (data) {
    // console.log(data);
    //将商品按照二级分类分组

    //1。得到所有的二级分类(map：数组映射)
    //获取数组每个元素中的type_two属性，返回一个数组
    let typetwolist = data.map(function (value) {
        return value.type_two
    })
    // console.log(typetwolist);
    //2.二级分类数组去重
    //将数组转化为集合，再将集合转化为数组，set:设置、集合。（集合的一大特点是元素不重复，因此将数组转化为集合是会自动去重）
    let set = new Set(typetwolist)
    // console.log(set);
    //使用Array.from()方法，转化为数组
    typetwolist = Array.from(set)
    // console.log(typetwolist);

    //生成结果数组
    //循环所有数据与typetowlist数组中的二级标题进行判断，相同则放置同类产品列表中，数组处理格式如下
    /* 
      let resultArr=[
          {
              type_two:"连衣裙",
              list:[
                  {},{}
              ]
          },
          {
              type_two:"T恤",
              list:[
                  {},{}
              ] 
          }
      ]
     */
    let resultArr = []
    //   遍历二级分类数组
    for (let x = 0; x < typetwolist.length; x++) {
        // console.log(typetwolist[x]);
        //一个二级分类，对应一个对象，对象中包含两个字段，type_two就是二级分类，list是该二级分类下的所有商品
        //过滤商品数组，得到该二级分类下的所有商品
        let list = data.filter(function (value) {
            // console.log(value.type_two);
            return value.type_two == typetwolist[x]
        })

        let obj = {
            type_two: typetwolist[x],
            list: list
        }
        resultArr.push(obj)
    }


    let xj = ""
    let aside = ""
    let container = document.querySelector(".container")
    let typeTo = document.querySelector(".typeTo")
    for (let a = 0; a < resultArr.length; a++) {
        xj += `
        <h1>${resultArr[a].type_two}</h1></br>
        `
        aside += `<li>${resultArr[a].type_two}</li>`
        for (var i = 0; i < resultArr[a].list.length; i++) {
            // onclick="showDetail(this)" 函数调用时，将当前元素作为参数传递(this)
            xj += `
            <div class="cell" data-id="${resultArr[a].list[i].Id}" data-keywords="${resultArr[a].list[i].type_one}" onclick="showDetail(this)">
                <img src="${resultArr[a].list[i].img_list_url}" alt="">
                <p>${resultArr[a].list[i].title}</p>
                <p>
                    <span> ${resultArr[a].list[i].price} ¥</span>
                    <span>${resultArr[a].list[i].mack}</span>
                </p>
            </div>
        `
        }
    }
    container.innerHTML += xj;
    typeTo.innerHTML += aside;
})



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



let fhdb = document.querySelector(".fhdb")
let ul = document.querySelector(".typeTo").childNodes
let time = null;
let count = -1;
time = setInterval(function () {
    if (ul.length != 0) {
        let li1 = document.querySelectorAll(".typeTo>li")
        let h1 = document.querySelectorAll("h1")
        clearInterval(time)
        time = null;



        for (let c = 0; c < li1.length; c++) {
            li1[c].addEventListener("click", function () {
                let h = h1[c].offsetTop
                if (c == 0) {
                    scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth"
                    })
                } else {
                    scrollTo({
                        top: h - 100,
                        left: 0,
                        behavior: "smooth"
                    })
                }
            })
            window.addEventListener("scroll", function () {
                let top = document.documentElement.scrollTop
                if (top > 1000) {
                    fhdb.style.display = "block"
                } else {
                    fhdb.style.display = "none"
                }
                for (let d = 0; d < h1.length; d++) {
                    if (this.document.documentElement.scrollTop >= h1[d].offsetTop - 150) {
                        for (let v = 0; v < li1.length; v++) {
                            li1[v].style.textShadow = "none"
                            li1[v].style.fontWeight = "normal"
                        }
                        li1[d].style.fontWeight = "bolder"
                        li1[d].style.textShadow = "5px 5px 8px purple"
                    }
                }
            })
        }

        fhdb.addEventListener("click", function () {
            scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            })
        })
    }


}, 50)

