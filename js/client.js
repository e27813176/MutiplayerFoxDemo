
var Client = {};
Client.socket = io.connect();



Client.askNewPlayer = function(){
    
    Client.socket.emit('newplayer');
};
Client.startNewGame = function(){
    Client.socket.emit('askToStart');
    //console.log('ask to start');
};
Client.checkAnswerTutorial = function(MyPlayerID,mode){
    Client.socket.emit('checkAnswerTutorial',MyPlayerID,mode);
};
Client.TutorialCheck = function(MyPlayerID){
    Client.socket.emit('TutorialCheck',MyPlayerID);
};
Client.TutorialFinish = function(){
    Client.socket.emit('TutorialFinish');
};
Client.StartFishing = function(){
    console.log('start');
    Client.socket.emit('StartFishing');
    Client.socket.emit('createNewQuestion');
    
};
Client.AnswerCorrect = function(data){
    Client.socket.emit('answerCorrect',data);    
};
Client.AnswerWrong = function(MyPlayerID){
    Client.socket.emit('answerWrong',MyPlayerID);
};
Client.NextQuestion = function(){
    Client.socket.emit('createNewQuestion');
}; 

Client.FinishFishing = function(PlayerID){
    Client.socket.emit('FinishFishing',PlayerID);
};

Client.socket.on('otherplayers',function(data){
    Game.addNewPlayer(data.id,data.x,data.y);
});
Client.socket.on('myID',function(data){
    Game.GetMyID(data.id,data.x,data.y);
});
Client.socket.on('startTutorial',function(data,answer,addmode){
    Game.startTutorial(data,answer,addmode);
    Game.EnableAnswerPanel();
});
Client.socket.on('StartFishing',function(){
    Game.StartFishing();
    
});


Client.socket.on('EnablePanel',function(){
    //Game.EnableAnswerPanel();
});

Client.socket.on('LockPanel',function(){
    //Game.LockAnswerPanel();
});


Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }
    Client.socket.on('checkAnswerTutorial',function(MyPlayerID,mode){
        CorrectTutorial(MyPlayerID,mode);
    });
    Client.socket.on('NextTutorial',function(){
        tutorialMinus();
    });
    Client.socket.on('FinishTutorial',function(){
        FinishTutorial();
    
    });
    Client.socket.on('answerCorrect',function(data,addmode){
        Game.CorrectCheck(data,addmode); 
    });
    Client.socket.on('answerWrong',function(ID){
        Game.WrongCheck(ID); 
    });
    Client.socket.on('newQuestion',function(equation,answer,addmode){
        createQuestion(equation,answer,addmode);
    });
    Client.socket.on('FinishGame',function(PlayerID,addmode){
        Game.FinishGame(PlayerID,addmode); 
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });
});


