//每次调用$get$post或$ajax，会先调用ajaxPrefilter这个函数
//所以这个函数可以拿到提供给ajax的配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})