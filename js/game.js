var Game = {};
var MyPlayerID = 0;
var answerpannel =[];
var answerpannelTutorial =[];
var FishingAnswerNum = [];
var PlayerList = [];

Game.init = function(){
    game.stage.disableVisibilityChange = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    PlayerAmount = 0;
    //addmode = true;
    //minusmode = false;
    CorrectAnswer = -100;
};

Game.preload = function() {
    /*
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
    */
};

Game.create = function(){
    Game.FishBarBG = {};
    Game.EnergyBar = {};
    Game.FishBar = {};
    Game.FishBarLight = {};
    Game.FishBarPositionX = {};
    Game.FishBarPositionY = {};
    Game.EnergyBarMask = {};
    Game.EnergyTransfer = {};
    Game.EnergyTransferAnimate = {};


    BG = game.add.sprite(0,0,'BG');
    BG.events.onInputDown.add(askstartGame, this);

    FoxSittingRod = game.add.sprite(0, 0, 'FoxSittingRod');
    FoxSittingRodAnimate = FoxSittingRod.animations.add("FoxSittingRod",Phaser.Animation.generateFrameNames('FoxSittingRod_',11,27, '.png', 5), 10, true);
    FoxSittingRod.alpha = 1;        
    FoxSittingRod.animations.play("FoxSittingRod",20,true);
        
    FoxSitting = game.add.sprite(0, 0, 'FoxSitting');
    FoxSittingAnimate = FoxSitting.animations.add("FoxSitting",Phaser.Animation.generateFrameNames('FoxSitting_',11,27, '.png', 5), 10, true);
    FoxSitting.alpha = 1;
    FoxSitting.animations.play("FoxSitting",20,true);    

    FoxPullingRod = game.add.sprite(0, 0, 'FoxPullingRod');
    FoxPullingRodAnimate = FoxPullingRod.animations.add("FoxPullingRod",Phaser.Animation.generateFrameNames('FoxPullingRod_',0,18, '.png', 5), 10, true);
    FoxPullingRod.alpha = 0;
       
    FoxPulling = game.add.sprite(0, 0, 'FoxPulling');
    FoxPullingAnimate = FoxPulling.animations.add("FoxPulling",Phaser.Animation.generateFrameNames('FoxPulling_',0,18, '.png', 5), 10, true);
    FoxPulling.alpha = 0;

    FoxFallingRod = game.add.sprite(0, 0, 'FoxFalling');
    FoxFallingRodAnimate = FoxFallingRod.animations.add("FoxFallingRod",Phaser.Animation.generateFrameNames('FoxFallingRod_',0,20, '.png', 5), 10, true);
    FoxFallingRod.alpha = 0;
    //FoxFallingRodAnimate.play("FoxFallingRod",30,false);
    //FoxFallingRodAnimate.stop();

    FoxFalling = game.add.sprite(0, 0, 'FoxFalling');
    FoxFallingAnimate = FoxFalling.animations.add("FoxFalling",Phaser.Animation.generateFrameNames('FoxFalling_',0,20, '.png', 5), 10, true);
    FoxFalling.alpha = 0;
    //FoxFallingAnimate.play("FoxFalling",30,false);
    //FoxFallingAnimate.stop();

    FoxGetFishRod = game.add.sprite(0,0,'FoxGetFish');
    FoxGetFishRodAnimate = FoxGetFishRod.animations.add("FoxGetFishRod",Phaser.Animation.generateFrameNames('FoxGetFishRod_',0,20, '.png', 5), 10, true);
    FoxGetFishRod.alpha = 0; 
    //FoxGetFishRodAnimate.play("FoxGetFishRod",20,false);
    //FoxGetFishRodAnimate.stop();
    
    FoxGetFish = game.add.sprite(0,0,'FoxGetFish');
    FoxGetFishAnimate = FoxGetFish.animations.add("FoxGetFish",Phaser.Animation.generateFrameNames('FoxGetFish_',0,20,'.png', 5), 10, true);
    FoxGetFish.alpha = 0;
    //FoxGetFishAnimate.play("FoxGetFish",20,false);    
    //FoxGetFishAnimate.stop();
    //FishDynamic--------------------------------------------------------------------------------------------------------
    OrangeFish = game.add.sprite(0,0,'Fish');
    OrangeFishAnimate = OrangeFish.animations.add("OrangeFish",Phaser.Animation.generateFrameNames('OrangeFish_',0,20, '.png',5), 10, true);
    OrangeFish.alpha = 0;
    //OrangeFishAnimate.play("OrangeFish",30,false);
    //OrangeFishAnimate.stop();    
    OrangeFishStop = game.add.sprite(0,0,'Fish');
    OrangeFishStopAnimate = OrangeFishStop.animations.add("OrangeFishStop",Phaser.Animation.generateFrameNames('OrangeFishStop_',20,25, '.png', 5), 10, true);
    OrangeFishStop.alpha = 0;         
    //OrangeFishStopAnimate.play("OrangeFishStop",30,false);
    //OrangeFishStopAnimate.stop();

    startText = game.add.sprite(800, 550, 'startText');
    startText.anchor.setTo(0.5);
    startText.scale.setTo(0.6);
    startTextTween = game.add.tween(startText).to({alpha:0.4},500,'Quad.easeInOut',true,0,false,true).loop(true);
    startTextTween.pause();
    startText.alpha = 0;

    QuestionPanel = game.add.sprite( 0, 100,'Panel','QuestionPanel.png');
    QuestionPanel.alpha = 0;    
    for(var i = 0;i<=2;i++){
        answerpannel[i] = game.add.sprite( 1100+100*(i-1), 550,'Panel','AnswerPanel.png');
        answerpannel[i].scale.setTo(0.8,0.8); 
        answerpannel[i].anchor.setTo(0.5,0.5);
        answerpannel[i].alpha = 0; 
        answerpannel[i].events.onInputDown.add(checkAnswer, this);
       
        answerpannelTutorial[i] = game.add.sprite( 1100+100*(i-1), 550,'Panel','AnswerPanel.png');
        answerpannelTutorial[i].scale.setTo(0.8,0.8); 
        answerpannelTutorial[i].anchor.setTo(0.5,0.5);
        answerpannelTutorial[i].alpha = 0; 
        answerpannelTutorial[i].events.onInputDown.add(checkAnswerTutorial, this);
       
        /*
        AnswerPanelLight[i] = game.add.sprite( 1100+100*(i-1), 550,'Panel','AnswerPanelRightLight.png');
        AnswerPanelLight[i].anchor.setTo(0.5);
        AnswerPanelLight[i].alpha = 1;
        */
    }    
    PanelStartFx001 = game.add.sprite(0,100,'Panel');
    PanelStartFx001.alpha = 0;
    PanelStartFx001Animation = PanelStartFx001.animations.add("PanelStartFx001",Phaser.Animation.generateFrameNames('PanelStartFx001_',0,15, '.png', 5), 10, true);
       
    PanelStartFx002 = game.add.sprite(0,100,'Panel');
    PanelStartFx002.alpha = 0;
    PanelStartFx002Animation = PanelStartFx002.animations.add("PanelStartFx002",Phaser.Animation.generateFrameNames('PanelStartFx002_',0,15, '.png', 5), 10, true);

    PanelStartFx003 = game.add.sprite(0,100,'Panel');
    PanelStartFx003.alpha = 0;
    PanelStartFx003Animation = PanelStartFx003.animations.add("PanelStartFx003",Phaser.Animation.generateFrameNames('PanelStartFx003_',0,15, '.png', 5), 10, true);
    var style = { font: "60px Arial", fill: "#5981A7", align: "center" };
    NumSum = game.add.text(game.world.centerX+295,500-229,'', style);
    NumSum.anchor.set(0.5);
        
    NumAdd1 = game.add.text(game.world.centerX+295-95,500-121,'', style);
    NumAdd1.anchor.set(0.5);    

    NumAdd2 = game.add.text(game.world.centerX+295+95,500-121,'', style);
    NumAdd2.anchor.set(0.5);

    var style = { font: "40px Arial", fill: "#ffffff", align: "center" };

    for(var i = 0;i<=2;i++){
        FishingAnswerNum[i] = game.add.text(1000+100*i, 552,'', style);
        FishingAnswerNum[i].anchor.set(0.5);
    }

    PanelWrongFx001 = game.add.sprite(0,100,'Panel');
    PanelWrongFx001.alpha = 0;
    PanelWrongFx001Animation = PanelWrongFx001.animations.add("PanelWrongFx001",Phaser.Animation.generateFrameNames('PanelWrongFx001_',0,10, '.png', 5), 10, true);

    PanelWrongFx002 = game.add.sprite(0,100,'Panel');
    PanelWrongFx002.alpha = 0;
    PanelWrongFx002Animation = PanelWrongFx002.animations.add("PanelWrongFx002",Phaser.Animation.generateFrameNames('PanelWrongFx002_',0,10, '.png', 5), 10, true);

    PanelWrongFx003 = game.add.sprite(0,100,'Panel');
    PanelWrongFx003.alpha = 0;
    PanelWrongFx003Animation = PanelWrongFx003.animations.add("PanelWrongFx003",Phaser.Animation.generateFrameNames('PanelWrongFx003_',0,10, '.png', 5), 10, true);        

    PanelMask = game.add.sprite(950,500,'PanelMask');
    
    PanelMask.scale.setTo(0,0);
    PanelMask.alpha = 0;
    PanelMask.events.onInputDown.add(Block, this);
    PanelMask.inputEnabled = true;
    //TutorialText-----------------------------------------------------------------------------------------------
    TutorialText = game.add.sprite(0,0,'TutorialText','TutorialText.png');
    TutorialText.alpha = 0;
    
    TutorialAddText = game.add.sprite(0,0,'TutorialText','TutorialAddText.png');
    TutorialAddText.alpha = 0;

    TutorialMinusText = game.add.sprite(0,0,'TutorialText','TutorialMinusText.png');
    TutorialMinusText.alpha = 0;
    //Board------------------------------------------
    GetFishBoardBG = game.add.sprite(game.world.centerX,game.world.centerY,'GetFishBoard', "GetFishBoard.png");
    GetFishBoardBG.anchor.setTo(0.5);
    GetFishBoardBG.alpha = 0;
        
    GetFishBoardBtn = game.add.sprite(game.world.centerX,game.world.centerY,'GetFishBoard', "GetFishBoardBtn.png");
    GetFishBoardBtn.anchor.setTo(0.5);
    GetFishBoardBtn.alpha = 0;
        
    GetFishBoardSeal = game.add.sprite(game.world.centerX,game.world.centerY,'GetFishBoard', "GetFishBoardSeal.png");
    GetFishBoardSeal.anchor.setTo(0.5);
    GetFishBoardSeal.alpha = 0;
       
    GetFishAmazingSeal = game.add.sprite(game.world.centerX,game.world.centerY,'GetFishBoard', "AmazingSeal.png");
    GetFishAmazingSeal.anchor.setTo(0.5);
    GetFishAmazingSeal.alpha = 0;        
        
    GetFishContinueBtnHover = game.add.sprite(game.world.centerX,game.world.centerY,'GetFishBoard', "ContinueBtnHover.png");
    GetFishContinueBtnHover.anchor.setTo(0.5);
    GetFishContinueBtnHoverTween = game.add.tween(GetFishContinueBtnHover).to({alpha:0.4},500,'Quad.easeInOut',true,0,false,true).loop(true);
    GetFishContinueBtnHoverTween.pause();        
    GetFishContinueBtnHover.alpha = 0;
        
    GetFishExitBtnHover = game.add.sprite(game.world.centerX,game.world.centerY,'GetFishBoard', "ExitBtnHover.png");
    GetFishExitBtnHover.anchor.setTo(0.5); 
    GetFishExitBtnHoverTween = game.add.tween(GetFishExitBtnHover).to({alpha:0.4},500,'Quad.easeInOut',true,0,false,true).loop(true);
    GetFishExitBtnHoverTween.pause();           
    GetFishExitBtnHover.alpha = 0;
      
    GetFishExitBtnHoverArea = game.add.sprite(game.world.centerX+150,game.world.centerY+102,'GetFishBoard', "BtnArea.png");
    GetFishExitBtnHoverArea.anchor.setTo(0.5);
    GetFishExitBtnHoverArea.events.onInputDown.add(GetFishExitBtnDown, this);
    //GetFishExitBtnHoverArea.events.onInputOver.add(GetFishExitBtnOver, this);
    //GetFishExitBtnHoverArea.events.onInputOut.add(GetFishExitBtnOut, this);        
    GetFishExitBtnHoverArea.alpha = 0;
        
    GetFishContinueBtnHoverArea = game.add.sprite(game.world.centerX+50,game.world.centerY+102,'GetFishBoard', "BtnArea.png");
    GetFishContinueBtnHoverArea.anchor.setTo(0.5); 
    GetFishContinueBtnHoverArea.events.onInputDown.add(GetFishContinueBtnDown, this);
    //GetFishContinueBtnHoverArea.events.onInputOver.add(GetFishContinueBtnOver, this);
    //GetFishContinueBtnHoverArea.events.onInputOut.add(GetFishContinueBtnOut, this);          
    GetFishContinueBtnHoverArea.alpha = 0;        
       
    //FailBoard------------------------------------------------------------------------------------------------
    FailBoardBG = game.add.sprite(game.world.centerX,game.world.centerY,'FailBoard', "FailBoard.png");
    FailBoardBG.anchor.setTo(0.5);
    FailBoardBG.alpha = 0;
        
    FailBoardBtn = game.add.sprite(game.world.centerX,game.world.centerY,'FailBoard', "FailBoardBtn.png");
    FailBoardBtn.anchor.setTo(0.5);
    FailBoardBtn.alpha = 0;
                
    FailBoardExitBtnHover = game.add.sprite(game.world.centerX,game.world.centerY,'FailBoard', "FailBoardExitBtnHover.png");
    FailBoardExitBtnHover.anchor.setTo(0.5);
    FailBoardExitBtnHoverTween = game.add.tween(FailBoardExitBtnHover).to({alpha:0.4},500,'Quad.easeInOut',true,0,false,true).loop(true);
    FailBoardExitBtnHoverTween.pause();        
    FailBoardExitBtnHover.alpha = 0;
        
    FailBoardRestartBtnHover = game.add.sprite(game.world.centerX,game.world.centerY,'FailBoard', "FailBoardRestartBtnHover.png");
    FailBoardRestartBtnHover.anchor.setTo(0.5); 
    FailBoardRestartBtnHoverTween = game.add.tween(FailBoardRestartBtnHover).to({alpha:0.4},500,'Quad.easeInOut',true,0,false,true).loop(true);
    FailBoardRestartBtnHoverTween.pause();           
    FailBoardRestartBtnHover.alpha = 0;
        
    FailBoardExitBtnHoverArea = game.add.sprite(game.world.centerX+49,game.world.centerY+70,'FailBoard', "FailBoardBtnArea.png");
    FailBoardExitBtnHoverArea.anchor.setTo(0.5);
    FailBoardExitBtnHoverArea.events.onInputDown.add(FailBoardExitBtnDown, this);
    //FailBoardExitBtnHoverArea.events.onInputOver.add(FailBoardExitBtnOver, this);
    //FailBoardExitBtnHoverArea.events.onInputOut.add(FailBoardExitBtnOut, this);        
    FailBoardExitBtnHoverArea.alpha = 0;
    //FailBoardExitBtnHoverArea.inputEnabled = true;
        
    FailBoardRestartBtnHoverArea = game.add.sprite(game.world.centerX-49,game.world.centerY+70,'FailBoard', "FailBoardBtnArea.png");
    FailBoardRestartBtnHoverArea.anchor.setTo(0.5); 
    FailBoardRestartBtnHoverArea.events.onInputDown.add(FailBoardRestartBtnDown, this);
    //FailBoardRestartBtnHoverArea.events.onInputOver.add(FailBoardRestartBtnOver, this);
    //FailBoardRestartBtnHoverArea.events.onInputOut.add(FailBoardRestartBtnOut, this);          
    FailBoardRestartBtnHoverArea.alpha = 0;   

    OrangeFishBox = game.add.sprite(game.world.centerX,game.world.centerY,'GetFishBoard', "OrangeFishBox.png");
    OrangeFishBox.anchor.setTo(0.5);
    OrangeFishBox.alpha = 0; 
    

    //sound-----------------------------------------------------------------------------------------------------
    rightFX = game.add.audio('rightFX');
    wrongFX = game.add.audio('wrongFX');
    successFX = game.add.audio('successFX');
    startFX = game.add.audio('startFX');
    failureFX = game.add.audio('failureFX');
    clickFX = game.add.audio('clickFX');
    add_energyFX = game.add.audio('add_energyFX');            
    alertFX = game.add.audio('alertFX');
    fishingBG = game.add.audio('fishingBG');
    fishing = game.add.audio('fishing');
    fishingBG.loopFull(1);



    Client.askNewPlayer();
   
};

