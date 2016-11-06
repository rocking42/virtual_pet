var PreloadState  = {
  // load the game before starting
  preload: function() {

    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo");
    this.logo.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('apple', 'assets/images/apple.png');
    this.load.image('arrow', 'assets/images/arrow.png');
    this.load.image('backyard', 'assets/images/backyard.png');
    this.load.image('bar', 'assets/images/bar.png');
    this.load.image('candy', 'assets/images/candy.png');
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('duck', 'assets/images/rubber_duck.png');
    this.load.image('rotate', 'assets/images/rotate.png');
    // Name, location, width, height, number of frames, margin, spacing
    this.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1, 1);
  },
  create: function() {
    this.state.start('HomeState');
  }
};
