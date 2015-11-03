require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});
define(['backbone', 'router', 'app', 'models/Session'], function(Backbone, router, app, Session) {
    app.session = new Session();

    window.onSocialAuth = function() {
        console.log('Handle authorization!');
        app.session.checkAuth(function(isAuthorized) {
            
        });
    }
    Backbone.history.start();
});