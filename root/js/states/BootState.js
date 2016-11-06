// preloads the load bar
var BootState  = {
  // initiate some game-level settings
  init: function() {
    // scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertiacally = true;
  },
  preload: function() {
    this.load.image('preloadBar', "assets/images/bar.png");
    this.load.image('logo', "assets/images/logo.png");
  },
  create: function() {
    // adds a white background to after the bootstate
    this.game.stage.backgroundColor = "#fff";
    // start the preload state
    this.state.start('PreloadState');
  }
};