Game.update = function(){

};


function Block(){
    console.log('block');
}
Game.GetMyID = function(id,x,y){
    console.log(id);
    MyPlayerID = id;
};

Game.addNewPlayer = function(id,x,y){
    PlayerAmount++;
    if(id == MyPlayerID){
        PlayerList[PlayerAmount-1] = id;
        
        Game.FishBarBG[id] = game.add.sprite(x,y,'FishBar','FishBarMyselfBG.png');
        Game.EnergyBar[id] = game.add.sprite(x,y,'FishBar','EnergyBar.png');
        Game.EnergyBar[id].scale.setTo(0.2,1);
        
        Game.FishBar[id] = game.add.sprite(x,y,'FishBar','FishBarMyself.png');
        
        Game.FishBarLight[id] = game.add.sprite(x,y,'FishBar','FishBarLight.png');
        Game.FishBarLight[id].alpha = 0;
        Game.FishBarPositionX[id] = x;
        Game.FishBarPositionY[id] = y;
        //EnergyTransfer-----------------------------------------------------------------------------
        Game.EnergyTransfer[id] = game.add.sprite(0,0,'EnergyTransfer');
        Game.EnergyTransferAnimate[id] = Game.EnergyTransfer[id].animations.add("EnergyTransfer",Phaser.Animation.generateFrameNames('EnergyTransfer_',0,19, '.png', 5), 10, true);
        Game.EnergyTransfer[id].anchor.setTo(0.5,0.5);
        Game.EnergyTransfer[id].scale.setTo(0.8);
        Game.EnergyTransfer[id].alpha = 0; 
  
    }else{
        //console.log(id);
        PlayerList[PlayerAmount-1] = id;
        Game.FishBarBG[id] = game.add.sprite(x,y,'FishBar','FishBarBG.png');
        Game.EnergyBar[id] = game.add.sprite(x,y,'FishBar','EnergyBar.png');
        Game.EnergyBar[id].scale.setTo(0.2,1);
        Game.FishBar[id] = game.add.sprite(x,y,'FishBar','FishBar.png');
        Game.FishBarLight[id] = game.add.sprite(x,y,'FishBar','FishBarLight.png');
        Game.FishBarLight[id].alpha = 0;
        Game.FishBarPositionX[id] = x;
        Game.FishBarPositionY[id] = y;
        //EnergyTransfer-----------------------------------------------------------------------------
        Game.EnergyTransfer[id] = game.add.sprite(0,0,'EnergyTransfer');
        Game.EnergyTransferAnimate[id] = Game.EnergyTransfer[id].animations.add("EnergyTransfer",Phaser.Animation.generateFrameNames('EnergyTransfer_',0,19, '.png', 5), 10, true);
        Game.EnergyTransfer[id].anchor.setTo(0.5,0.5);
        Game.EnergyTransfer[id].scale.setTo(0.8);
        Game.EnergyTransfer[id].alpha = 0; 

    }
    if( PlayerAmount >=2 ){
        startText.alpha = 1;
        startTextTween.resume();
    }
    if( PlayerAmount >= 2 ){
        BG.inputEnabled = true;
        BG.input.useHandCursor = true;
    }else{
        BG.inputEnabled = false;
    }    

};
function askstartGame(){
    Client.startNewGame();
    
};
Game.startTutorial = function(data,ans,addmode){
    PanelMask.scale.setTo(0,0);
    var equation = data;
    var answer = ans;
    //console.log(equation);
    BG.inputEnabled = false;
    startTextTween.pause();
    startTextFadeOut = game.add.tween(startText).to({alpha:0},500,'Quad.easeInOut',true);
    startTextFadeOut.onComplete.add(function(){
        PanelStartFx001.alpha = 1;
        PanelStartFx002.alpha = 1;
        PanelStartFx003.alpha = 1;
        PanelStartFx001Animation = PanelStartFx001.animations.play("PanelStartFx001",30,false);
        PanelStartFx002Animation = PanelStartFx002.animations.play("PanelStartFx002",30,false);
        PanelStartFx003Animation = PanelStartFx003.animations.play("PanelStartFx003",30,false);
        PanelStartFx003Animation.onComplete.add(function () {	
            PanelStartFx001.alpha = 0;
            PanelStartFx002.alpha = 0;
            PanelStartFx003.alpha = 0;
        }, this);
        game.add.tween(QuestionPanel).to({alpha:1},300,'Quad.easeInOut',true,300);
        for(var i = 0;i<=2;i++){
            game.add.tween(answerpannelTutorial[i]).to({alpha:1},300,'Quad.easeInOut',true,300);
        }  
        game.add.tween(TutorialText).to({alpha:1},300,'Quad.easeInOut',true,300);
        //createQuestion(equation,answer,addmode);
        tutorial();
    });
}
function tutorial(){
    game.add.tween(TutorialAddText).to({alpha:1},300,'Quad.easeInOut',true,300);
    PanelMask.scale.setTo(0,0);
    CorrectAnswer = 5;
    NumSum.setText('?');
    NumAdd1.setText(2);
    NumAdd2.setText(3);

    FishingAnswerNum[0].setText(5);
    answerpannelTutorial[0].variable = 5
    answerpannelTutorial[0].inputEnabled = true;
    FishingAnswerNum[1].setText(6);
    answerpannelTutorial[1].inputEnabled = true;
    FishingAnswerNum[2].setText(7);
    answerpannelTutorial[2].inputEnabled = true;

}
function tutorialMinus(){
    TutorialAddText.alpha = 0;
    TutorialMinusText.alpha = 1;
    PanelMask.scale.setTo(0,0);
    CorrectAnswer = 6;
    NumSum.setText(8);
    NumAdd1.setText(2);
    NumAdd2.setText('?');

    FishingAnswerNum[0].setText(10);
    FishingAnswerNum[1].setText(8);
    FishingAnswerNum[2].setText(6);
    answerpannelTutorial[2].variable = 6
    //answerpannelTutorial[2].inputEnabled = true;
    
}

