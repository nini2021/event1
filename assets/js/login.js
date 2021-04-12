$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide()
    })
    // const form = layui.form;
    const {form,layer}=layui;
    // var layer = layui.layer;
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function(value){
    const pwd = $('.reg-box [name=password]').val();
    if(value!==pwd){
        return '两次密码不一致！'
    }
    }
    })
    $('#reg-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:{
                username:$('.reg-box [name=username]').val(),
                password:$('.reg-box [name=password]').val(),
            },
            success(res){
                if(res.status!==0){
                 
                  return layer.msg(res.message);
                }
                layer.msg('注册成功');
                $('#link_login').click();
            }
        })
    })
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
          url: '/api/login',
          method: 'POST',
          // 快速获取表单中的数据
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = '/index.html'
          }
        })
    })
   
})