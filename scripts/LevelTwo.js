class LevelTwo extends Phaser.Scene {
    constructor(){
        super('leveltwo')
    }
preload(){
        //audio
        this.load.audio('song','music/zipline.mp3');
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
        this.load.image('bullet', 'assets/tracer.png');
        this.load.image('backdrop', 'backdrops/white.png');
}
    
create(){
        var mover1;
        var mover2;
        var mover3;
        var score = 0;
        this.start = true;
        this.elapsed = 0;
    
        cursors = this.input.keyboard.createCursorKeys();
        this.tdelay = 0;

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
        checkpoint.create(20, 925, 'dust_bunny').setOrigin(0,0).setScale(.125).refreshBody();

        //add portals
        portal = this.physics.add.staticGroup();
        //portal.create(200,2500, 'portal').setScale(.125).refreshBody();
        
        //add turret
       
        this.turret2 = this.add.image(525, 800, 'turret');
        this.turret2.angle = 180;
        
        this.turret4 = this.add.image(275, 800, 'turret');
        this.turret4.angle = 180;
    
        this.turrDown = [this.turret2, this.turret4];
        this.turrUp = [];
        this.turrRight = [];
        this.tdelay = 0;
    
        //create star checkpoints
        var stars = this.physics.add.staticGroup();
        this.star1 = stars.create(620, 1775, 'star').refreshBody();
        this.star2 = stars.create(694, 1375, 'star').refreshBody();
        this.starArr = [this.star1, this.star2];

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
        
        //create and place static platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(0,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200,2350,'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200, 2100, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(350, 2200, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(500, 2300, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(500, 1800, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
        platforms.create(200, 1700, 'mover').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(350, 1550, 'mover').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200, 1400, 'mover').setOrigin(0,0).setScale(0.5).refreshBody();
    
        platforms.create(650, 1400, 'pplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
        platforms.create(0, 1000, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        
        dissapearPlatforms = this.physics.add.staticGroup();
        dissapearPlatforms.create(325, 1900, 'gplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        dissapearPlatforms.create(400, 1400, 'gplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        
        var moverLR = this.physics.add.image(520, 1000, 'wplatform').setOrigin(0,0).setScale(0.5).setImmovable(true).setVelocity(0, 100);
        moverLR.body.setAllowGravity(false);
        
        platCollide = this.physics.add.collider(player, dissapearPlatforms);
        this.physics.add.collider(player, platforms);

        //add bullet group and collider
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 100
        });
        //this.input.on('pointerdown', this.shoot, this);
        this.physics.add.collider(player, this.bullets, this.reset, null, this);
        
        //if player overlaps with bunny, level is complete
        this.physics.add.overlap(player, checkpoint, function(){
            this.music.stop();
            this.scene.stop('leveltwo')
            this.scene.start("levelthree");
            console.log('you win!');
        }, null, this);

        //restart scene if player overlaps portal 
        this.physics.add.overlap(player, portal, this.reset, null, this);

        //moving vertical platform
        mover1 = this.physics.add.image(50, 2350, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);     
        mover1.body.setAllowGravity(false);
    
        mover2 = this.physics.add.image(750, 2200, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);     
        mover2.body.setAllowGravity(false);
        
        mover3 = this.physics.add.image(775, 1300, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);
        mover3.body.setAllowGravity(false);
    
        //mover array
        mover = [mover1, mover2, mover3, moverLR];
    
        this.timeText = this.add.text(10, 10, this.elapsed)
        this.timeText.setScrollFactor(0);

        this.tweens.timeline({
        targets: [mover1.body.velocity, mover2.body.velocity, mover3.body.velocity],
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
          { x:    -100, y: 0, duration: 3000, ease: 'Stepped' },
          { x:    100, y:   0, duration: 3000, ease: 'Stepped' },
        ]
      });
        //collider with moving platform
        this.physics.add.collider(player, mover1);
        this.physics.add.collider(player, mover2);
        this.physics.add.collider(player, mover3);
        this.physics.add.collider(player, moverLR);
    
        //star pickup overlap 
        this.physics.add.overlap(player, stars, this.checkPoint, null, this);

        canGrab = false;
        rotated = false;
        wallJumped = false;
        isOnWall = false;
        isOnRight = false;
        isOnLeft = false;
        findMover = false;
        dissapeardelay = 0;
    
        this.time.addEvent({ delay: 1000, callback: function(){this.checkTurrets()}, callbackScope: this, loop: true });
}
    
update(){
    if(this.start) {
        this.cameras.main.zoomTo(1.7, 1000);
        this.start = false;
    }
    checkKeyboard();
    console.log(player.x + " , " + player.y);
    
    //Updating timer
    this.elapsed = this.timer.getElapsedSeconds();
    console.log(this.timer.getElapsedSeconds());
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
        var x = player.x;
        var y = player.y;
            console.log(this.tdelay);
            //middle two
            if(y < 1000 && x < 680 ) {
                for(var i = 0; i < this.turrDown.length; i++) {
                this.shootDown(this.turrDown[i].x, this.turrDown[i].y);
                }
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
    
    
    reset(){
        this.sound.play('death_sound');
        //var timer = scene.time.delayedCall(1000, null, null, this);
        this.bullets.clear(true);
        //this.bullets2.clear(true);
        player.x = checkpointX;
        player.y = checkpointY;
    }
        
}
    
