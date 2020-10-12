// window.onload = function () {
// 商品的父父元素
var showCon = document.getElementsByClassName('goodsshow-con')[0];
var qgBut = document.getElementsByClassName('qg-but')[0];
var hTotal = document.getElementsByClassName('car-tip2')[0];
showCon.onclick = function (evt) {
    var e = evt.target || evt.srcElement;//兼容的写法
    //预定是点击图片进行选择，所以取其父元素，因为勾是放在item上的
    var ee = e.parentElement || e.parentNode;
    if (ee.classList.contains("itemHidden")) {
        ee.classList.remove("itemHidden");
        // 选入购物车
        var i = becomeObj(ee);
        carItemAdd(i)
    } else {
        ee.classList.add("itemHidden");
        // 从购物车中去除
        var ID = ee.dataset.itemid;
        carItemRemove(ID);
    }
    var total = carTotal();
    // 显示加入购物车的数量
    hTotal.innerText = total.总数;
}
function becomeObj(ele) {
    item = {};
    item.ID = ele.dataset.itemid;//从ele这里得到id
    item.品名 = ele.getElementsByClassName('item-name')[0].innerText;
    item.价格 = ele.getElementsByClassName('item-money')[0].innerText;
    item.数量 = 1;
    return item;
}

// 购物车内容
var carContent = new Array();
var gUserName = "hsm";
function carItemAdd(item) {
    var i = carHasItem(item)
    if (i) {
        i.数量++;//因为i是一个对象的引用，直接改，就改了购物车中的内容
        i.选入 = true;
    } else {
        carContent.push(item);
        carContent[carContent.length - 1].选入 = true;
    }
    carSave(gUserName);
}

function cloneObj(from, to) {
    for (var key in from) {
        to[key] = from[key]
    }
}

function carHasItem(item) {
    //遍历cartContent,看看有没ID和item.ID相等的
    return carItemGet(item.ID);
}

function carItemRemove(ID) {
    //从代表购物车内容的cartContent中删除对应的元素（商品对象）

    for (var i = 0; i < carContent.length; i++) {
        if (carContent[i]) {
            if (carContent[i].ID == ID) delete carContent[i];
        }
    }
    carSave(gUserName);
}

function carItemGet(ID) {
    //遍历，找到ID相等的，返回之，否则，返回null
    for (var i = 0; i < carContent.length; i++) {
        if (carContent[i]) {
            if (carContent[i].ID == ID) return carContent[i];
        }
    }
    return null;
}

function carItemChangeAmount(ID, newAmount) {
    var item = carHasItem(ID);
    if (item) {
        item.数量 = newAmount;
    } else {

    }
    carSave(gUserName);
}

function carItemChaneSelected(ID, isSelected) {
    var item = carHasItem(ID);
    if (item) {
        item.选入 = isSelected;
    } else {
    }
    carSave(gUserName);
}

function carSave(userName) {
    //以JSON方式存入localStorage
    //约定key: userName+cart
    var c = washCarContent(carContent);
    carContent = c;
    var key = userName + "_cart";
    var value = JSON.stringify(carContent);
    localStorage.setItem(key, value);

}

function washCarContent(car) {
    var c = [];
    for (var i = 0; i < car.length; i++) {
        if (car[i]) c.push(car[i]);
    }
    return c;
}

function carGet(userName) {
    var key = userName + "_cart";
    var value = localStorage.getItem(key);
    if (value) {
        carContent = JSON.parse(value);
    } else {
        carContent = [];
    }
}

function carTotal() {
    //total是个对象，里面有属性总数，总金额
    var total = { 总数: 0 };
    //下面，把总数和
    for (var i = 0; i < carContent.length; i++) {
        //把各个商品对象相应的加起来
        if (carContent[i] && carContent[i].选入) {
            total.总数 += carContent[i].数量;
            total.总金额 += carContent[i].数量 * carContent[i].价格;
        }
    }
    return total
}
// 点击加入购物车，购物车数字变化
/*var shoppingNum = 0;

function enterCarChangenum() {
    shoppingNum++;
    carTip2.innerText = shoppingNum;
    // return shoppingNum;
}
var goodsshowa = showCon.getElementsByClassName('goodsshowa');

for (var i = 0; i < goodsshowa.length; i++) {
    goodsshowa[i].setAttribute('onclick', 'enterCarChangenum(this)');
}
*/



// }