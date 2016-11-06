var HomeState = {

  init: function(message) {
    this.message = message;
  },
  create: function() {
    var background = this.game.add.sprite(0,0, 'backyard');
    background.inputEnabled = true;

    background.events.onInputDown.add(function() {
      this.state.start('GameState');
    }, this);

    var style = {font: '40px Arial', fill: '#fff'};
    var homeText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, "Touch to start", style);
    homeText.anchor.setTo(0.5);

    if(this.message) {
      this.game.add.text(60, this.game.world.centerY - 200, this.message, style);
    }

  }
};