function checkAnswerTutorial(answerpannelTutorial){
    if( answerpannelTutorial.variable == CorrectAnswer ){
        var mode;
        if( answerpannelTutorial.variable == 5 ){
            mode = true;
        }else{
            mode = false;
        }
        Client.checkAnswerTutorial(MyPlayerID,mode);
        PanelMask.scale.setTo(0.6,0.7);
        rightFX.play();
    }else{
        
        wrongFX.play();
    }
}
function CorrectTutorial(id,addmode){
    
    if(addmode == false){            
        Game.EnergyTransfer[id].x = 1200;
        Game.EnergyTransfer[id].y = 370;

    }else if(addmode == true){
        Game.EnergyTransfer[id].x = 1100;
        Game.EnergyTransfer[id].y = 255;        
    }
    

    Game.EnergyTransfer[id].alpha = 1;
    Game.EnergyTransfer[id].animations.play("EnergyTransfer",30,true);
    EnergyTransferTween = game.add.tween(Game.EnergyTransfer[id]).to({x:Game.FishBarPositionX[id],y:Game.FishBarPositionY[id]},300,'Quad.easeIn',true); 
    EnergyTransferTween.onComplete.add(function(){
        Game.EnergyTransfer[id].alpha = 0;
        Game.EnergyTransfer[id].animations.stop();
        game.add.tween(Game.EnergyBar[id].scale).to({x:'+0.1'},300,'Quad.easeIn',true); 
        Game.FishBarLight[id].alpha = 1;
        game.add.tween(Game.FishBarLight[id]).to({alpha:0},300,'Quad.easeIn',true); 
        if( id == MyPlayerID ){
            add_energyFX.play();
            if( addmode == true ){
                Client.TutorialCheck(MyPlayerID);
            }else{
                Client.TutorialFinish();
            }
            

        }
        
    },this);

}
function ResetBar(){
    //console.log(id);
    for( var i = 0;i<PlayerList.length;i++ ){
        CleanBarTween = game.add.tween(Game.EnergyBar[PlayerList[i]]).to({alpha:0},1000,'Quad.easeInOut',true);
    }
    CleanBarTween.onComplete.add(function(){
        for( var i = 0;i<PlayerList.length;i++ ){
            Game.EnergyBar[PlayerList[i]].scale.setTo(0.2,1);
            Game.EnergyBar[PlayerList[i]].alpha = 1;
        }  
     
    },this);
}
function FinishTutorial(){
    ResetBar();
    var style = { font: "60px Arial", fill: "#ffffff", align: "center" };
    ReadyText = game.add.text(game.world.centerX,game.world.centerY,'Ready', style);
    ReadyText.anchor.set(0.5);
    ReadyText.scale.setTo(0);    
    //PanelMask.scale.setTo(0.6,0.7);
    /*
    NumSum.destroy();
    NumAdd1.destroy();
    NumAdd2.destroy();
    */    
    game.add.tween(NumSum).to({alpha:0},1000,'Quad.easeInOut',true);
    game.add.tween(NumAdd1).to({alpha:0},1000,'Quad.easeInOut',true);
    game.add.tween(NumAdd2).to({alpha:0},1000,'Quad.easeInOut',true);

    game.add.tween(TutorialText).to({alpha:0},1000,'Quad.easeInOut',true);
    game.add.tween(TutorialMinusText).to({alpha:0},1000,'Quad.easeInOut',true);
    
    for(var i = 0;i<=2;i++){
        game.add.tween(answerpannelTutorial[i]).to({alpha:0},1000,'Quad.easeInOut',true);
        //FishingAnswerNum[i].destroy();
        game.add.tween(FishingAnswerNum[i]).to({alpha:0},1000,'Quad.easeInOut',true);
    }  
    QuestionPanelFadeOut = game.add.tween(QuestionPanel).to({alpha:0},1000,'Quad.easeInOut',true);
    QuestionPanelFadeOut.onComplete.add(function(){
        for(var i = 0;i<=2;i++){
            answerpannelTutorial[i].scale.setTo(0);

        }   
        
        ReadyTextShowUp = game.add.tween(ReadyText.scale).to({x:1,y:1},300,'Quad.easeInOut',true,2000);
        ReadyTextShowUp.onComplete.add(function(){
            alertFX.play();
            ReadyTextFadeOut = game.add.tween(ReadyText.scale).to({x:0,y:0},50,'Quad.easeInOut',true,2000);
            ReadyTextFadeOut.onComplete.add(function(){
                Client.StartFishing();
            },this);
        },this); 
    },this);


}
Game.StartFishing = function(){
    FoxPullingRod.animations.play("FoxPullingRod",30,true);
    FoxPullingRod.alpha = 1;
    FoxPulling.animations.play("FoxPulling",30,true);
    FoxPulling.alpha = 1;

    FoxSitting.alpha = 0;
    FoxSittingRod.alpha = 0;
    FoxSittingAnimate.stop();
    FoxSittingRodAnimate.stop();
    

    fishing.loopFull(1);
    fishingBG.stop();
    startFX.play();
    //PanelMask.scale.setTo(0,0);
    PanelStartFx001.alpha = 1;
    PanelStartFx002.alpha = 1;
    PanelStartFx003.alpha = 1;
    PanelStartFx001Animation = PanelStartFx001.animations.play("PanelStartFx001",30,false);
    PanelStartFx002Animation = PanelStartFx002.animations.play("PanelStartFx002",30,false);
    PanelStartFx003Animation = PanelStartFx003.animations.play("PanelStartFx003",30,false);
    PanelStartFx003Animation.onComplete.add(function () {	
        NumSum.alpha = 1;
        NumAdd1.alpha = 1;
        NumAdd2.alpha = 1;

        PanelStartFx001.alpha = 0;
        PanelStartFx002.alpha = 0;
        PanelStartFx003.alpha = 0;
        for(var i = 0;i<=2;i++){
            FishingAnswerNum[i].alpha = 1;
        }
    }, this);
    game.add.tween(QuestionPanel).to({alpha:1},300,'Quad.easeInOut',true,300);
    for(var i = 0;i<=2;i++){
        game.add.tween(answerpannel[i]).to({alpha:1},300,'Quad.easeInOut',true,300);
    }
};

