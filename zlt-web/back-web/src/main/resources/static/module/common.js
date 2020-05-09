/*公用js文件*/

var util = {

    /* 填充表单数据 */
    fillFormData: function (form, data, Jquery) {
    	debugger;
    	var $ = Jquery || layui.jquery || $;
    	var elems = form.find('[name]');
    	elems.each(function(i,elem){
    		var fieldElem = $(elem);
    		var property = fieldElem.attr('name');
    		if(property){
    			var value = getPropertyValue(data,property);
                if (fieldElem.attr("type") == "radio" || fieldElem.attr("type") == "checkbox") {
                    for (var i = 0; i < fieldElem.length; i++) {
                        if (value != null) {
                            if (fieldElem[i].value == value) {
                                fieldElem[i].checked = true;
                            }
                        }
                    }
                } else if (fieldElem.length == 1 &&
                    fieldElem.get(0).nodeName.toLowerCase() == "select") {
                	try {
                		if(fieldElem.attr('convert')&&!fieldElem.hasClass('loaded')){
                			fieldElem.addClass('loaded');
                    		var html = layer.buildConvertOptions(fieldElem.attr('convert'));
                    		fieldElem.append(html);
                    	}else if(fieldElem.attr('src')&&fieldElem.attr('code')&&fieldElem.attr('show')&&!fieldElem.hasClass('loaded')){
                    		fieldElem.addClass('loaded');
                    		var code = fieldElem.attr('code'),show = fieldElem.attr('show');
                    		layer.ajax({
                        		url : fieldElem.attr('src'),
                        		async : false,
        						success: function(result){
        							var records = result.data;
    								var html = layer.buildSelectOptions(records,code,show);
    								fieldElem.append(html);
        				      	}
        					});
                    	}
    				} catch (e) {
    					console.log(e);
    				}
    				fieldElem.val(value);
                } else {
                    fieldElem.val(value);
                }
    		}
    	});
    	try {
			layui.form.render(null,null,form);
		} catch (e) {
			//console.log('fillFormData完成后form渲染失败,'+e);
		}
    }
};

//取非行间样式
function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];
    }
}
// 运用class获取元素
function getByClass(oParent, sClass)
{
    var aEle=oParent.getElementsByTagName('*');
    var aResult=[];
    var re=new RegExp('\\b'+sClass+'\\b', 'i');
    var i=0;
    for(i=0;i<aEle.length;i++){
        if(re.test(aEle[i].className)){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}

function getPropertyValue(record,property){
	  if(!property)return;
	  var value = '';
	  var properties = property.split('.');
	  if(properties.length>1){
		  value = record;
		  for(var i=0;i<properties.length;i++){
			  value = value[properties[i]];
			  if(!value||value=='')return;
		  }
	  }else{
		  value = record[property];
	  }
	  return value;
}


