$(function() {

    $('#routeBtn').click(function() {
        // console.log('home')
        window.location.hash =router.stringify('list');
    })
    $('#testBtn').click(function() {
        console.log('window.history.length', window.history.length)
        console.log('window.history.state', window.history.state)
    })
})