// 全选
// 删除
// 小计
// 加减按钮

// 全选

var allCheck = document.getElementsByClassName('checkth');
var allcheck = document.getElementById('allcheck');

function allCh() {

    for (var i = 0; i < allCheck.length; i++) {
        if (allcheck.checked == true) {
            allCheck[i].checked = true;

        } else allCheck[i].checked = false;

    }
    sum();
};
// 结算
var shoppList = document.getElementsByClassName('shoppinglist')[0];
shoppList.addEventListener("checked", sum);
var input = shoppList.getElementsByClassName('checkth');

function sum() {
    var allMoney = shoppList.nextElementSibling.getElementsByTagName('i')[0];
    for (var i = 0; i < input.length; i++) {
        if (input[i].checked) {
            var allsumNum = shoppList.getElementsByClassName('rows')[i].children[3].getElementsByTagName('span')[0];
            var allsumNum1 = parseInt(allsumNum.innerText);
            var selectedArry = [];
            selectedArry.push(allsumNum1)
            // allsumNum1 += allsumNum1;
            // allMoney.innerText = allsumNum1;
            var s = 0;
            for (var n = 0; n < selectedArry.length; n++) {
                s += selectedArry[n];
                allMoney.innerText = s;
            }
        }
    }
    // alert('ok')
}

// +按钮
//闭包缓存数据


/*function add(i) {
    var value = parseInt(jian[i].nextElementSibling.innerText);
    return function () {
        //每一次点击的时候,都应该改变当前点击按钮的value值
        parseInt(goodsNum[i].innerHTML = value++);
    }

}

function subtract(i) {
    // var value = parseInt(goodsNum[i].innerText);

    var value = parseInt(goodsNum[i].innerText);
    return function () {
        if (value < 1) value = 1;
        else goodsNum[i].innerText = value--;

    }
}
//获取所有的+按钮
var jia = document.getElementsByClassName('but2');

//循环遍历每个按钮,注册点击事件
for (var i = 0; i < jia.length; i++) {
    //注册事件,+
    jia[i].onclick = add(i);
    jian[i].onclick = subtract(i);
    // -
    // jian[i].onclick = subtract(i);
}
*/

// }
// +-按钮
function sub(i) {
    var goodsNum = (i.parentNode).getElementsByClassName('num')[0];
    if (Number(goodsNum.innerText) <= 1) goodsNum.innerText = 1;
    else goodsNum.innerText = Number(goodsNum.innerText) - 1;
    sum1(i);
    sum();
}

function add(i) {
    var goodsNum = (i.parentNode).getElementsByClassName('num')[0];
    goodsNum.innerText = Number(goodsNum.innerText) + 1;
    sum1(i);
    sum();
}

// 小计
function sum1(i) {
    // 数量显示
    var goodsNum = (i.parentNode).getElementsByClassName('num')[0];
    // 小计显示
    var sum1money = (goodsNum.parentNode.parentNode.nextElementSibling).getElementsByTagName('span')[0];
    // 单价
    var unitPrice = (i.parentNode.parentNode.previousElementSibling).getElementsByTagName('span')[0];
    sum1money.innerText = (parseInt(unitPrice.innerText) * parseInt(goodsNum.innerText)).toFixed(2);

}



// 删除加上onclick=del(this)
function del(obj) {
    obj.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode)
}

// 把label的复选框改成input再加个name="cars"
// 也可以不用把label改成input，改成div，再在下面改clicked成onclick
function delChecked() {
    var cn = document.getElementsByName("cars");

    for (var i = 0; i < cn.length; i++) {
        // if (cn[i].clicked) {
        if (cn[i].onclick) {
            i = -1;
        }
    }
}