function createQuestion(equation,answer,addmode){
    //PanelMask.scale.setTo(0.6,0.7);
    //console.log(equation);
    //console.log(answer);
    PanelMask.scale.setTo(0,0);
    createAnswerString(answer);
    if( addmode == true){
        NumSum.setText('?');
        NumAdd1.setText(equation[0]);
        NumAdd2.setText(equation[1]);     
        //addmode = false;    
    }else{
        NumSum.setText(equation[2]);
        NumAdd1.setText(equation[0]);
        NumAdd2.setText('?');     
        //addmode = true;
    }
  
        
}
function checkAnswer(answerpannel){
    //console.log(answerpannel.inputEnabled);
    if( answerpannel.variable == CorrectAnswer ){
        if( Game.EnergyBar[MyPlayerID].scale.x >= 0.89 ){

            Client.FinishFishing(MyPlayerID);
        }else{
            Client.AnswerCorrect(MyPlayerID);

        }
        rightFX.play();
    }else{
        Client.AnswerWrong(MyPlayerID);
        PanelWrongFx001.animations.play("PanelWrongFx001",30,false);
        PanelWrongFx001.alpha = 1;
        PanelWrongFx002.animations.play("PanelWrongFx002",30,false);
        PanelWrongFx002.alpha = 1;
        PanelWrongFx003.animations.play("PanelWrongFx003",30,false);
        PanelWrongFx003.alpha = 1;
        
        wrongFX.play();
    }
}

