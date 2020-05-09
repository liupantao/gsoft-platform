layui.define(['config', 'layer','form'], function (exports) {
    var config = layui.config;
    var layer = layui.layer;
    var form = layui.form;
    debugger;

   // var elems = form.find('[name]');
    var convert= function (form, data, Jquery) {
        console.log("ppp")
            var $ = Jquery || layui.jquery || $;
            var elems = form.find('[name]');
        }


    exports('convert', convert);
});
