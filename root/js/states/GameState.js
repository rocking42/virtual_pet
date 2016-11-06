var GameState = {
  // exucuted after all is loaded
  create: function() {
    this.background = this.game.add.sprite(0,0, 'backyard');
    this.background.inputEnabled = true;
    // Add event handler to the background
    this.background.events.onInputDown.add(this.placeItem, this);

    this.pet = this.game.add.sprite(100, 400, 'pet');
    this.pet.anchor.setTo(0.5);

    // spritesheet animation frames, fps, loop or not
    this.pet.animations.add('funnyfaces', [1,2,3,2,0], 7, false);

    this.pet.customParams = {health: 100, fun: 100};

    //enables the pet to be dragged around
    this.pet.inputEnabled = true;
    this.pet.input.enableDrag();



    this.apple = this.game.add.sprite(72, 570, 'apple');
    this.apple.anchor.setTo(0.5);
    this.apple.inputEnabled = true;
    this.apple.customParams = {health: 20};
    this.apple.events.onInputDown.add(this.pickItem, this);

    this.candy = this.game.add.sprite(144, 570, 'candy');
    this.candy.anchor.setTo(0.5);
    this.candy.inputEnabled = true;
    this.candy.customParams = {health: -10, fun: 10};
    this.candy.events.onInputDown.add(this.pickItem, this);

    this.duck = this.game.add.sprite(216, 570, 'duck');
    this.duck.anchor.setTo(0.5);
    this.duck.inputEnabled = true;
    this.duck.customParams = {fun: 20};
    this.duck.events.onInputDown.add(this.pickItem, this);

    this.rotate = this.game.add.sprite(282, 570, 'rotate');
    this.rotate.anchor.setTo(0.5);
    this.rotate.inputEnabled = true;
    this.rotate.events.onInputDown.add(this.rotateMore, this);
    // store all buttons in a variable
    this.buttons = [this.apple, this.candy, this.duck, this.rotate];
    // no item is selected initially
    this.selectedItem = null;
    // allows the element to be pressed initially
    this.uiBlocked = false;
    // Add the health and fun text display to the game
    var style = { font: '20px Arial', fill: '#fff' };
    this.game.add.text(10, 20, 'Health', style);
    this.game.add.text(140, 20, 'Fun', style);
    this.healthText = this.game.add.text(80, 20, '', style);
    this.funText = this.game.add.text(185, 20, '', style);
    //shows the initial health and fun value
    this.refreshStats();

    // decrease the health every five seconds
    this.statsDecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this);
  },
  pickItem: function(sprite, event) {
    // check if the ui is not blocked before starting
    if(!this.uiBlocked) {
        //clears the selected item and sets all visibility to 1
        this.clearSelection();
        // sets the current buttons transparency
        sprite.alpha = 0.4;
        // sets the selected item
        this.selectedItem = sprite;
    }
  },
  rotateMore: function(sprite, event) {

    if(!this.uiBlocked) {
    //stops any ui button from being pressed during the animation
    this.uiBlocked = true;

    this.clearSelection();
    sprite.alpha = 0.4;
    //Add an animation to the pet stored in a variable
    var petRotation = this.game.add.tween(this.pet);
    //add what will happen in the tween
    petRotation.to({angle: '+30'}, 300).to({angle: '-60'}, 300).to({angle: '+60'}, 200).to({angle: '-60'}, 200).to({angle: '+30'}, 100);
    // add a function passing the external this parameter which happen once the tween is complete
    petRotation.onComplete.add(function() {
      //allow other buttons to be pressed
      this.uiBlocked = false;
      // reset the visibility
      sprite.alpha = 1;
      //update the fun value
      this.pet.customParams.fun += 10;
      this.refreshStats();
    }, this);
    //start the tween
    petRotation.start();
    }
  },
  clearSelection: function() {
    this.buttons.forEach(function(element, index){
      element.alpha = 1;
    });

    this.selectedItem = null;
  },
  placeItem: function(sprite, event) {
    //ensures an item is selected and the ui isn't blocked
    if(this.selectedItem && !this.uiBlocked) {
      //store the x and y coords of where clicked
      var x = event.position.x;
      var y = event.position.y;
      //creates a new item based on the item selected
      var newItem = this.game.add.sprite(x, y, this.selectedItem.key);
      newItem.anchor.setTo(0.5);
      // adds the customParams to the newly created item
      newItem.customParams = this.selectedItem.customParams;
      // blocks the ui while the pet is moving
      this.uiBlocked = true;
      // adds a tween for the pet movement
      var petMovement = this.game.add.tween(this.pet);
      // move the pet to the x and y variable from before
      petMovement.to({x: x, y: y}, 700);
      // happens once the pet has completed the animation
      petMovement.onComplete.add(function() {
        // destroy the current item
        newItem.destroy();

        // play animation
        this.pet.animations.play('funnyfaces');
        // unblock the ui
        this.uiBlocked = false;
        // loop through the customParams objects to find out what attributes to add to the pet
        for(var stat in newItem.customParams) {
          // ensure it only return the proerties in the item
          if(newItem.customParams.hasOwnProperty(stat)) {
            // adds the properties the pet
            this.pet.customParams[stat] += newItem.customParams[stat];
          }
        }

        this.refreshStats();
      }, this);
      // call the tween
      petMovement.start();
    }
  },
  refreshStats: function() {
    // updates the health and fun text
    this.healthText.text = this.pet.customParams.health;
    this.funText.text = this.pet.customParams.fun;
  },
  reduceProperties: function() {
    // decrease health and fun as well as refresh stats every five seconds
    this.pet.customParams.health -= 10;
    this.pet.customParams.fun -= 15;
    this.refreshStats();
  },
  update: function() {
    // checks health and fun every second to see if they are below 0
    if(this.pet.customParams.health <= 0 || this.pet.customParams.fun <= 0 ) {
      // sets the pet frame to dead
      this.pet.frame = 4;
      // blocks ui
      this.uiBlocked = true;
      // waits two seconds before resetting the game
      this.game.time.events.add(2000, this.gameOver, this);
    }
  },
  gameOver: function() {
    // this.game.state.restart();
    this.state.start('HomeState', true, false, 'GAME OVER!');
  }
};
