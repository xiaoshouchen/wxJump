function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

$("document").ready(function () {
    //选择支付方式
    $('#pay b').click(function () {
        var pay = $(this).attr('pay');
        $(this).siblings().removeClass("b-no");
        $(this).addClass("b-no");
        $(this).parent().siblings('p').hide();
        $("#s-" + pay).show();
        $('input[name="paytype"]').val(pay);
    });

    $('.submit').click(function () {
        var name = $('input[name="meal_name"]').val(); //套餐名称
        var username = $('input[name="name"]').val(); //买家名称


        var phone = $('input[name="phone"]').val(); // 买家联系电话
        var address = $('input[name="address"]').val(); //买家详情地址
        var province = $('#s_province').find('option:selected').val(); //所在省
        var city = $('#s_city').find('option:selected').val(); //所在市

        var namereg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
        var phonereg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (contains(temp, 'username')) {
            if (!namereg.test(username)) {
                layer.msg('姓名格式错误！', {icon: 7, time: 2000, shift: 6});
                return false;
            }
        }
        if (contains(temp, 'phone')) {
            if (!phonereg.test(phone)) {
                layer.msg('手机号码格式错误！', {icon: 7, time: 2000, shift: 6});
                return false;
            }
        }
        if (contains(temp, 'area')) {
            if (province == '') {
                layer.msg('请选择所属省份！', {icon: 7, time: 2000, shift: 6});
                return false;
            }
            if (city == '') {
                layer.msg('请选择所属地级市！', {icon: 7, time: 2000, shift: 6});
                return false;
            }
        }
        if (contains(temp, 'address')) {
            if (!address) {
                layer.msg('请输入详细地址！', {icon: 7, time: 2000, shift: 6});
                return false;
            }
        }

        //开启遮罩层
        layer.load(1, {shade: [0.5, '#000']});
        $.post(post_order, $("form").serialize(), function (data) {
            setTimeout(function () {
                layer.closeAll();  //关闭遮罩层
                if (data.code == 0) {
                    layer.msg('提交订单成功！', {icon: 1, time: 2000}, function () {
                        window.location.href = data.url; //订单提交成功跳转到 下单成功页面
                    });
                }
                if (data.code == -1) {
                    layer.msg('提交订单失败！今日购买次数已超过最大限制', {icon: 2, time: 2000}, function () {
                        console.log('提交订单失败')
                    });
                }
            }, 1000);
        }, 'json');
    });
});

/**
 * 选择套餐
 * @param obj 点击对象
 * @param price 套餐价格
 * @param title //套餐名称
 */
function pro(obj, price, title) {
    $(obj).siblings().removeClass("ul-no");
    $(obj).addClass("ul-no");
    //套餐购买数量
    var num = $('input[name="num"]').val();
    //套餐价格加入 隐藏区域
    $('input[name="meal_price"]').val(price);
    //套餐名称加入 隐藏区域
    $('input[name="meal_name"]').val(title);
    //展示购买价格  购买数量*套餐价格 算出总价
    $('#showprice').text((num * price).toFixed(2));
}

/**
 * 选择尺码
 * @param obj 点击对象
 * @param title 尺码名称
 */
function sizety(obj, title) {
    $(obj).siblings().removeClass("ul-no");
    $(obj).addClass("ul-no");
    //尺码名称信息 加入隐藏区域
    $('input[name="size_name"]').val(title);

}

/**
 * 购买数量递减不能小于0
 */
function numdecr() {
    let num = parseInt($('input[name="num"]').val()); //套餐购买总量
    let price = parseInt($('input[name="meal_price"]').val()); //套餐价格
    let result = --num;
    if (result == 0 || result < 0) { //库存小于购买量
        $('input[name="num"]').val(1);
        //展示购买价格  购买数量*套餐价格 算出总价
        $('#showprice').text((1 * price).toFixed(2));
    } else {
        $('input[name="num"]').val(result);
        //展示购买价格  购买数量*套餐价格 算出总价
        $('#showprice').text((result * price).toFixed(2));
    }

}

/**
 * 购买数量递增不能大于库存
 */
function numincr() {
    let number = parseInt($('input[name="meal_stock"]').val()); //库存
    let num = parseInt($('input[name="num"]').val()); //套餐购买总量
    let price = parseInt($('input[name="meal_price"]').val()); //套餐价格
    if (number < num) { //库存小于购买量
        layer.msg('库存不足，请谅解！', {icon: 7, time: 2000, shift: 6});
        return false;
    }
    let result = ++num;
    $('input[name="num"]').val(result);
    //展示购买价格  购买数量*套餐价格 算出总价
    $('#showprice').text((result * price).toFixed(2));
}