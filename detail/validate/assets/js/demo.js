$(document).ready(function() {
	// just for the demos, avoids form submit
	// $.validator.setDefaults({
	//   debug: true,
	//   success: "valid"
	// });
    var $validInJsForm = $('.valid-in-js-form');
    // 表单验证
    $validInJsForm.validate({
        rules: {
            "name": {
            	"required": true,
            	remote: "assets/test-data/succ.json"// 成功
            	// remote: "assets/test-data/fail-false.json"// 失败 简单的返回false
           //  	remote: {// 失败 返回自定义的错误信息
           //  		url:"assets/test-data/fail-msg.json",
           //  		data: {
			        //   othersData: function() {
			        //     return $( "#name" ).val();
			        //   }
			        // }
           //  	}
            },
            "email": "email", // 要么不输入，要么是正确的邮箱格式
            password: {
                "required": true,
                "rangelength": [2, 16]
            },
            "password-again": {
                "required": true,
                equalTo: "#password"
            },
            // phone: {
            // 	require_from_group: [1, '.contract-group']
            // },
            // mobile: {
            // 	require_from_group: [1, '.contract-group']
            // },
            agree: 'required'
        },
        messages: {
            "name": {
            	required: "请输入用户名"
            	, remote: "用户名已存在" // 如果返回false，则用这个错误信息，如果是字符串,则显示这个字符串
            },
            "email": "请输入有效邮箱",
            password: {
                "required": '请输入密码',
                "rangelength": '密码长度在2到16个字符之间'
            },
            "password-again": {
                required: '请再次输入密码',
                equalTo: '两次输入的密码不一致'
            },
            agree: "请同意"
            // phone: {
            // 	'至少填一个联系方式'
            // }
        },
        errorPlacement: function($errMsg, $input) {
            $input.closest('.form-group').find('.status').append($errMsg);
        },
        success: function($label) {
            // set &nbsp; as text for IE
            $label.html("&nbsp;").addClass("checked");
        },
        // 错误时
        highlight: function(input, errorClass) {
            $(input).closest('.form-group').find("." + errorClass).removeClass("checked");
        },
        submitHandler: function() {
        	// fix 循环进这个方法的bug
        	var clonedForm = $validInJsForm.cloneForm();
        	$('body').append(clonedForm);
            clonedForm.submit();
        }
    });


    // fix jquery http://bugs.jquery.com/ticket/3016
	// https://github.com/spencertipping/jquery.fix.clone/blob/master/jquery.fix.clone.js
    $.fn.cloneForm = function() {
    	var $form = $(this);
        var $clonedForm = $form.clone();
        var $missingClonedInput = $clonedForm.find('textarea,select');
        $form.find('textarea,select').each(function(index) {
            $missingClonedInput.eq(index).val($(this).val());
        });
        return $clonedForm;
    }
})
