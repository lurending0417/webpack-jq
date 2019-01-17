import 'bootstrap/dist/js/bootstrap.min.js'
import './libs/route.js'
import '../router.js'
import createNavBar from './components/navBar'

import '../css/header2.less'
function onLoad() {
    let now = new Date().getTime();
    let page_load_time = now - performance.timing.navigationStart;
    console.log("User-perceived page loading time: " + page_load_time);
}

$(function() {
    let listWrapEle = $('.list-wrap');
    // listWrapEle.hide();

    let listHeight = $(window).height() - 80;
    listWrapEle.css('height', `${listHeight}px`)
    $('.hidden-mask').css('height', `${listHeight}px`)

    let secondListWidth = $(window).width() * 0.67;
    $('.second-level-list-wrap').css('width', secondListWidth )
    // createNavBar($('#navBarParent'))

    // if (!sessionStorage['testKey']) {
    //     // window.location = '../../login.html'
    // }
    onLoad();

    // 搜索框聚焦事件
    let searchBtn = $('#searchBtn');
    searchBtn.focus(function (e) {
        $(this).prev().addClass('focus-search-icon')
    })
    searchBtn.blur(function (e) {
        $(this).prev().removeClass('focus-search-icon')
    })

    // 显示菜单栏事件
    // $('#listControlBtn').hover(function (e) {
    //     listWrapEle.show()
    // })
    // $('.list-total-wrap').mouseleave(function (e) {
    //     listWrapEle.hide()
    // })
})