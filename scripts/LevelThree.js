class LevelThree extends Phaser.Scene {
    constructor(){
        super('levelthree')
    }
preload(){
        //audio
        this.load.audio('song','music/cities.mp3');
        this.load.audio('jump_sound', 'sounds/jump_sound.wav')
        this.load.audio('death_sound', 'sounds/death_sound.mp3')
        
        //platforms
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.image('splatform', 'assets/platform_hor.png')
        this.load.image('bplatform', 'assets/platform_blue.png')
        this.load.image('gplatform', 'assets/platform_green.png')
        this.load.image('pplatform', 'assets/platform_purple.png')
        this.load.image('mover', 'assets/platform_vert.png')
        this.load.image('vplatform', 'assets/platform_vert.png')
        this.load.image('wplatform', 'assets/platform_white.png')
        
        //etc
        this.load.image('dust_bunny','assets/dust_bunny.png')
        this.load.image('portal','assets/portal.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('turret', 'assets/turret.png');
        this.load.image('bullet2', 'assets/tracer2.png');
        this.load.image('bullet', 'assets/tracer.png');
        this.load.image('backdrop', 'backdrops/white.png');
}
    
create(){
        var mover1;
        var mover2;
        var mover3;
        var score = 0;
        this.elapsed = 0;
        this.start = true;
        
    
        cursors = this.input.keyboard.createCursorKeys();
        this.tdelay = 0;
        this.tdelay2 = 0;

        //music config
        this.music = this.sound.add('song');
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);
    
        //Adding timer
        this.timer = this.time.addEvent({              
        loop: false,
        repeat: 1000000,
        startAt: 0,
        paused: false
        });
    
        //these two lines change the size of the scene and camera bounds!!
        this.physics.world.setBounds(-25, 0, 850, 2600, true, true, true, true);
        this.cameras.main.setBounds(0, 0, 800, 2600);
        
        //set background
        var backdrop = this.add.image(400,1300,'backdrop'); 
        backdrop.setScale(1);
    
        //add checkpoint bunny
        checkpoint = this.physics.add.staticGroup();
        

        //add portals
        portal = this.physics.add.staticGroup();
        
        
        //bottom turrets
        this.turret1 = this.add.image(555, 2300, 'turret');
        this.turret2 = this.add.image(390, 2300, 'turret');
        this.turret3 = this.add.image(210, 2300, 'turret');
        this.turret7 = this.add.image(690, 1400, 'turret');   
        this.turret8 = this.add.image(50, 1485, 'turret'); 
        this.turret1.angle = 180;
        this.turret2.angle = 180;
        this.turret3.angle = 180;
        this.turret7.angle = 180;
        this.turret8.angle = 90;
    
        this.turret4 = this.add.image(450, 2250, 'turret');
        this.turret5 = this.add.image(210, 2250, 'turret');
    
        this.turret6 = this.add.image(800, 1970, 'turret');
        this.turret6.angle = 270;
    
        this.turrDown = [this.turret1, this.turret2, this.turret3];
        this.turrDown2 = [this.turret7];
        this.turrUp = [this.turret4, this.turret5];
        this.turrLeft = [this.turret6];
        this.turrRight = [this.turret8];
        this.tdelay = 0;

        //add player and set physics
        player = this.physics.add.sprite(60, 2480, 'player').setScale(0.25);
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);
        player.body.setGravityY(300);
        checkpointX = player.x;
        checkpointY = player.y;
        
        //make camera follow player
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(0.9);
    
        //create star checkpoints
        var stars = this.physics.add.staticGroup();
        this.star1 = stars.create(630, 2135, 'star').refreshBody();
        this.star2 = stars.create(760, 1485, 'star').refreshBody();
        this.starArr = [this.star1, this.star2]
    
        //star pickup overlap 
        this.physics.add.overlap(player, stars, this.checkPoint, null, this);
    
        //add checkpoint bunny
        checkpoint = this.physics.add.staticGroup();
        checkpoint.create(700, 1050, 'dust_bunny').setOrigin(0,0).setScale(.125).refreshBody();
    
        //if player overlaps with bunny, level is complete
        this.physics.add.overlap(player, checkpoint, function(){
            this.music.stop();
            this.scene.stop('levelthree')
            this.scene.start("levelthree");
            console.log('you win!');
        }, null, this);
        
        //create and place static platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(0,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        
        platforms.create(500,2150,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(250,2150,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(0,2150,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        
        platforms.create(0,2000,'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
        platforms.create(750,1800,'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(600,1650,'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(750,1500,'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(150,1300,'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();        
        
        var moverLR = this.physics.add.image(550, 2550, 'wplatform').setOrigin(0,0).setScale(0.5).setImmovable(true).setVelocity(0, 100);
        moverLR.body.setAllowGravity(false);
        
        var mover2LR = this.physics.add.image(530, 2000, 'wplatform').setOrigin(0,0).setScale(0.5).setImmovable(true).setVelocity(0, 100);
        mover2LR.body.setAllowGravity(false);
    
        var mover3LR = this.physics.add.image(550, 1500, 'wplatform').setOrigin(0,0).setScale(0.5).setImmovable(true).setVelocity(0, 100);
        mover3LR.body.setAllowGravity(false);
        
        platCollide = this.physics.add.collider(player, dissapearPlatforms);
        this.physics.add.collider(player, platforms);
    
        this.timeText = this.add.text(10, 400, this.elapsed)
        this.timeText.setScrollFactor(0);
    
        dissapearPlatforms = this.physics.add.staticGroup();
        dissapearPlatforms.create(300, 1300, 'gplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        dissapearPlatforms.create(440, 1220, 'gplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        dissapearPlatforms.create(560, 1140, 'gplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
        platCollide = this.physics.add.collider(player, dissapearPlatforms);

        //add bullet group and collider
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 100
        });
        this.physics.add.collider(player, this.bullets, this.reset, null, this);
    
        //add bullet group and collider for horizontal bullets
        this.bullets2 = this.physics.add.group({
            defaultKey: 'bullet2',
            maxSize: 100
        });
        this.physics.add.collider(player, this.bullets2, this.reset, null, this);

        //restart scene if player overlaps portal 
        this.physics.add.overlap(player, portal, this.reset, null, this);

        //moving vertical platform
        mover1 = this.physics.add.image(750, 2500, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);     
        mover1.body.setAllowGravity(false);
        this.time.addEvent({delay: 1000, callback: function(){this.checkTurrets()}, callbackScope: this, loop: true});
        this.time.addEvent({ delay: 1000, callback: function(){this.checkTurrets2()}, callbackScope: this, loop: true });
    
        //mover array
        mover = [mover1, moverLR, mover2LR, mover3LR];

        this.tweens.timeline({
        targets: [mover1.body.velocity],
        loop: -1,
        tweens: [
          { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
          { x:    0, y:   200, duration: 2000, ease: 'Stepped' },
        ]
      });
        
    this.tweens.timeline({
        targets: [moverLR.body.velocity],
        loop: -1,
        tweens: [
          { x:    -200, y: 0, duration: 2000, ease: 'Stepped' },
          { x:    200, y:   0, duration: 2000, ease: 'Stepped' },
        ]
      });
    
    this.tweens.timeline({
        targets: [mover2LR.body.velocity, mover3LR.body.velocity],
        loop: -1,
        tweens: [
          { x:    -100, y: 0, duration: 4000, ease: 'Stepped' },
          { x:    100, y:   0, duration: 4000, ease: 'Stepped' },
        ]
      });
        //collider with moving platform
        this.physics.add.collider(player, mover1);
        this.physics.add.collider(player, mover2);
        this.physics.add.collider(player, mover3);
        this.physics.add.collider(player, moverLR);
        this.physics.add.collider(player, mover2LR);
        this.physics.add.collider(player, mover3LR);

        canGrab = false;
        rotated = false;
        wallJumped = false;
        isOnWall = false;
        isOnRight = false;
        isOnLeft = false;
        findMover = false;
        dissapeardelay = 0;
}
    
update(){
    
    if(this.start) {
        this.cameras.main.zoomTo(1.35, 1000);
        this.start = false;
    }
    checkKeyboard();
    console.log(game.input.mousePointer.x + " , " + game.input.mousePointer.y);
    
    //Updating timer
    this.elapsed = this.timer.getElapsedSeconds();
    //console.log(this.timer.getElapsedSeconds());
    //add Math.floor or something here to round elapsed
    this.timeText.setText(this.elapsed);
      
    dissapeardelay ++;
    if (dissapeardelay >= 200){
        dissapeardelay = 0;
        console.log("vanish");
        if (dissapearPlatforms.active == true){
            dissapearPlatforms.setActive(false).toggleVisible(false);
            platCollide.active = false;
        }
        else{
            dissapearPlatforms.setActive(true).setVisible(true);
            platCollide.active = true;
        }
    }
    
    //stickMechanic
    if(cursors.space.isDown && wallJumped == false){
        //if the player is touching the wall or a moving body, it is made note of here
        if (player.body.onWall() || player.body.touching.right || player.body.touching.left){
            if (player.body.onWall()){
                isOnWall = true;
            }
            if (player.body.touching.right){
                isOnRight = true;
            }
            if (player.body.touching.left){
                isOnLeft = true;
            }
        }
        if (!(isOnWall)&& (isOnLeft || isOnRight)){
                //if it has not found a mover, it will find which mover object is being grabbed in the array
                if (findMover == false){
                moverTouching = whichMover(mover);   
            }
                stickmechanicMoving();
                findMover = true;
            }
            else if(isOnWall){
                stickmechanic(); 
            }
        }
        
      //jumping  
      if (godMode && cursors.up.isDown)
      {
          player.setVelocityY(-320);
          this.sound.play('jump_sound');
      }
      if (cursors.up.isDown && player.body.touching.down)
      {
          player.setVelocityY(-320);
          this.sound.play('jump_sound');
      }
        
        if (player.body.touching.down){
            canGrab = true;
            wallJumped = false;
            bodyTouchingLeft = null;
            //resets wall booleans upon touching floor
            isOnWall = false;
            isOnLeft = false;
            isOnRight = false;
            //allows it to only get the mover object once
            findMover = false;
        }
        if (cursors.space.isUp){
            player.body.setAllowGravity(true);
            canGrab = false;
            //resets wall booleans when letting go of space
            isOnWall = false;
            isOnLeft = false;
            isOnRight = false;
            //allows player to stick again as long as they let go of space first
            wallJumped = false;
            //resets player rotation
            if (rotated == true){
                player.angle = 0;
            }
        }
    
        dissapeardelay ++;
    if (dissapeardelay >= 380){
        dissapeardelay = 0;
        console.log("vanish");
        if (dissapearPlatforms.active == true){
            dissapearPlatforms.setActive(false).toggleVisible(false);
            platCollide.active = false;
        }
        else{
            dissapearPlatforms.setActive(true).setVisible(true);
            platCollide.active = true;
        }
    }
        
        //checkWorldBounds
        if (player.body.checkWorldBounds() == true) {
            this.reset();
        }
        
        //inactivate bullets after leaving screen
        this.bullets.children.each(function(b) {
            if (b.active) {
                if (b.y < 0 || b.y > 3000) {
                    b.setActive(false);
                }
            }
        }.bind(this));
    
}
    
    checkPoint(){
        console.log('checkpoint')
        checkpointX = this.starArr[0].x;
        checkpointY = this.starArr[0].y - 20;
        this.starArr[0].disableBody(true,true);
        this.starArr.shift();
        console.log(this.starArr.length)
    }
    
    checkTurrets() {
        //first two
        console.log(player.x, player.y)
        var x = player.x;
        var y = player.y;
            if(y > 2300 && x > 60 && x < 700 ) {
                for(var i = 0; i < this.turrDown.length; i++) {
                this.shootDown(this.turrDown[i].x, this.turrDown[i].y);
                }
            }
            if(y < 2300 && y > 2100 && x > 150 && x < 600 ) {
                for(var i = 0; i < this.turrUp.length; i++) {
                this.shootUp(this.turrUp[i].x, this.turrUp[i].y);
                }
            }
            if(y < 2000 && y > 1800 && x > 150 && x < 500 ) {
                for(var i = 0; i < this.turrLeft.length; i++) {
                this.shootLeft(this.turrLeft[i].x, this.turrLeft[i].y);
                }
            }
            if(y < 1500 && y > 1430 && x > 220) {
                for(var i = 0; i < this.turrRight.length; i++) {
                this.shootRight(this.turrRight[i].x, this.turrRight[i].y);
                }
            }
    }
    
    checkTurrets2() {
        var x = player.x;
        var y = player.y;
        
        if(this.tdelay2 > 130) {
            if(y < 2000 && y > 1600 && x > 600 && x < 800 ) {
                for(var i = 0; i < this.turrDown2.length; i++) {
                this.shootDown(this.turrDown2[i].x, this.turrDown2[i].y);
                }
            }
           this.tdelay2 = 0; 
        }
        this.tdelay2++;
    }
    
     shootUp(x, y)
    {
       var bullet = this.bullets.get(x, y-20);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.setAllowGravity(false);
            bullet.body.velocity.x = 0;
            bullet.body.velocity.y = -300;
            }
    }

     shootDown(x, y)
    {
       var bullet = this.bullets.get(x, y+20);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.setAllowGravity(false);
            bullet.body.velocity.x = 0;
            bullet.body.velocity.y = 300;
            }
    }
    
     shootLeft(x, y)
    {
       var bullet = this.bullets2.get(x-20, y);
        
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.setAllowGravity(false);
            bullet.body.velocity.x = -300;
            bullet.body.velocity.y = 0;
            }
    }
    
    shootRight(x, y)
    {
       var bullet = this.bullets2.get(x+20, y);
        
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.setAllowGravity(false);
            bullet.body.velocity.x = 300;
            bullet.body.velocity.y = 0;
            }
    }
    
    reset(){
        this.sound.play('death_sound');
        //var timer = scene.time.delayedCall(1000, null, null, this);
        this.bullets.clear(true);
        this.bullets2.clear(true);
        console.log(checkpointX + " " + checkpointY)
        //this.bullets2.clear(true);
        player.x = checkpointX;
        player.y = checkpointY;
    }
        
}
    
