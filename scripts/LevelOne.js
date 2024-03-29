class LevelOne extends Phaser.Scene {
    constructor(){
        super('levelone')
    }

preload(){
        //audio
        this.load.audio('song2','music/Art.mp3');
        this.load.audio('jump_sound', 'sounds/jump_sound.wav')
        this.load.audio('death_sound', 'sounds/death_sound.mp3')

        //platforms
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.image('splatform', 'assets/platform_hor.png')
        this.load.image('bplatform', 'assets/platform_blue.png')
        this.load.image('gplatform', 'assets/platform_green.png')
        this.load.image('pplatform', 'assets/platform_purple.png')
        this.load.image('vplatform', 'assets/platform_vert.png')
        this.load.image('vplatform_xl', 'assets/vert_xl.png')
        this.load.image('mover', 'assets/platform_vert.png')

        //etc
        this.load.image('dust_bunny','assets/dust_bunny.png')
        this.load.image('portal','assets/portal.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('turret', 'assets/turret.png');
        this.load.image('bullet', 'assets/tracer.png');
        this.load.image('bullet2', 'assets/tracer2.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('backdrop', 'backdrops/white.png');
}
    
create(){
    this.scene.launch('overlay');
    keyNumber = 1;
    
        var mover1;
        var mover2;
        this.start = true;
        cursors = this.input.keyboard.createCursorKeys();
        this.tdelay = 0;
        this.clearBullets = false;
        //this.elapsed = 0;

        //music config
        this.music = this.sound.add('song2');
        var musicConfig = {
            mute: false,
            volume: 0.75,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);

        //Adding timer
        // this.timer = this.time.addEvent({              
        // loop: false,
        // repeat: 1000000,
        // startAt: 0,
        // paused: false
        // });

        //Adding time text at the top
        // this.timetextnormal = this.add.text(10,10, 'Time: ');
        // this.timetextnormal.setScrollFactor(0);

        // this.timeText = this.add.text(70, 10, elapsed)
        // this.timeText.setScrollFactor(0);

        //these two lines change the size of the scene and camera bounds!!
        this.physics.world.setBounds(-25, 0, 800, 2600, true, true, true, true);
        this.cameras.main.setBounds(0, 0, 750, 2600);

        //set background
        var backdrop = this.add.image(400,1300,'backdrop');
        backdrop.setScale(1);
    
        //add checkpoint bunny
        checkpoint = this.physics.add.staticGroup();
        checkpoint.create(600, 400, 'dust_bunny').setOrigin(0,0).setScale(.125).refreshBody();

        //add portals
        portal = this.physics.add.staticGroup();
        portal.create(725,1560, 'portal').setScale(.15).refreshBody();
        portal.create(70,1740, 'portal').setScale(.15).refreshBody();
        
        //add turret
        this.turret1 = this.add.image(475, 1800, 'turret');
        this.turret2 = this.add.image(275, 1840, 'turret');
        this.turrUp = [this.turret1, this.turret2];
    
        this.turret3 = this.add.image(475, 1000, 'turret');
        this.turret3.angle = 180;
        this.turret4 = this.add.image(275, 1000, 'turret');
        this.turret4.angle = 180;
        this.turrDown = [this.turret3, this.turret4];
    
        this.turret5 = this.add.image(50, 875, 'turret');
        this.turret5.angle = 90;
        this.turrRight = [this.turret5];
    
        this.tdelay = 0;

        //add player and set physics
        player = this.physics.add.sprite(60, 2480, 'player').setScale(0.25);
        checkpointX = 60;
        checkpointY = 2480;
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);
        player.body.setGravityY(300);
    
        //create star checkpoints
        var stars = this.physics.add.staticGroup();
        this.star1 = stars.create(640, 1630, 'star').refreshBody();
        this.star2 = stars.create(110, 1280, 'star').refreshBody();
        this.star3 = stars.create(640, 880, 'star').refreshBody();
        this.starArr = [this.star1, this.star2, this.star3];
        
        //make camera follow player
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(1);
        
        //create and place static platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(0,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
       
        //first star
        platforms.create(200,2500,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(400, 2450, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(600, 2400, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(700, 2000, 'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(550, 1800, 'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(700, 1600, 'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
        
        platforms.create(500, 1650, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(300, 1700, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(100, 1750, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(0, 1350, 'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
    
        platforms.create(500, 1200, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(300, 1250, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(100, 1300, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
        platforms.create(500, 900, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(300, 900, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(100, 900, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        
        platforms.create(200, 700, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(500, 500, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
        platforms.create(50, 700, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(400, 500, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
  
        //moving vertical platform
        mover1 = this.physics.add.image(750, 1150, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);     
        mover1.body.setAllowGravity(false);
        this.physics.add.collider(player, platforms);
        
        //collider with moving platform
        this.physics.add.collider(player, mover1);
        this.physics.add.collider(player, mover2);
        mover = [mover1];
    
        //change y position to stay in window after pan
        this.timeText = this.add.text(10, 10, this.elapsed)
        this.timeText.setScrollFactor(0);
    
        //star pickup overlap 
        this.physics.add.overlap(player, stars, this.checkPoint, null, this);
    
        this.tweens.timeline({
        targets: [mover1.body.velocity],
        loop: -1,
        tweens: [
          { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
          { x:    0, y:   200, duration: 2000, ease: 'Stepped' },
        ]
      });

        //add bullet group and collider for vertical bullets
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

        //if player overlaps with bunny, level is complete
        this.physics.add.overlap(player, checkpoint, function(){
            this.music.stop();
            this.scene.stop('levelone');
            this.scene.stop('overlay');
            this.scene.start("performance");
        }, null, this);

        //reset player to checkpoint if player overlaps portal
        this.physics.add.overlap(player, portal, this.reset, null, this);

        canGrab = false;
        rotated = false;
        wallJumped = false;
        isOnWall = false;
        isOnRight = false;
        isOnLeft = false;
        findMover = false;
    
        this.time.addEvent({ delay: 1200, callback: function(){this.checkTurrets()}, callbackScope: this, loop: true });
}

update(){
    
    if(this.start) {
        this.cameras.main.zoomTo(1.7, 1000);
        this.start = false;
    }
    
    //Updating timer
    // this.elapsed = this.timer.getElapsedSeconds();
    //add Math.floor or something here to round elapsed
    // this.timeText.setText(this.elapsed);
    
    checkKeyboard();    

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
      if (cursors.up.isDown && godMode)
      {
          player.setVelocityY(-320);
          this.sound.play('jump_sound');
      }
      else if(cursors.up.isDown && player.body.touching.down)
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
            findMover = false;
        }
        if (turnOff){
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
            turnOff = false;
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

        //checkWorldBounds
        if (player.body.checkWorldBounds() == true) {
            this.sound.play('death_sound');
            this.reset();
        }

        //inactivate bullets after leaving screen
        this.bullets.children.each(function(b) {
            if (b.active) {
                if (b.x < 0 || b.x > 800) {
                    b.setActive(false);
                }
            }
        }.bind(this));
    
        //inactivate bullets2 after leaving screen
        this.bullets2.children.each(function(b) {
            if (b.active) {
                if (b.x < 0 || b.x > 800) {
                    b.setActive(false);
                }
            }
        }.bind(this));    
    
}//end update function
    
    checkPoint(){
        console.log('checkpoint')
        checkpointX = this.starArr[0].x;
        checkpointY = this.starArr[0].y - 20;
        this.starArr[0].disableBody(true,true);
        this.starArr.shift();
        console.log(this.starArr.length)
    }
    
    
    reset(){
        this.sound.play('death_sound');
        deathCount++;
        deathCountTotal++;
        //var timer = scene.time.delayedCall(1000, null, null, this);
        this.bullets.clear(true);
        this.bullets2.clear(true);
        player.x = checkpointX;
        player.y = checkpointY;
        turnOff = true;
    }
    
    checkTurrets() {
        //first two
        var x = player.x;
        var y = player.y;
            //bottom two
            if(y < 1850 && y > 1500 && x < 650 && x > 150) {
                for(var i = 0; i < this.turrUp.length; i++) {
                this.shootUp(this.turrUp[i].x, this.turrUp[i].y);
                }
            }
            //middle two
            if(y < 1300 && y > 900 && x < 650 && x > 50) {
                for(var i = 0; i < this.turrDown.length; i++) {
                this.shootDown(this.turrDown[i].x, this.turrDown[i].y);
                }
            }
            //top one
            if(y > 500 && y < 900 && x > 300) {
                for(var i = 0; i < this.turrRight.length; i++) {
                this.shootRight(this.turrRight[i].x, this.turrRight[i].y);
                }
            }
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
    
}
