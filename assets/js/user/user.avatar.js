 let layer = layui.layer;
 // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比 可以修改为1/1,或其他几分之几
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)
  
  $('#btnChooseImage').on('click', function() {
    $('#file').click()
  })
  $('#file').on('change',function(e){
    //   console.log(e);
    //1种方法
    // var filelist = e.target.files
    // if (filelist.length === 0) {
    //   return layer.msg('请选择照片！')
    // }
  
    // // 1. 拿到用户选择的文件
    // var file = e.target.files[0]
    // var imgURL = URL.createObjectURL(file)
    // // 3. 重新初始化裁剪区域
    // $image
    //   .cropper('destroy') // 销毁旧的裁剪区域
    //   .attr('src', imgURL) // 重新设置图片路径
    //   .cropper(options) // 重新初始化裁剪区域

    //2种方法
      const [file]=e.target.files;
    //   const file = e.target.files[0];
    if(!file) return layer.msg('请选择照片！');
    var imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
  $('#btnUpload').on('click',function(){
    var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')
    $.ajax({
        method: 'POST',
        url:'/my/update/avatar',
        data:{
            avatar: dataURL
        },
        success(res){
            if(res.status !== 0){
                return layer.msg('更换头像失败！')
            }
            layer.msg('更换头像成功！')
            window.parent.getUserInfo()
        }
    })
  })