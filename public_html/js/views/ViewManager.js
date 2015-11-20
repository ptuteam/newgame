define(['app', 'views/Main', 'views/Scoreboard', 'views/Login', 'views/Start', 'views/game/Game'], function(app, Main, Scoreboard, Login, Start, Game) {
    var ViewManager = Backbone.View.extend({
        currentView: null,

        START_GAME_VIEW: "start",
        GAME_VIEW: "game",
        LOGIN_VIEW: "login",
        MAIN_VIEW: "main",
        SCOREBOARD_VIEW: "scoreboard",

        views: {
            START_GAME_VIEW: null,
            GAME_VIEW: null,
            LOGIN_VIEW: null,
            MAIN_VIEW: null,
            SCOREBOARD_VIEW: null,
        },

        initialize: function() {
            this.views[this.START_GAME_VIEW] = new Start();
            this.el.appendChild(this.views[this.START_GAME_VIEW].el);

            this.views[this.GAME_VIEW] = new Game();
            this.el.appendChild(this.views[this.GAME_VIEW].el);

            this.views[this.LOGIN_VIEW] = new Login();
            this.el.appendChild(this.views[this.LOGIN_VIEW].el);

            this.views[this.MAIN_VIEW] = new Main();
            this.el.appendChild(this.views[this.MAIN_VIEW].el);
            
            this.views[this.SCOREBOARD_VIEW] = new Scoreboard();
            this.el.appendChild(this.views[this.SCOREBOARD_VIEW].el);
        },
        //Presenting
        presentView: function(viewKey) {
            var view = this.views[viewKey];
            //If login required or game required
            if ((view.loginRequire == true && app.session.get('loggedIn') == false) || 
                (view.gameRequire == true && app.session.get('isInGame') == false)) {
                this.goToMain();
            } else {
                if (this.currentView != null) {
                    this.currentView.unload();
                }
                view.load();
                this.currentView = view;
            }
        },
        goToMain: function() {
            if(this.currentView == this.views[this.MAIN_VIEW]) {
                this.currentView.load();
            } else {
                app.router.navigateToMain();
            }
        },
    });
    return ViewManager;
});