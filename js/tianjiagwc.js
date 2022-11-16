console.log(container.childNodes);
let dsq1 = null;
let token = localStorage.getItem("token")
console.log(token);
dsq1 = setInterval(function () {
    if (container.childNodes.length != 0) {
        clearInterval(dsq1)
        dsq1 = null
        let lp = document.querySelector(".gwc>p:last-child")
        console.log(lp);
        lp.addEventListener("click", function () {
            request({
                method: "GET",
                path: "/api/add",
                query: `goodId=${urlData.goodId}&token=${token}`
            }, function (data) {
                // console.log(data);
                alert("添加成功")
            })
        })
    }
}, 50)