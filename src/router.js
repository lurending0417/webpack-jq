$(function(){

    router.start({
        view: '#ui-view',
        errorTemplateId: '#error', // 可选
        router: {
            'home': {
                templateUrl: './pages/home/home.html',
                controller: './pages/home/home.js',
                styles:'./pages/home/home.css',
                animate:''
            },
            'list': {
                templateUrl: './pages/list/list.html',
                controller: './pages/list/list.js',
                styles:'./pages/list/list.css',
                animate:''
            },
            'defaults': 'home' //默认路由
        }
    });

});
