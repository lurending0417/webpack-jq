import '../../node_modules/bootstrap/dist/js/bootstrap.min.js'

import {getCookie, setCookie} from './libs/cookie.js'
import './libs/loading.js'

import '../css/login.css'

$(function() {
    $('#user').focus();
    // 判断cookie里是否保存了密码
    var user = getCookie('user');
    var pwd = getCookie('pwd');
    // console.log('pwd', pwd)
    // console.log('user', user)
    if(user !== "" && pwd !== ""){
        $("#user").val(user);
        $("#pwd").val(pwd);

    }
    // 登陆
    $('#loginBtn').click(function() {
        let data = {
            user: $('#user').val(),
            pwd: $('#pwd').val()
        }
        let idNum = $.openMask();
        setTimeout(function() {
            $.closeMask(idNum)
            // location = '../../index.html';
        }, 3000)
        setCookie('user', data.user, 1)
        setCookie('pwd', data.pwd, 1)

        // console.log('data', data)
        sessionStorage['testKey'] = 'login'

        // $.ajax({
        //     url: '',
        //     type: 'POST',
        //     data: {
        //         user: '张三',
        //         pwd: '王五'
        //     },
        // })
        // .success(function() {
        //     console.log("success");
        // })
        // .fail(function() {
        //     console.log("error");
        // })
    })
    // 记住密码
     $("#rememberBtn").on("click",function(event){
        if (event.target.nodeName !== 'INPUT') {
            const className = 'checked';
            let labelTag = $(this).children('label');
            if (labelTag.hasClass(className)) {
                labelTag.removeClass(className)
            } else {
                labelTag.addClass(className)
                // 存储cookie
            }
        }
    })

})