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
    game.load.atlas('FoxSitting','assets/fishingpage/FoxSitting.png','assets/fishingpage/FoxSitting.json'); 
    game.load.atlas('FoxSittingRod','assets/fishingpage/FoxSittingRod.png','assets/fishingpage/FoxSittingRod.json');
    game.load.atlas('FoxPulling', 'assets/fishingpage/FoxPulling.png', 'assets/fishingpage/FoxPulling.json');
    game.load.atlas('FoxPullingRod', 'assets/fishingpage/FoxPullingRod.png', 'assets/fishingpage/FoxPullingRod.json');
    
    game.load.atlas('Panel','assets/fishingpage/Panel.png','assets/fishingpage/Panel.json');
    game.load.atlas('FishBar','assets/fishingpage/FishBar.png','assets/fishingpage/FishBar.json');
    //EnergyTransfer-------------------------------------------------------------------------------------------------
    game.load.atlas('EnergyTransfer', 'assets/fishingpage/EnergyTransfer.png', 'assets/fishingpage/EnergyTransfer.json');         
    
    
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
    PanelMask.alpha = 0.5;
    PanelMask.events.onInputDown.add(Block, this);
    PanelMask.inputEnabled = true;
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

        //createQuestion(equation,answer,addmode);
        tutorial();
    });
}
function tutorial(){
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
function CleanBar(id){
    console.log(id);
    //game.add.tween(Game.EnergyBar[id]).to({alpha:0},1000,'Quad.easeInOut',true);

}
function FinishTutorial(){
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

    for(var i = 0;i<=2;i++){
        game.add.tween(answerpannelTutorial[i]).to({alpha:0.5},1000,'Quad.easeInOut',true);
        //FishingAnswerNum[i].destroy();
        game.add.tween(FishingAnswerNum[i]).to({alpha:0},1000,'Quad.easeInOut',true);
    }  
    QuestionPanelFadeOut = game.add.tween(QuestionPanel).to({alpha:0},1000,'Quad.easeInOut',true);
    QuestionPanelFadeOut.onComplete.add(function(){
        for(var i = 0;i<=2;i++){
            answerpannelTutorial[i].scale.setTo(0);

        }   
        ReadyTextShowUp = game.add.tween(ReadyText.scale).to({x:1,y:1},300,'Quad.easeInOut',true,1000);
        ReadyTextShowUp.onComplete.add(function(){
            ReadyTextFadeOut = game.add.tween(ReadyText.scale).to({x:0,y:0},50,'Quad.easeInOut',true,1000);
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

    if(PlayerID == MyPlayerID){
        console.log('win');
    }else{
        console.log('lose');
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