Game.EnableAnswerPanel = function(){
    console.log(answerpannel[0].inputEnabled);
    answerpannel[0].inputEnabled = true;
    answerpannel[1].inputEnabled = true;
    answerpannel[2].inputEnabled = true;
    console.log(answerpannel[0].inputEnabled);
};
/*
Game.LockAnswerPanel = function(){
    console.log(answerpannel[0].inputEnabled);
    answerpannel[0].inputEnabled = false;
    answerpannel[1].inputEnabled = false;
    answerpannel[2].inputEnabled = false;
    console.log(answerpannel[0].inputEnabled);
    

};
*/
Game.WrongCheck = function(PlayerID){
    /*
    if( Game.EnergyBar[PlayerID].scale.x >= 0.2 ){
        game.add.tween(Game.EnergyBar[PlayerID].scale).to({x:'-0.1'},300,'Quad.easeIn',true);
    }
    */
    game.add.tween(Game.EnergyBar[PlayerID].scale).to({x:0.2},500,'Quad.easeIn',true);
    

};
Game.CorrectCheck = function(id,addmode){
    CorrectAnswer = -100;
    PanelMask.scale.setTo(0.6,0.7);
    if( id != MyPlayerID ){
        wrongFX.play();
    }
    //console.log(addmode);
    if(addmode == false){            
        Game.EnergyTransfer[id].x = 1200;
        Game.EnergyTransfer[id].y = 370;

    }else if(addmode == true){
        Game.EnergyTransfer[id].x = 1100;
        Game.EnergyTransfer[id].y = 255;        
    }
    

    Game.EnergyTransfer[id].alpha = 1;
    Game.EnergyTransfer[id].animations.play("EnergyTransfer",30,true);
    EnergyTransferTween = game.add.tween(Game.EnergyTransfer[id]).to({x:Game.FishBarPositionX[id],y:Game.FishBarPositionY[id]},300,'Quad.easeIn',true); 
    EnergyTransferTween.onComplete.add(function(){
        Game.EnergyTransfer[id].alpha = 0;
        Game.EnergyTransfer[id].animations.stop();
        game.add.tween(Game.EnergyBar[id].scale).to({x:'+0.1'},300,'Quad.easeIn',true); 
        Game.FishBarLight[id].alpha = 1;
        game.add.tween(Game.FishBarLight[id]).to({alpha:0},300,'Quad.easeIn',true); 
        if( id == MyPlayerID ){
            add_energyFX.play();
            
            Client.NextQuestion();

        }
        
    },this);
    
}


