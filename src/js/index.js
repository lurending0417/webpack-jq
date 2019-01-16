import 'bootstrap/dist/js/bootstrap.min.js'
import './libs/route.js'
import '../router.js'
import createNavBar from './components/navBar'

import '../css/header1.less'
function onLoad() {
    let now = new Date().getTime();
    let page_load_time = now - performance.timing.navigationStart;
    console.log("User-perceived page loading time: " + page_load_time);
}

$(function() {
    // createNavBar($('#navBarParent'))

    // if (!sessionStorage['testKey']) {
    //     // window.location = '../../login.html'
    // }
    onLoad()
})