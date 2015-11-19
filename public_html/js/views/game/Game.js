define(['app', 'tmpl/game/game', 'views/BaseView', 'views/game/Question', 'views/game/Finish', 'models/game/Game',  'utils/api/ws/api_ws'], function(app, tmpl, BaseView, QuestionView, FinishView, Game, api) {
    var View = BaseView.extend({
        template: tmpl,
        gameRequire: true,
        loginRequire: true,
        initialize: function() {
            this.listenTo(app.wsEvents, "wsGameFinished", this.onGameFinish);
            this.listenTo(app.wsEvents, "wsGameStart", this.onGameStart);
            this.listenTo(app.wsEvents, "wsRoundStart", this.onNewRound);
            this.listenTo(app.wsEvents, "wsRoundEnd", this.onFinishRound);
            this.listenTo(app.wsEvents, "wsNewQuestion", this.onNewQuestion);
        },
        //Websocket events
        onGameStart: function(data) {
            this.game = new Game(data);
            this.context = this.game;
        },
        onGameFinish: function(data) {
            this.disposePopupIfNeeded();
            api.closeConnection();

            //Obsosnyi kostyl
            var winner = (this.game.player.email === data.winner ? this.game.player : this.game.opponent); 
            this.finishView = new FinishView(winner);
            this.finishView.present();
        },
        onNewRound: function(data) {

        },
        onFinishRound: function(data) {
            this.disposePopupIfNeeded();
            this.game.update(data);
            this.render();
        },
        onNewQuestion: function(data) {
            this.questionView = new QuestionView(data);
            this.questionView.present();
        },
        //View lifycycle
        load: function() {
            this.present();
            $(".container").addClass('container-wide', 500, 'swing');
        },
        unload: function() {
            this.hide();
            this.disposePopupIfNeeded();
            api.closeConnection();
            $('.container').removeClass('container-wide', 500, 'swing');
        },
        disposePopupIfNeeded: function() {
            if (this.questionView) {
                this.questionView.hidePopup();
            }
        }
    });
    return View;
});