Game.FinishGame = function(PlayerID,addmode){
    PanelMask.scale.setTo(0.6,0.7);
    NumSum.destroy();
    NumAdd1.destroy();
    NumAdd2.destroy();
    for(var i = 0;i<=2;i++){
        FishingAnswerNum[i].destroy();
    }

    game.add.tween(QuestionPanel).to({alpha:0},300,'Quad.easeInOut',true);
    for(var i = 0;i<=2;i++){
        game.add.tween(answerpannel[i]).to({alpha:0},300,'Quad.easeInOut',true);
    }
    
    if(addmode == false){            
        Game.EnergyTransfer[PlayerID].x = 1200;
        Game.EnergyTransfer[PlayerID].y = 370;

    }else if(addmode == true){
        Game.EnergyTransfer[PlayerID].x = 1100;
        Game.EnergyTransfer[PlayerID].y = 255;        
    }
    
    Game.EnergyTransfer[PlayerID].alpha = 1;
    Game.EnergyTransfer[PlayerID].animations.play("EnergyTransfer",30,true);
    EnergyTransferTween = game.add.tween(Game.EnergyTransfer[PlayerID]).to({x:Game.FishBarPositionX[PlayerID],y:Game.FishBarPositionY[PlayerID]},300,'Quad.easeIn',true); 
    EnergyTransferTween.onComplete.add(function(){
        Game.EnergyTransfer[PlayerID].alpha = 0;
        Game.EnergyTransfer[PlayerID].animations.stop();
        game.add.tween(Game.EnergyBar[PlayerID].scale).to({x:'+0.1'},300,'Quad.easeIn',true); 
        Game.FishBarLight[PlayerID].alpha = 1;
        game.add.tween(Game.FishBarLight[PlayerID]).to({alpha:0},300,'Quad.easeIn',true); 
        if( PlayerID == MyPlayerID ){
            add_energyFX.play();
        }
    },this);
    
    fishing.stop();

    FoxPulling.alpha = 0;
    FoxPullingRod.alpha = 0;
    FoxPullingAnimate.stop();
    FoxPullingRodAnimate.stop();    

    if(PlayerID == MyPlayerID){
        successFX.play();
        FoxGetFish.animations.play("FoxGetFish",20,false);
        FoxGetFish.alpha = 1;
        
        FoxGetFishRod.animations.play("FoxGetFishRod",20,false);
        FoxGetFishRod.alpha = 1;       
        
        OrangeFish.animations.play("OrangeFish",20,false);
        OrangeFish.alpha = 1;     

        OrangeFishAnimate.onComplete.add(function () {
            OrangeFish.alpha = 0;
            OrangeFishStop.alpha = 1;
            OrangeFishStop.animations.play("OrangeFishStop",30,true);
        
        }, this); 	

        GetFishBoardBG.scale.setTo(0);
        GetFishBoardBG.alpha = 1;
        game.add.tween(GetFishBoardBG.scale).to({x:1,y:1},500,'Quad.easeOut',true,2000);
        game.add.tween(OrangeFishBox).to({alpha:1},500,'Quad.easeOut',true,2500);

        GetFishBoardBtn.alpha = 0;
        GetFishBoardBtnTween = game.add.tween(GetFishBoardBtn).to({alpha:1},500,'Quad.easeOut',true,4000);  
        GetFishBoardBtnTween.onComplete.add(function(){
            GetFishExitBtnHoverArea.inputEnabled = true;
            GetFishContinueBtnHoverArea.inputEnabled = true;        
        },this);
        
    }else{
        failureFX.play();
        FoxFalling.animations.play("FoxFalling",25,false);
        FoxFalling.alpha = 1;
        FoxFallingRod.animations.play("FoxFallingRod",25,false);
        FoxFallingRod.alpha = 1;        
        //console.log('lose');
        FailBoardBG.scale.setTo(0);
        FailBoardBG.alpha = 1;
        game.add.tween(FailBoardBG.scale).to({x:1,y:1},500,'Quad.easeOut',true,2000);
        FailBoardBtnTween = game.add.tween(FailBoardBtn).to({alpha:1},500,'Quad.easeOut',true,3000);
        FailBoardBtnTween.onComplete.add(function(){
            
            FailBoardExitBtnHoverArea.inputEnabled = true;
            FailBoardRestartBtnHoverArea.inputEnabled = true;          
        },this); 

    }

};

