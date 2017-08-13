var Loading = {};


Loading.init = function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
};
Loading.preload =  function() {
        FishingPageLoadingBar = this.add.sprite(game.width/2-300,600,"LoadingBar");
        FishingPageLoadingBar.alpha = 1;
        game.add.tween(FishingPageLoadingBar).to({alpha:'-0.3'},800,'Quad.easeInOut',true,0,false,true).loop(true); 
        FishingPageLoadingBar.anchor.setTo(0,0.5);
        this.load.setPreloadSprite(FishingPageLoadingBar,0);
       
        this.FoxLogo = this.add.sprite(game.world.centerX,game.world.centerY,'FoxLogo');
        this.FoxLogo.anchor.setTo(0.5);
        FoxLogoTween = game.add.tween(this.FoxLogo).to({alpha:0.3},800,'Quad.easeInOut',true,0,false,true).loop(true); 

        LoadingBarFrame = this.add.sprite(game.width/2,600,"LoadingBarFrame");
        LoadingBarFrame.alpha = 1;
        LoadingBarFrame.anchor.setTo(0.5,0.5);

    game.load.atlas('FoxSitting','assets/fishingpage/FoxSitting.png','assets/fishingpage/FoxSitting.json'); 
    game.load.atlas('FoxSittingRod','assets/fishingpage/FoxSittingRod.png','assets/fishingpage/FoxSittingRod.json');
    game.load.atlas('FoxPulling', 'assets/fishingpage/FoxPulling.png', 'assets/fishingpage/FoxPulling.json');
    game.load.atlas('FoxPullingRod', 'assets/fishingpage/FoxPullingRod.png', 'assets/fishingpage/FoxPullingRod.json');
    game.load.atlas('FoxGetFish', 'assets/fishingpage/FoxGetFish.png', 'assets/fishingpage/FoxGetFish.json');     
    game.load.atlas('FoxFalling', 'assets/fishingpage/FoxFalling.png', 'assets/fishingpage/FoxFalling.json');     
    game.load.atlas('Fish', 'assets/fishingpage/Fish.png', 'assets/fishingpage/Fish.json');  
    
    game.load.atlas('Panel','assets/fishingpage/Panel.png','assets/fishingpage/Panel.json');
    game.load.atlas('FishBar','assets/fishingpage/FishBar.png','assets/fishingpage/FishBar.json');
    //EnergyTransfer-------------------------------------------------------------------------------------------------
    game.load.atlas('EnergyTransfer', 'assets/fishingpage/EnergyTransfer.png', 'assets/fishingpage/EnergyTransfer.json');         
    //Text-----------------------------------------------------------------------------------------------------------------
    game.load.atlas('TutorialText', 'assets/fishingpage/TutorialText.png', 'assets/fishingpage/TutorialText.json');         
    //GetFishBoard----------------------------------------------------------------------------------------------------------
    game.load.atlas('GetFishBoard', 'assets/fishingpage/GetFishBoard.png', 'assets/fishingpage/GetFishBoard.json');   
        
    //GetFishBoard----------------------------------------------------------------------------------------------------------
    game.load.atlas('FailBoard', 'assets/fishingpage/FailBoard.png', 'assets/fishingpage/FailBoard.json');   
    
    //game.load.image('FishBar','assets/fishingpage/FishBar.png');
    game.load.image('FishBarMySelf','assets/fishingpage/FishBarMySelf.png');
    game.load.image('BG','assets/fishingpage/BG.jpg');
    game.load.image('startText','assets/fishingpage/startText.png');
    game.load.image('PanelMask','assets/fishingpage/PanelMask.jpg');

    //audio----------------------------------------------------------------------------------------------------   
    game.load.audio('fishing', 'assets/audio/fishing.mp3');
    game.load.audio('rightFX', 'assets/audio/rightFX.mp3');
    game.load.audio('wrongFX', 'assets/audio/wrongFX.mp3');
    game.load.audio('successFX', 'assets/audio/successFX.mp3');
    game.load.audio('failureFX', 'assets/audio/failureFX.mp3');
    game.load.audio('alertFX', 'assets/audio/alertFX.mp3');
    game.load.audio('startFX', 'assets/audio/startFX.mp3');
    game.load.audio('fishingBG', 'assets/audio/fishingBG.mp3');
    game.load.audio('clickFX', 'assets/audio/clickFX.mp3');  
    game.load.audio('add_energyFX', 'assets/audio/add_energyFX.mp3');  
};
Loading.create = function() {
        //define backgroung
        game.stage.backgroundColor = "#000000";
        game.state.start('Game',);
  
};