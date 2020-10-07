class LevelOne extends Phaser.Scene {
    constructor(){
        super('levelone')
    }
preload(){
        //audio
        this.load.audio('song','../music/Art.mp3');
        this.load.audio('jump_sound', '../sounds/jump_sound.wav')
        this.load.audio('death_sound', '../sounds/death_sound.mp3')
        
        //platforms
        this.load.image('bg', '../assets/spacebg.jpg');
        this.load.image('splatform', '../assets/platform_hor.png')
        this.load.image('bplatform', '../assets/platform_blue.png')
        this.load.image('gplatform', '../assets/platform_green.png')
        this.load.image('pplatform', '../assets/platform_purple.png')
        this.load.image('mover', '../assets/platform_vert.png')
        
        //etc
        this.load.image('dust_bunny','../assets/dust_bunny.png')
        this.load.image('portal','../assets/portal.png');
        this.load.image('player', '../assets/player.png');
        this.load.image('turret', '../assets/turret.png');
        this.load.image('bullet', '../assets/tracer.png');
}
create(){
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
        this.physics.world.setBounds(0, 0, 800, 1600, true, true, true, true);
        this.cameras.main.setBounds(0, 0, 800, 1600);
    
        //set background
        var backdrop = this.add.image(400,300,'bg'); 
        backdrop.setScale(4);
        
        //set bounds so camera wont go outside game world
        //this.cameras.main.setBounds(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT);

        //add checkpoint bunny
        checkpoint = this.physics.add.staticGroup();
        checkpoint.create(420, 35, 'dust_bunny').setOrigin(0,0).setScale(.125).refreshBody();

        //add portals
        portal = this.physics.add.staticGroup();
        portal.create(650, 110, 'portal').setScale(.125).refreshBody();
        
        //add turret
        this.turret1 = this.add.image(380, 250, 'turret').setScale(0.15);

        //set player physics
        player = this.physics.add.sprite(60, 480, 'player').setScale(0.25);
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);
        player.body.setGravityY(300);
        
        //make camera follow player
        //this.cameras.main.startFollow(player);
        //this.cameras.main.setZoom(1.5);
        
        //create and place static platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(0,550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200,525,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(400,500,'gplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(400, 100,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200, 150,'pplatform').setOrigin(0,0).setScale(0.5).refreshBody();

        this.physics.add.collider(player, platforms);
    
        var vert_platforms = this.physics.add.staticGroup();
        vert_platforms.create(650, 455, 'mover').setScale(0.5).refreshBody();
        vert_platforms.create(550, 325, 'mover').setScale(0.5).refreshBody();
        vert_platforms.create(650, 200, 'mover').setScale(0.5).refreshBody();
        
        this.physics.add.collider(player, vert_platforms);

        //add bullet group and collider
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 10
        });
        //this.input.on('pointerdown', this.shoot, this);
        this.physics.add.collider(player, this.bullets, this.restart, null, this);
        
        //if player overlaps with bunny, level is complete
        this.physics.add.overlap(player, checkpoint, function(){
            this.scene.start("leveloneb");
        }, null, this);

        //restart scene if player overlaps portal 
        this.physics.add.overlap(player, portal, this.restart, null, this);

        canGrab = false;
        rotated = false;
        wallJumped = false;
        isOnWall = false;
        isOnRight = false;
        isOnLeft = false;
}
update(){

    checkKeyboard();
    turretFire();
      
        
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
            stickmechanicMoving();
        }
        else if(isOnWall){
        stickmechanic(); 
          }
    }
        
      //jumping  
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
                if (b.y < 0 || b.y > 800) {
                    b.setActive(false);
                }
            }
        }.bind(this));
        
//        if(this.tdelay > 30) {
//            for(var i = 0, i < this.turretArr; i++) {
//                tempTurret = 
//            }
//            this.shoot(this.turret1.x, this.turret1.y, this.turret1); 
//            this.tdelay = 0;
//        }
//        this.tdelay++;
}
// shoot(x, y, turret) 
//    {
//       var bullet = this.bullets.get(x, y-20);
//        if (bullet) {
//            bullet.setActive(true);
//            bullet.setVisible(true);
//            bullet.body.setAllowGravity(false);
//            bullet.body.velocity.y = -300;
//            }
//    }
//        
}