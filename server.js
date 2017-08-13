var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.lastPlayderID = 0;
var SOCKET_LIST = [0,0,0,0];
server.listen(process.env.PORT || 3333,function(){
    console.log('Listening on '+server.address().port);
});
var PlayerTutorialCheck = 0;
var PlayerAmount = 0;
io.on('connection',function(socket){
    var addmode = true;
    socket.on('newplayer',function(){
        PlayerAmount++;
        socket.player = {
            id: Math.random(),
            x:  '',
            y: 50,
            amount:0
        };
        for( let i = 0;i < 4;i++ ){
            if( SOCKET_LIST[i] == 0 ){
                SOCKET_LIST[i] = socket.player.id;
                socket.player.x = (i+1)*400-350;
                socket.player.amount = i + 1;
                break;
            }
        }
        //SOCKET_LIST.push(socket.player.id);
        //console.log(SOCKET_LIST);
        
        socket.emit('myID',socket.player);
        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('otherplayers',socket.player);
        
        socket.on('askToStart',function(){
            equation = createFishingEquation();
            answer = createAnswerValue(equation,addmode);
            //console.log(equation);
            //console.log(answer);
            io.emit('startTutorial',equation,answer,addmode);
        });
        socket.on('checkAnswerTutorial',function(MyPlayerID,mode){
            io.emit('checkAnswerTutorial',MyPlayerID,mode);
        });
        
        socket.on('TutorialCheck',function(MyPlayerID){
             PlayerTutorialCheck++;
             //console.log(PlayerTutorialCheck);
             //console.log(PlayerAmount);
             if( PlayerTutorialCheck == PlayerAmount ){
                PlayerTutorialCheck = 0; 
                io.emit('NextTutorial');
             }
        });
        socket.on('TutorialFinish',function(){
            PlayerTutorialCheck++;
            if( PlayerTutorialCheck == PlayerAmount ){
                PlayerTutorialCheck = 0; 
                io.emit('FinishTutorial');
            }
        });
        socket.on('StartFishing',function(){
            //console.log('start');
            io.emit('StartFishing');
        });    
        
        socket.on('createNewQuestion',function(){
            //console.log('start');
            if( addmode == true ){
                addmode = false;
            }else{
                addmode = true;
            }
            equation = createFishingEquation();
            answer = createAnswerValue(equation,addmode);
            //console.log(addmode);
            //console.log(equation);
            //console.log(answer);
            io.emit('newQuestion',equation,answer,addmode);
            io.emit('EnablePanel');
        });


        socket.on('answerCorrect',function(data){
            io.emit('answerCorrect',data,addmode);
            //io.emit('LockPanel');
        });
        socket.on('answerWrong',function(ID){
            io.emit('answerWrong',ID);
            
        });        
        socket.on('FinishFishing',function(PlayerID){
            io.emit('FinishGame',PlayerID,addmode);
        });
        socket.on('disconnect',function(){
            PlayerAmount--;
            io.emit('remove',socket.player.id);
            //console.log(socket.player.id);
            var index = SOCKET_LIST.indexOf(socket.player.id);
            SOCKET_LIST[index] = 0;
            //console.log(SOCKET_LIST);
        });
    });


});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    
    return players;
}

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/examdb",function(err,db){
    if(err){ return console.dir(err); }

    var collection = db.collection('FoxGame');
    var docs = [{type:"word",q:"he"},{type:"word",q:"she"}];

    collection.insert(docs,{w:1},function(err,result){
        collection.find().toArray(function(err,items){
            //console.log('items=%j',items);
            
        });
    });
});

function createFishingEquation() {
    var numberA;
    var numberB = -100;

    var numberSum = 100; //initialize numberSum,and make it bigger than 10.

    numberA = Math.floor(Math.random() * 10) + 1;
    numberB = Math.floor(Math.random() * 10) + 1;
                
    numberSum = numberA + numberB;
        
    var plusEquation = [numberA, numberB, numberSum];
    return plusEquation;
}

function createAnswerValue(equation,addmode){
    //console.log(equation);
    answer = [];
    answer[0] = Math.floor(Math.random()*19) + 1;
    answer[1] = Math.floor(Math.random()*19) + 1;
    //addmode = true;
    //minusmode = false;
    var FishingAnswerNum = [];
    //console.log(mode);
    if( addmode == true ){
        if(answer[0] == answer[1] || answer[0] == equation[2] || answer[1] == equation[2]){
            createAnswerValue(equation);
        
        }
        FishingAnswerNum = [ answer[0],answer[1],equation[2] ];
    }else{
        if(answer[0] == answer[1] || answer[0] == equation[1] || answer[1] == equation[1]){
            createAnswerValue(equation);
        
        }
        FishingAnswerNum = [ answer[0],answer[1],equation[1] ];
    }
    
    return FishingAnswerNum;
}