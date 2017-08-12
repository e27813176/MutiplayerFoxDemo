
var game = new Phaser.Game(1600,740, Phaser.AUTO, document.getElementById('game'));
game.state.add('Game',Game);
game.state.start('Game');