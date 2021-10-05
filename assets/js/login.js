$(function() {
    // 点击去注册切换页面
    $('#link-reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //点击去登录切换页面
    $('#link-login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从layui获取form对象

    var form = layui.form
    var layer = layui.layer
    form.verify({
        //自定义pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位,且不能出现空格'],
        repwd: function(value) {
            //通过形参value拿到确认密码框内容
            //拿到密码框的内容
            var pwd = $('.reg-box [name=password]').val()
                //进行确认密码和密码框的内容判断
            if (pwd !== value) {
                //判断失败就返回一个弹框
                return layer.msg('两次密码不一致')
            }
        }
    })

    //监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        //function拿到事件对象e
        //阻止事件的默认提交行为
        e.preventDefault()
            // $.ajax({
            //         method: 'post',
            //         url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            //         data: {
            //             username: "$('#form_reg' [name=username]).val()",
            //             password: "$('#form_reg' [name=password]).val()"
            //         },
            //         success: function(res) {
            //             if (res.status !== 0) {
            //                 return "注册失败"
            //                 console.log(res.message);
            //             }
            //             console.log("注册成功");
            //         }
            //     })
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', {
            username: $('#form_reg [name = username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function(res) {
            if (res.status !== 0) {

                return layer.msg('注册失败')
                console.log(res.message);

            }
            layer.msg('注册成功')
        })
    })

    //监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            //serialize方法获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg('登录失败')
                }
                layer.msg('登陆成功')
                console.log(res.token);
                //token请求头携带权限，所以要把登录成功的请求头保存到locastorage中
                localStorage.setItem('token', res.token)
                    //跳转后台主页
                location.href = '/index.html'
            }
        })
    })

})