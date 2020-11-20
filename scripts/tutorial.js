class Tutorial extends Phaser.Scene {
    constructor(){
        super('tutorial')
    }

    /*init(props) {
        const { level = 0 } = props
        this.currentLevel = level
    } */
    
preload(){
        //audio
        this.load.audio('song','music/Ecosystem.mp3');
        this.load.audio('jump_sound', 'sounds/jump_sound.wav');
        this.load.audio('death_sound', 'sounds/death_sound.mp3');
        
        //platforms
        this.load.image('backdrop', 'backdrops/white.png');
        this.load.image('splatform', 'assets/platform_hor.png');
        this.load.image('bplatform', 'assets/platform_blue.png');
        this.load.image('gplatform', 'assets/platform_green.png');
        this.load.image('pplatform', 'assets/platform_purple.png');
        this.load.image('mover', 'assets/platform_vert.png');
        this.load.image('vplatform', 'assets/platform_vert.png');
        this.load.image('vplatform_xl', 'assets/vert_xl.png');
        this.load.image('vplatform_xxl', 'assets/vert_xxl.png');
        this.load.image('lvl', 'backdrops/tut.png');
        
        //etc
        this.load.image('dust_bunny','assets/dust_bunny.png');
        this.load.image('portal','assets/portal.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('turret', 'assets/turret.png');
        this.load.image('bullet', 'assets/tracer.png');
        this.load.image('instructions', 'assets/instructions.png');
        this.load.image('spacebarIntro','assets/spacebarIntro.png');
        this.load.image('stickInstructionsLeft','assets/stickInstructionsLeft.png');
        this.load.image('checkpointInstructions','assets/checkpointInstructions.png');
        this.load.image('portalInstructions','assets/portalInstructions.png');
        this.load.image('turretInstructions','assets/turretInstructions.png');
        this.load.image('spike', 'assets/spike.png');
        this.load.image('spacebarJump','assets/spacebarJump.png');
        this.load.image('spacebarInstructionsRight','assets/spacebarInstructionsRight.png');
        this.load.image('spacebarMoveUpInstructions','assets/spacebarMoveUpInstructions.png');
        this.load.image('dustBunnyInstructions','assets/dustBunnyInstructions.png');
        this.load.image('num1','assets/num1.png');
        this.load.image('num2','assets/num2.png');
        this.load.image('num3','assets/num3.png');
        this.load.image('num4','assets/num4.png');
        this.load.image('num5','assets/num5.png');
        this.load.image('num6','assets/num6.png');
        this.load.image('num7','assets/num7.png');
        this.load.image('num8','assets/num8.png');
        this.load.image('num9','assets/num9.png');
        this.load.image('num10','assets/num10.png');
}
    
create(){
    this.scene.launch('overlay');
    keyNumber = 0;
    //console.log(this.currentLevel)

    /*this.time.addEvent({
        callback: () => this.scene.restart({ level: this.currentLevel + 1 })
    }) */
    
    //this.deathCount = 0;
    //this.elapsed = 0;

    cursors = this.input.keyboard.createCursorKeys();
    this.start = false;
    
    //music config
    this.music = this.sound.add('song');
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 0.75,
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
    
    //these two lines change the size of the scene and camera bounds!!
    this.physics.world.setBounds(0, 0, 800, 2600, true, true, true, true);
    this.cameras.main.setBounds(0, 0, 800, 2600);
            
    //set background
    var backdrop = this.add.image(400,1300,'backdrop'); 
    backdrop.setScale(1);

    var platforms = this.physics.add.staticGroup();
    var spikes = this.physics.add.staticGroup();
    
    //ground
    platforms.create(0,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(150,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(300,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(450,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(600,2550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
    //stairsteps
    platforms.create(550,2200,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(400,2100,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(250,2200,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(100,2300,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
    //middle three 
    platforms.create(115,1580,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(325,1580,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(530,1580,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
    platforms.create(530,1240,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
    //right climb
    platforms.create(750,1920,'vplatform_xxl').setOrigin(0,0).setScale(0.5).refreshBody();
    //platforms.create(750,1840,'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
    platforms.create(750,1240,'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
    
    //left climb
    platforms.create(0,1620,'vplatform_xxl').setOrigin(0,0).setScale(0.5).refreshBody();    

    //instruction labels throughout the level
    var instructions = this.physics.add.staticGroup();
    instructions.create(200,2430,'instructions').setScale(0.25);
    var spacebarIntro = this.physics.add.staticGroup();
    spacebarIntro.create(375,2430,'spacebarIntro').setScale(0.25);
    var stickInstructionsLeft = this.physics.add.staticGroup();
    stickInstructionsLeft.create(265,1950,'stickInstructionsLeft').setScale(0.2);
    var checkpointInstructions = this.physics.add.staticGroup();
    checkpointInstructions.create(110,1500,'checkpointInstructions').setScale(0.2);
    var portalInstructions = this.physics.add.staticGroup();
    portalInstructions.create(350,1500,'portalInstructions').setScale(0.2);
    var turretInstructions = this.physics.add.staticGroup();
    turretInstructions.create(620,1750,'turretInstructions').setScale(0.2);
    var spacebarJump = this.physics.add.staticGroup();
    spacebarJump.create(650,2500,'spacebarJump').setScale(0.2);
    var spacebarInstructionsRight = this.physics.add.staticGroup();
    spacebarInstructionsRight.create(675,2450,'spacebarInstructionsRight').setScale(0.15);
    var spacebarMoveUpInstructions = this.physics.add.staticGroup();
    spacebarMoveUpInstructions.create(625,2300,'spacebarMoveUpInstructions').setScale(0.15);
    var dustBunnyInstructions = this.physics.add.staticGroup();
    dustBunnyInstructions.create(475,1110,'dustBunnyInstructions').setScale(0.3);

    //Adding in steps
    var num1 = this.physics.add.staticGroup();
    num1.create(140,2400,'num1').setScale(0.3);
    var num2 = this.physics.add.staticGroup();
    num2.create(375,2365,'num2').setScale(0.3);
    var num3 = this.physics.add.staticGroup();
    num3.create(552,2492,'num3').setScale(0.3);
    var num4 = this.physics.add.staticGroup();
    num4.create(555,2395,'num4').setScale(0.3);
    var num5 = this.physics.add.staticGroup();
    num5.create(470,2300,'num5').setScale(0.3);
    var num6 = this.physics.add.staticGroup();
    num6.create(380,1885,'num6').setScale(0.3);
    var num7 = this.physics.add.staticGroup();
    num7.create(45,1440,'num7').setScale(0.3);
    var num8 = this.physics.add.staticGroup();
    num8.create(385,1430,'num8').setScale(0.3);
    var num9 = this.physics.add.staticGroup();
    num9.create(635,1765,'num9').setScale(0.3);
    var num10 = this.physics.add.staticGroup();
    num10.create(475,1140,'num10').setScale(0.315);
    
    //add player and set physics
    player = this.physics.add.sprite(60, 2480, 'player').setScale(0.25);
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    player.body.setGravityY(300);
    checkpointX = 60;
    checkpointY = 2480;
    
    //make camera follow player
    this.cameras.main.startFollow(player);
    this.cameras.main.setZoom(1);
    
    //Adding time text at the top
    // this.timetextnormal = this.add.text(10,10, 'Time: ');
    // this.timetextnormal.setScrollFactor(0);

    // this.timeText = this.add.text(70, 10, elapsed)
    // this.timeText.setScrollFactor(0);

    //Adding deathcount to top left
    // this.deathcounttextnormal = this.add.text(600,10, 'Death Count: ');
    // this.deathcounttextnormal.setScrollFactor(0);

    // this.deathcountText = this.add.text(725, 10, deathCount)
    // this.deathcountText.setScrollFactor(0);
   // this.timeText.cameraOffset.setTo(100,100);
    
    //create star checkpoints
    var stars = this.physics.add.staticGroup();
    this.star1 = stars.create(120, 1560, 'star').refreshBody();
    this.starArr = [this.star1, this.star2, this.star3];
    
    //star pickup overlap 
    this.physics.add.overlap(player, stars, this.checkPoint, null, this);
    
    //add portals
    portal = this.physics.add.staticGroup();
    portal.create(300,1560, 'portal').setScale(.15).refreshBody();
    
    //portal overlap
    this.physics.add.overlap(player, portal, this.reset, null, this);
    
    //add turret
    this.turret1 = this.add.image(500, 1750, 'turret');
    this.turrUp = [this.turret1];
    
    this.tdelay = 0;
    
    //add bullet group and collider for vertical bullets
    this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 100
    });
    this.physics.add.collider(player, this.bullets, this.reset, null, this);
      
    this.physics.add.collider(player, platforms);

    checkpoint = this.physics.add.staticGroup();

    checkpoint.create(585,1195, 'dust_bunny').setScale(.15).refreshBody();
    this.physics.add.overlap(player, checkpoint, function(){
        this.music.stop();
        this.scene.stop('tutorial');
        this.scene.stop('overlay');
        this.scene.start("performance");
        console.log('you win!');
        //this.scene.restart({ level: this.currentLevel + 1 })
    }, null, this);
    
    this.time.addEvent({ delay: 1000, callback: function(){this.checkTurrets()}, callbackScope: this, loop: true });
}
    
update(){
    
    if(this.start){
        this.cameras.main.zoomTo(1.5, 1000);
        this.start = false;
    }
    checkKeyboard();

    //Updating timer
    // elapsed = this.timer.getElapsedSeconds();
    //console.log(this.timer.getElapsedSeconds());
    
    //Displays time with 2 decimal places
    // this.timeText.setText((elapsed).toFixed(2));

    //Displays deathcount
    // this.deathcountText.setText(deathCount);
    
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
            //this.registry.destroy(); // destroy registry
            //this.events.off(); // disable all active events
            //this.scene.restart(); // restart current scene
            //this.music.stop();
            console.log("yoo");
            //deathCount+=1;
            console.log(deathCount);
        }
    
}
    reset(){
        this.sound.play('death_sound');
        deathCount++;
        deathCountTotal++;
        //var timer = scene.time.delayedCall(1000, null, null, this);
        this.bullets.clear(true);
        player.x = checkpointX;
        player.y = checkpointY;
    }
    
    checkPoint(){
        checkpointX = this.starArr[0].x;
        checkpointY = this.starArr[0].y - 20;
        this.starArr[0].disableBody(true,true);
        this.starArr.shift();
    }
    
    checkTurrets() {
        var x = player.x;
        var y = player.y;
            console.log(this.tdelay);
            //bottom two
            if(y < 1620 && y > 1300) {
                for(var i = 0; i < this.turrUp.length; i++) {
                this.shootUp(this.turrUp[i].x, this.turrUp[i].y);
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
    
}