Game.removePlayer = function(id){
    PlayerAmount--;
   
    if( PlayerAmount == 1 ){
        startTextTween.pause();
        startText.alpha = 0;
        
    }
    Game.FishBarBG[id].destroy();
    Game.EnergyBar[id].destroy();
    Game.FishBar[id].destroy();
    Game.FishBarLight[id].destroy();

    delete Game.FishBarBG[id];
    delete Game.EnergyBar[id];
    delete Game.FishBar[id];
    delete Game.FishBarLight[id];
};


function createAnswerString(answer){
    var answerNum = answer;
    var style = { font: "40px Arial", fill: "#ffffff", align: "center" };
    var answerindex = 0;

    var AnswerRand = Math.floor(Math.random()*3);
    for(var i = 0;i<=2;i++){
        //answerpannel[i].inputEnabled = true;
        if( AnswerRand%3 == i ){
            
            FishingAnswerNum[i].setText(answerNum[2]);
            answerpannel[i].variable = answerNum[2];
            CorrectAnswer = answerNum[2];
            
            
        }else{
            FishingAnswerNum[i].setText(answerNum[answerindex]);
            answerpannel[i].variable = answerNum[answerindex];
            //answerpannelcheck[i] = false;
            answerindex++;
        }           
    }        
}

function FailBoardRestartBtnDown(){
    game.add.tween(FailBoardBG).to({alpha:0},500,'Quad.easeOut',true,0);
    game.add.tween(FailBoardBtn).to({alpha:0},500,'Quad.easeOut',true,0);
    //FailBoardRestartBtnHoverTween.pause();        
    //FailBoardRestartBtnHover.alpha = 0;  
    FailBoardExitBtnHoverArea.inputEnabled = false;
    FailBoardRestartBtnHoverArea.inputEnabled = false;  
    //restartfishing();
}

