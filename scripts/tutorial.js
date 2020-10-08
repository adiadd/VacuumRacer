class Tutorial extends Phaser.Scene {
    constructor(){
        super('tutorial')
    }
    
preload(){
        //audio
        this.load.audio('song','../music/Ecosystem.mp3');
        this.load.audio('jump_sound', '../sounds/jump_sound.wav')
        this.load.audio('death_sound', '../sounds/death_sound.mp3')
        
        //platforms
        this.load.image('backdrop', '../backdrops/white.png');
        this.load.image('splatform', '../assets/platform_hor.png')
        this.load.image('bplatform', '../assets/platform_blue.png')
        this.load.image('gplatform', '../assets/platform_green.png')
        this.load.image('pplatform', '../assets/platform_purple.png')
        this.load.image('mover', '../assets/platform_vert.png')
        this.load.image('vplatform', '../assets/platform_vert.png')
        this.load.image('vplatform_xl', '../assets/vert_xl.png')
        this.load.image('lvl', '../backdrops/tut.png');
        
        //etc
        this.load.image('dust_bunny','../assets/dust_bunny.png')
        this.load.image('portal','../assets/portal.png');
        this.load.image('player', '../assets/player.png');
        this.load.image('turret', '../assets/turret.png');
        this.load.image('bullet', '../assets/tracer.png');
}
    
create(){
    cursors = this.input.keyboard.createCursorKeys();
    
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
    
    //add player and set physics
    player = this.physics.add.sprite(60, 2480, 'player').setScale(0.25);
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    player.body.setGravityY(300);
    
    //make camera follow player
    this.cameras.main.startFollow(player);
    this.cameras.main.setZoom(1);

    var platforms = this.physics.add.staticGroup();
    
    //ground
    platforms.create(0,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(150,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(300,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(450,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(600,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
    //stairsteps
    platforms.create(550,2000,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(400,2100,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(250,2200,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(100,2300,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
    //top two
    platforms.create(400,1580,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(250,1580,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
    //right climb
    platforms.create(750,2260,'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(750,1920,'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
    
    //left climb
    platforms.create(0,1920,'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(0,1580,'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
    
    
    this.physics.add.collider(player, platforms);
}
    
update(){
    checkKeyboard();
    
    //stickMechanic
    if(cursors.space.isDown && wallJumped == false){
        //if the player is touching the wall or a moving body, it is made note of here
        if (player.body.onWall() || player.body.touching.right || player.body.touching.left){
            if (player.body.onWall()){
                isOnWall = true;
                console.log('onwall');
            }
            if (player.body.touching.right){
                isOnRight = true;
            }
            if (player.body.touching.left){
                isOnLeft = true;
            }
        }
        if (!(isOnWall) && (isOnLeft || isOnRight)){
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
    
}
    
    
}