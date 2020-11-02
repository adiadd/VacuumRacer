class LevelLabyrinth extends Phaser.Scene {
    constructor(){
        super('labyrinth')
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
        this.load.image('spike', 'assets/spike.png');
}
    
create(){
        var mover1;
        var mover2;
        var mover3;
        var score = 0;
        this.elapsed = 0;
        
    
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
        checkpoint.create(700, 1700, 'dust_bunny').setScale(0.125).refreshBody();
        

        //add portals
        portal = this.physics.add.staticGroup();
        
        
        
        this.tdelay = 0;

        //add player and set physics
        player = this.physics.add.sprite(560, 500, 'player').setScale(0.25);
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);
        player.body.setGravityY(300);
        checkpointX = player.x;
        checkpointY = player.y;
        
        //make camera follow player
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(0.9);
    
        //create star checkpoints
        
        
        var platSwitch1 = this.physics.add.staticGroup();
        this.switch1 = platSwitch1.create(200, 500, 'star').refreshBody();
        var switchItems1 = this.physics.add.staticGroup();
        var switchItems1Collide = this.physics.add.collider(player, switchItems1);
    
        var platSwitch2 = this.physics.add.staticGroup();
        this.switch2 = platSwitch2.create(635,400, 'star').refreshBody();
        var switchItems2 = this.physics.add.staticGroup();
        var switchItems2Collide = this.physics.add.collider(player, switchItems2);
    
        var platSwitch3 = this.physics.add.staticGroup();
        this.switch3 = platSwitch3.create(750,850, 'star').refreshBody();
        var switchItems3 = this.physics.add.staticGroup();
        var switchItems3Collide = this.physics.add.collider(player, switchItems3);
    
        
    
        //star pickup overlap 
        
        
        //create and place static platforms
        var platforms = this.physics.add.staticGroup();
        var spike = this.physics.add.staticGroup();
        
        
    
        this.physics.add.overlap(player, platSwitch1, function(){this.checkDissapear(this.switch1, switchItems1, switchItems1Collide)}, null, this);
        
        this.physics.add.overlap(player, platSwitch2, function(){this.checkDissapear(this.switch2, switchItems2, switchItems2Collide)}, null, this);
    
        this.physics.add.overlap(player, platSwitch3, function(){this.checkDissapear(this.switch3, switchItems3, switchItems3Collide)}, null, this);
    
        //platfomrs go here
        platforms.create(0, 150, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        //box 1 roof
        platforms.create(250, 300, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        switchItems1.create(400, 300, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(550, 300, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        //pink walls box 1
        platforms.create(200, 350, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200, 500, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(650, 350, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(650, 500, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        //box 1 floor
        switchItems2.create(250, 650, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(400, 650, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(550, 650, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        //floor in general
        platforms.create(0, 650, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(150, 650, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(700, 650, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(750, 650, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        //left spikes
        spike.create(700,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        spike.create(730,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        spike.create(760,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        spike.create(790,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        spike.create(820,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        spike.create(850,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        spike.create(880,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        //right spikes
        spike.create(-15,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        spike.create(15,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        spike.create(45,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        spike.create(75,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        spike.create(105,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        spike.create(135,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        spike.create(165,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        
        platforms.create(400, 500, "splatform").setOrigin(0,0).setScale(0.5).refreshBody();
    
        //wall spikes left wall
        var wallspike1 = spike.create(300,350, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike1.angle = 90;
        wallspike1.setOffset(-50,0);
        var wallspike2 = spike.create(300,380, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike2.angle = 90;
        wallspike2.setOffset(-50,0);
        var wallspike3 = spike.create(300,410, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike3.angle = 90;
        wallspike3.setOffset(-50,0);
        var wallspike0 = spike.create(300,440, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike0.angle = 90;
        wallspike0.setOffset(-50,0);
        var wallspike4 = spike.create(300,470, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike4.angle = 90;
        wallspike4.setOffset(-50,0);
        var wallspike5 = spike.create(300,500, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike5.angle = 90;
        wallspike5.setOffset(-50,0);
        var wallspike6 = spike.create(300,530, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike6.angle = 90;
        wallspike6.setOffset(-50,0);
        var wallspike7 = spike.create(300,560, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike7.angle = 90;
        wallspike7.setOffset(-50,0);
        var wallspike8 = spike.create(300,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike8.angle = 90;
        wallspike8.setOffset(-50,0)
        var wallspike9 = spike.create(300,620, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike9.angle = 90;
        wallspike9.setOffset(-50,0)
        
        //wall spikes right wall
        var wallspike10 = spike.create(600,380, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike10.angle = 270;
        wallspike10.setOffset(40,-75);
        var wallspike11 = spike.create(600,470, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike11.angle = 270;
        wallspike11.setOffset(20,-20);
        var wallspike12 = spike.create(600,500, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike12.angle = 270;
        wallspike12.setOffset(20,-20);
        var wallspike13 = spike.create(600,530, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike13.angle = 270;
        wallspike13.setOffset(20,-20);
        var wallspike14 = spike.create(600,560, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike14.angle = 270;
        wallspike14.setOffset(20,-20);
        var wallspike15 = spike.create(600,590, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike15.angle = 270;
        wallspike15.setOffset(20,-20);
        var wallspike16 = spike.create(600,620, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike16.angle = 270;
        wallspike16.setOffset(20,-20);
        var wallspike17 = spike.create(600,650, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        wallspike17.angle = 270;
        wallspike17.setOffset(20,-20);
        
        //left wall 2
        platforms.create(200, 800, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200, 950, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200, 1100, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200, 1250, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        //right side plats floor 2
        platforms.create(500, 1300, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(700, 1200, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(500, 1100, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(700, 1000, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(500, 900, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        
    
        //floor 2
        platforms.create(0, 1500, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(150, 1500, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        switchItems3.create(300, 1500, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(450, 1500, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(600, 1500, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(750, 1500, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        
        //left wall 3
        platforms.create(200, 1600, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200, 1750, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200, 1800, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200, 2050, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(775, 1700, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(775, 1950, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
    
        spike.create(210,1540, 'spike').setOrigin(0,0).setScale(0.25).refreshBody();
        
        
        
        //floor 
        platforms.create(0, 2300, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(150, 2300, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        switchItems3.create(300, 2300, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(450, 2300, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(600, 2300, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(750, 2300, 'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        //left wall 4
        platforms.create(200, 2350, 'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        
        //sideways movers
        var moverLR = this.physics.add.image(600, 1850, 'wplatform').setOrigin(0,0).setScale(0.5).setImmovable(true).setVelocity(0, 100);
        moverLR.body.setAllowGravity(false);
        //spikes on movers
        var spike18 = this.physics.add.image(630, 1800, 'spike').setOrigin(0,0).setScale(0.25).setImmovable(true).setVelocity(0, 100);
        spike18.body.setAllowGravity(false);
        var spike19 = this.physics.add.image(660, 1800, 'spike').setOrigin(0,0).setScale(0.25).setImmovable(true).setVelocity(0, 100);
        spike19.body.setAllowGravity(false);
        var spike20 = this.physics.add.image(690, 1800, 'spike').setOrigin(0,0).setScale(0.25).setImmovable(true).setVelocity(0, 100);
        spike20.body.setAllowGravity(false);
        
        var mover2LR = this.physics.add.image(400, 1750, 'wplatform').setOrigin(0,0).setScale(0.5).setImmovable(true).setVelocity(0, 100);
        mover2LR.body.setAllowGravity(false);
        //spikes on movers
        var spike21 = this.physics.add.image(430, 1700, 'spike').setOrigin(0,0).setScale(0.25).setImmovable(true).setVelocity(0, 100);
        spike21.body.setAllowGravity(false);
        var spike22 = this.physics.add.image(460, 1700, 'spike').setOrigin(0,0).setScale(0.25).setImmovable(true).setVelocity(0, 100);
        spike22.body.setAllowGravity(false);
        var spike23 = this.physics.add.image(490, 1700, 'spike').setOrigin(0,0).setScale(0.25).setImmovable(true).setVelocity(0, 100);
        spike23.body.setAllowGravity(false);
        
    
        var mover3LR = this.physics.add.image(600, 2600, 'wplatform').setOrigin(0,0).setScale(0.5).setImmovable(true).setVelocity(0, 100);
        mover3LR.body.setAllowGravity(false);
    
        
        
        this.physics.add.collider(player, platforms);
    
        this.timeText = this.add.text(10, 400, this.elapsed)
        this.timeText.setScrollFactor(0);
    

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
        
        //if player overlaps with bunny, level is complete
        this.physics.add.overlap(player, checkpoint, function(){
            this.scene.start("next_level");
            console.log('you win!');
        }, null, this);

        //restart scene if player overlaps portal 
        this.physics.add.overlap(player, portal, this.reset, null, this);
        this.physics.add.overlap(player, spike, this.reset, null, this);
        this.physics.add.overlap(player, spike18, this.reset, null, this);
        this.physics.add.overlap(player, spike19, this.reset, null, this);
        this.physics.add.overlap(player, spike20, this.reset, null, this);
        this.physics.add.overlap(player, spike21, this.reset, null, this);
        this.physics.add.overlap(player, spike22, this.reset, null, this);
        this.physics.add.overlap(player, spike23, this.reset, null, this);

        //moving vertical platform
        
        
    
        //mover array
        mover = [moverLR, mover2LR, mover3LR];
        this.physics.add.collider(player, moverLR);
        this.physics.add.collider(player, mover2LR);
        this.physics.add.collider(player, mover3LR);
        
    this.tweens.timeline({
        targets: [moverLR.body.velocity, mover2LR.body.velocity, spike18.body.velocity, spike19.body.velocity, spike20.body.velocity, spike21.body.velocity, spike22.body.velocity, spike23.body.velocity],
        loop: -1,
        tweens: [
          { x:    -100, y: 0, duration: 1000, ease: 'Stepped' },
          { x:    100, y:   0, duration: 1000, ease: 'Stepped' },
        ]
      });
    
    this.tweens.timeline({
        targets: [mover3LR.body.velocity],
        loop: -1,
        tweens: [
          { x:    -200, y: 0, duration: 1000, ease: 'Stepped' },
          { x:    200, y:   0, duration: 1000, ease: 'Stepped' },
        ]
      });
    
    
    
        //collider with moving platform
        

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
    checkKeyboard();
    //console.log(game.input.mousePointer.x + " , " + game.input.mousePointer.y);
    
    //Updating timer
    this.elapsed = this.timer.getElapsedSeconds();
    //console.log(this.timer.getElapsedSeconds());
    //add Math.floor or something here to round elapsed
    this.timeText.setText(this.elapsed);
      
    
    
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
    
    checkDissapear(itemswitch, items, itemcollider){
        itemswitch.disableBody(true,true);
        console.log("vanish");
        items.setActive(false).toggleVisible(false);
        itemcollider.active = false;
    }
        
}
    