function FailBoardExitBtnDown(){
    game.add.tween(FailBoardBG).to({alpha:0},500,'Quad.easeOut',true,0);
    game.add.tween(FailBoardBtn).to({alpha:0},500,'Quad.easeOut',true,0);
    //ExitFishingPage();
    FailBoardExitBtnHoverArea.inputEnabled = false;
    FailBoardRestartBtnHoverArea.inputEnabled = false;
    //FailBoardExitBtnHoverTween.pause();        
    //FailBoardExitBtnHover.alpha = 0;    
}

function GetFishContinueBtnDown(){
    game.add.tween(GetFishBoardBG).to({alpha:0},500,'Quad.easeOut',true,0);
    game.add.tween(GetFishBoardBtn).to({alpha:0},500,'Quad.easeOut',true,0);
    game.add.tween(OrangeFishBox).to({alpha:0},500,'Quad.easeOut',true,0);
    
    //timer.stop(false);
    //ContinueFishing();
    GetFishExitBtnHoverArea.inputEnabled = false;
    GetFishContinueBtnHoverArea.inputEnabled = false;       
    //GetFishContinueBtnHoverTween.pause();           
    //GetFishContinueBtnHover.alpha = 0;        
}

function GetFishExitBtnDown(){
    game.add.tween(GetFishBoardBG).to({alpha:0},500,'Quad.easeOut',true,0);
    game.add.tween(GetFishBoardBtn).to({alpha:0},500,'Quad.easeOut',true,0);
    game.add.tween(OrangeFishBox).to({alpha:0},500,'Quad.easeOut',true,0);

    GetFishExitBtnHoverArea.inputEnabled = false;
    GetFishContinueBtnHoverArea.inputEnabled = false;       
    
    //GetFishExitBtnHoverTween.pause();           
    //GetFishExitBtnHover.alpha = 0;    
    //ExitFishingPage();
}
