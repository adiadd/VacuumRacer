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
        this.load.image('wplatform', 'assets/platform_green.png')
        
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
    
        //these two lines change the size of the scene and camera bounds!!
        this.physics.world.setBounds(0, 0, 800, 2600, true, true, true, true);
        this.cameras.main.setBounds(0, 0, 800, 2600);
        
        //set background
        var backdrop = this.add.image(400,1300,'backdrop'); 
        backdrop.setScale(1);
    
        //add checkpoint bunny
        checkpoint = this.physics.add.staticGroup();
        checkpoint.create(20, 60, 'dust_bunny').setOrigin(0,0).setScale(.125).refreshBody();

        //add portals
        portal = this.physics.add.staticGroup();
        //portal.create(200,2500, 'portal').setScale(.125).refreshBody();
        
        //add turret
        this.turret1 = this.add.image(700, 2090, 'turret');
        this.turret1.angle = 180;
        //this.turret2 = this.add.image(800, 2590, 'turret').setScale(0.25);
        //this.turret3 = this.add.image(800, 2590, 'turret').setScale(0.25);
    
        this.turrDown = [this.turret1];
        this.turrUp = [];
        this.turrRight = [];
        this.tdelay = 0;

        //add player and set physics
        player = this.physics.add.sprite(60, 2480, 'player').setScale(0.25);
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);
        player.body.setGravityY(300);
        
        //make camera follow player
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(1);
        
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
    
        platforms.create(675, 1400, 'pplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
        platforms.create(400, 1000, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(0, 1000, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        
        dissapearPlatforms = this.physics.add.staticGroup();
        dissapearPlatforms.create(325, 1900, 'gplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        dissapearPlatforms.create(400, 1400, 'gplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        
        var moverLR = this.physics.add.image(400, 1000, 'wplatform').setScale(0.5).setImmovable(true).setVelocity(0, 100);
        
        platCollide = this.physics.add.collider(player, dissapearPlatforms);
        this.physics.add.collider(player, platforms);

        //add bullet group and collider
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 100
        });
        //this.input.on('pointerdown', this.shoot, this);
        //this.physics.add.collider(player, this.bullets, this.restart, null, this);
        
        //if player overlaps with bunny, level is complete
        this.physics.add.overlap(player, checkpoint, function(){
            this.scene.start("next_level");
            console.log('you win!');
        }, null, this);

        //restart scene if player overlaps portal 
        this.physics.add.overlap(player, portal, this.restart, null, this);

        //moving vertical platform
        mover1 = this.physics.add.image(50, 2350, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);     
        mover1.body.setAllowGravity(false);
    
        mover2 = this.physics.add.image(750, 2200, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);     
        mover2.body.setAllowGravity(false);
        
        mover3 = this.physics.add.image(750, 1250, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);
        mover3.body.setAllowGravity(false);
    
        //mover array
        mover = [mover1, mover2, mover3];

        this.tweens.timeline({
        targets: [mover1.body.velocity, mover2.body.velocity, mover3.body.velocity],
        loop: -1,
        tweens: [
          { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
          { x:    0, y:   200, duration: 2000, ease: 'Stepped' },
        ]
      });
        
    this.tweens.timeline({
        targets: [moverLR],
        loop: -1,
        tweens: [
          { x:    -200, y: 0, duration: 2000, ease: 'Stepped' },
          { x:    200, y:   0, duration: 2000, ease: 'Stepped' },
        ]
      });
        //collider with moving platform
        this.physics.add.collider(player, mover1);
        this.physics.add.collider(player, mover2);
        this.physics.add.collider(player, mover3);
        this.physics.add.collider(player, moverLR);

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
        this.cameras.main.zoomTo(1.7, 1000);
        this.start = false;
    }
    
    checkKeyboard();
    this.checkTurrets();
      
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
            this.registry.destroy(); // destroy registry
            this.events.off(); // disable all active events
            this.scene.restart(); // restart current scene
            this.music.stop()
            console.log("yoo");
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
    
    
    checkTurrets() {
        //first two
        var x = player.x;
        var y = player.y;
        
        if(this.tdelay > 60) {
            console.log(this.tdelay);
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
            this.tdelay = 0;
        }
        this.tdelay++;
    }
    
//    turretFire() {
//        if(this.tdelay > 40) {
//            console.log('check');
//            for(var i = 0; i < this.turrUp.length; i++) {
//                console.log('fff');
//                this.shootUp(this.turrUp[i].x, this.turrUp[i].y);
//                }
//            this.tdelay = 0;
//            }
//        this.tdelay++;
//        }
    
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
    
    restart() {
        this.registry.destroy(); // destroy registry
        this.music.stop();
        this.events.off(); // disable all active events
        this.scene.restart(); // restart current scene
    }
        
}
    
