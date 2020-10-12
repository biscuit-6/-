// 购物车数据交换

/*
    商品数据的来源，ID是怎么来的？
    1)后台程序 比如：items.php，从数据库中得到，然后放在网页上
    2）前端程序，用ajax向后端申请，后端从数据库取得，发给ajax请求
*/


/*
    使用本地数据
    支持本地多个用户
    用一条JSON字符串记录：用户名_cart   key/value
          保存：localStorage.setItem(用户名_cart,购物车内容JSON)

          读取：购物车内容JSON=localStorage.getItem(用户名_cart)


    程序内的映射：数组：[{一个商品的信息},{一个商品的信息},{一个商品的信息}]
    cartContent[{ID:1,品名:"苏泊尔蒸锅AB",数量:2,价格:126.88},{ID:2,品名:"xxyy蒸锅AB",数量:1,价格:126.88}]
    一个商品：{ID:1,品名:"苏泊尔蒸锅AB",数量:2,价格:126.88,imgPath:"../img/yes.jpg", 选入:true}

*/

//用全局变量cartContent代表购物车内容
var cartContent = new Array();
var gUserName = "lyshsd";
function cartItemAdd(item) {
    //加进来，就表示选入了

    //商品加入购物车。item是个对象，代表一个商品的完整信息，如：{ID:1,品名:"苏泊尔蒸锅AB",数量:2,价格:126.88}
    //如果原来数组中没有，则直接push,如果有，则数量加1
    //可以定义一个函数carHasItem(item),若有，返回该对象，没有，返回null


    var i = cartHasItem(item)
    if (i) {
        i.数量++; //因为i是一个对象的引用，直接改，就改了购物车中的内容
        i.选入 = true;
    } else {
        cartContent.push(item);
        cartContent[cartContent.length - 1].选入 = true;
        //这里可以改进：不是push，而是找一个被删除的元素，把item放进去
    }

    cartSave(gUserName);
}


function cloneObj(from, to) {
    for (var key in from) {
        to[key] = from[key];

    }
}


/*

//当用户点击“加入购物车”的时候
function 加入购物车.onclick = function () {
    //第一步，先生成一个商品信息对象item ,比如：
    var item = 生成商品对象();
    cartItemAdd(item);
    //所以，响应加入购物车的事件里，应该是调用两个函数，一个函数生成商品对象，另一个函数把商品对象加入购物车。

}
function 生成商品对象() {
    //var item={ID:1,品名:"苏泊尔蒸锅AB",数量:1,价格:126.88};
    item = {};
    item.ID = 1;
    item.品名 = "苏泊尔蒸锅AB";
    item.数量 = 1;
    item.价格 = 126.88;
    return item;
}
*/

function cartHasItem(item) {
    //遍历cartContent,看看有没ID和item.ID相等的
    return cartItemGet(item.ID);
}

function cartItemRemove(ID) {
    //从代表购物车内容的cartContent中删除对应的元素（商品对象）
    for (var i = 0; i < cartContent.length; i++) {
        if (cartContent[i]) {
            if (cartContent[i].ID == ID) delete cartContent[i];
        }

    }
    cartSave(gUserName);

}
function cartItemGet(ID) {
    //遍历，找到ID相等的，返回之，否则，返回null

    for (var i = 0; i < cartContent.length; i++) {
        //先保证没有被删除
        if (cartContent[i]) {
            if (cartContent[i].ID == ID) return cartContent[i];
        }

    }
    return null;
}

function cartItemChangeAmount(ID, newAmount) {
    var item = cartHasItem(ID);
    if (item) {
        item.数量 = newAmount;
    } else {
        //一种做法：出错。大家查一下如何处理错误 ：js的try catch,抛出一个用户自定义错误，感觉有点把事情弄大了。也许给个警告alert
        //另一种做法，加进去。这种做法不太妥。
    }
    cartSave(gUserName);
}

function cartItemChaneSelected(ID, isSelected) {
    var item = cartHasItem(ID);
    if (item) {
        item.选入 = isSelected;
    } else {
        //一种做法：出错。大家查一下如何处理错误 ：js的try catch,抛出一个用户自定义错误，感觉有点把事情弄大了。也许给个警告alert
        //另一种做法，加进去。这种做法不太妥。
    }
    cartSave(gUserName);
}

function cartSave(userName) {
    //以JSON方式存入localStorage
    //约定key: userName+cart
    var c = washCartContent(cartContent);
    cartContent = c;
    var key = userName + "_cart";
    var value = JSON.stringify(cartContent);
    localStorage.setItem(key, value);

}

function washCartContent(cart) {
    var c = [];
    for (var i = 0; i < cart.length; i++) {
        if (cart[i]) c.push(cart[i]);
    }
    return c;
}

function cartGet(userName) {
    var key = userName + "_cart";
    var value = localStorage.getItem(key);
    if (value) {
        cartContent = JSON.parse(value);
    } else {
        cartContent = [];
    }
}
function cartTotal() {
    //total是个对象，里面有属性总数，总金额
    var total = { 总数: 0, 总金额: 0 };
    //下面，把总数和
    for (var i = 0; i < cartContent.length; i++) {
        //把各个商品对象相应的加起来
        if (cartContent[i] && cartContent[i].选入) {
            total.总数 += cartContent[i].数量;
            total.总金额 += cartContent[i].数量 * cartContent[i].价格;
        }
    }
    return total
}

//什么时候调用cartSave?：==》所有改动后，都来一次cartSave,最简单最精暴最保险






