var Boot = {};


Boot.init = function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
};
Boot.preload =  function() {
        game.load.image('FoxLogo','assets/loadingpage/LOGO.jpg');
        game.load.image('LoadingBar','assets/loadingpage/LoadingBar.jpg');
        game.load.image('LoadingBarFrame','assets/loadingpage/LoadingBarFrame.png');
};
Boot.create = function() {
        //define backgroung
        game.stage.backgroundColor = "#000000";
        game.state.start('Loading');
  
};

