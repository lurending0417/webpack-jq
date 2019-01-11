import '../../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './libs/route.js'
import '../router.js'

import '../css/header.css'


$(function() {
    console.log('2222')
    if (!sessionStorage['testKey']) {
        // window.location = '../../login.html'
        console.log('2222')
    }
})