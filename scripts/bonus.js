class Bonus extends Phaser.Scene {
    constructor(){
        super('bonus')
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
        this.load.image('vplatform_xl', 'assets/vert_xl.png')
        
        //etc
        this.load.image('dust_bunny','assets/dust_bunny.png')
        this.load.image('star','assets/star.png')
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
        var score;
        this.score = 0;
        this.shootOn = 40;
        this.count = 0;
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
        this.physics.world.setBounds(0, 0, 800, 2600, true, true, true, true);
        this.cameras.main.setBounds(0, 0, 800, 2600);
        
        //set background
        var backdrop = this.add.image(400,1300,'backdrop'); 
        backdrop.setScale(1);
    
        //add checkpoint bunny
        checkpoint = this.physics.add.staticGroup();
        

        //add portals
        portal = this.physics.add.staticGroup();
        
        
        //bottom turrets
//        this.turret1 = this.add.image(555, 2300, 'turret');
//        this.turret7.angle = 180;
//    
//        this.turret4 = this.add.image(450, 2250, 'turret');
//        this.turret5 = this.add.image(210, 2250, 'turret');
//    
//        this.turret6 = this.add.image(800, 1970, 'turret');
//        this.turret6.angle = 270;
//    
//        this.turrDown = [this.turret1, this.turret2, this.turret3];
//        this.turrDown2 = [this.turret7];
//        this.turrUp = [this.turret4, this.turret5];
//        this.turrLeft = [this.turret6];
//        this.tdelay = 0;

        //add player and set physics
        player = this.physics.add.sprite(60, 480, 'player').setScale(0.25);
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
        this.starArr = [this.star1]
    
        //star pickup overlap 
        this.physics.add.overlap(player, stars, this.checkPoint, null, this);
        
        //create and place static platforms
        var platforms = this.physics.add.staticGroup();
    
        //ground
        platforms.create(50,550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200,550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(350,550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(500,550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        //platforms.create(600,550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();

        //walls
        platforms.create(650,260,'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(0,260,'vplatform_xl').setOrigin(0,0).setScale(0.5).refreshBody();
    
//        platforms.create(750,1800,'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
//        platforms.create(600,1650,'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
//        platforms.create(750,1500,'vplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        
        
//        dissapearPlatforms = this.physics.add.staticGroup();
//        
//        
//        var moverLR = this.physics.add.image(550, 2550, 'wplatform').setOrigin(0,0).setScale(0.5).setImmovable(true).setVelocity(0, 100);
//        moverLR.body.setAllowGravity(false);
//        
//        var mover2LR = this.physics.add.image(530, 2000, 'wplatform').setOrigin(0,0).setScale(0.5).setImmovable(true).setVelocity(0, 100);
//        mover2LR.body.setAllowGravity(false);
//    
//        var mover3LR = this.physics.add.image(550, 1500, 'wplatform').setOrigin(0,0).setScale(0.5).setImmovable(true).setVelocity(0, 100);
//        mover3LR.body.setAllowGravity(false);
//        
//        platCollide = this.physics.add.collider(player, dissapearPlatforms);
          this.physics.add.collider(player, platforms);
//    
//        this.timeText = this.add.text(10, 400, this.elapsed)
//        this.timeText.setScrollFactor(0);

        //add bullet group and collider
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 500
        });
        this.physics.add.collider(player, this.bullets, this.reset, null, this);
    
        //add star group and collider
        this.stars = this.physics.add.group({
            defaultKey: 'star',
            maxSize: 100
        });
        this.physics.add.collider(player, this.stars, this.score, null, this);
        
        //if player overlaps with bunny, level is complete
//        this.physics.add.overlap(player, checkpoint, function(){
//            this.scene.start("next_level");
//            console.log('you win!');
//        }, null, this);

        //restart scene if player overlaps portal 
        this.physics.add.overlap(player, portal, this.reset, null, this);

        //moving vertical platform
//        mover1 = this.physics.add.image(750, 2500, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);     
//        mover1.body.setAllowGravity(false);
//    
//    
//        //mover array
//        mover = [mover1, moverLR, mover2LR];
//
//        this.tweens.timeline({
//        targets: [mover1.body.velocity],
//        loop: -1,
//        tweens: [
//          { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
//          { x:    0, y:   200, duration: 2000, ease: 'Stepped' },
//        ]
//      });
//        
//    this.tweens.timeline({
//        targets: [moverLR.body.velocity],
//        loop: -1,
//        tweens: [
//          { x:    -200, y: 0, duration: 2000, ease: 'Stepped' },
//          { x:    200, y:   0, duration: 2000, ease: 'Stepped' },
//        ]
//      });
//    
//    this.tweens.timeline({
//        targets: [mover2LR.body.velocity, mover3LR.body.velocity],
//        loop: -1,
//        tweens: [
//          { x:    -100, y: 0, duration: 4000, ease: 'Stepped' },
//          { x:    100, y:   0, duration: 4000, ease: 'Stepped' },
//        ]
//      });
//        //collider with moving platform
//        this.physics.add.collider(player, mover1);
//        this.physics.add.collider(player, mover2);
//        this.physics.add.collider(player, mover3);
//        this.physics.add.collider(player, moverLR);
//        this.physics.add.collider(player, mover2LR);
//        this.physics.add.collider(player, mover3LR);

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
    this.checkKeyboard();
    console.log('count = ' + this.count + ' shootOn = ' + this.shootOn)
    
    if(this.count == this.shootOn ) {
        this.shootDown(Phaser.Math.Between(0, 800));
        if(this.shootOn > 10 && (Phaser.Math.Between(0, 800)) < 400) {
            
            this.shootOn--;
        }
        this.count = 0;
    }
    
    this.count++;
    
    //spawn star every 1/16 frame
    if((Phaser.Math.Between(0, 800)) < 10) {
        this.starFall((Phaser.Math.Between(0, 800)));
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
                if (b.y < -20 || b.y > 800) {
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

     shootDown(x)
    {
       var bullet = this.bullets.get(x, -20);
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
        console.log(checkpointX + " " + checkpointY)
        //this.bullets2.clear(true);
        player.x = checkpointX;
        player.y = checkpointY;
    }
    
    checkKeyboard() {
        //keyboard controls for movement
      if (cursors.left.isDown && !(isOnRight))
      {
          player.setVelocityX(-160);
          player.flipX=true;
      }
      else if (cursors.right.isDown && !(isOnRight))
      {
          player.setVelocityX(160);
          player.flipX=false;
      }
      else
      {
          player.setVelocityX(0);
      }
}
    score() {
        this.score++;
    }
    
    starFall(x) {
        var star = this.stars.get(x, -20);
        if (star) {
            star.setActive(true);
            star.setVisible(true);
            star.body.setAllowGravity(false);
            star.body.velocity.x = 0;
            star.body.velocity.y = 100;
            }
    }
        
}
    