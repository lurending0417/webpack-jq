import '../../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './libs/route.js'
import '../router.js'
import createNavBar from './components/navBar'

import '../css/header.css'


$(function() {
    createNavBar($('#navBarParent'))

    // if (!sessionStorage['testKey']) {
    //     // window.location = '../../login.html'
    // }
})