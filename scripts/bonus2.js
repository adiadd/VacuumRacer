class Bonus2 extends Phaser.Scene {
    constructor(){
        super('bonus2')
    }
    
preload(){
        //audio
        this.load.audio('song2','music/cities.mp3');
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
        this.load.image('bounce', 'assets/bounce.png');
        this.load.image('gmode', 'assets/star.png');
        this.load.image('backdropxl', 'assets/bg_long.png');
}
    
create(){
    this.scene.launch('overlay');
    keyNumber = 5;
    
        var mover1;
        var mover2;
        var bounce;
        var bounce2;
        var score = 0;
        this.start = true;
        cursors = this.input.keyboard.createCursorKeys();
        this.tdelay = 0;
        this.clearBullets = false;
        this.elapsed = 0;
        var hasTouched;
        hasTouched = false;

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

        // //Adding timer
        // this.timer = this.time.addEvent({              
        // loop: false,
        // repeat: 1000000,
        // startAt: 0,
        // paused: false
        // });

        //these two lines change the size of the scene and camera bounds!!
        this.physics.world.setBounds(0, 0, 750, 4600, true, true, true, true);
        this.cameras.main.setBounds(0, 0, 750, 4600);

        //set background
        var backdrop = this.add.image(400,2300,'backdropxl');
        backdrop.setScale(1);

        //add player and set physics
        player = this.physics.add.sprite(60, 4480, 'player').setScale(0.25);
        checkpointX = 60;
        checkpointY = 4480;
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);
        player.body.setGravityY(300);
    
        //make camera follow player
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(1);
        
        //create and place static platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(0,4550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(475, 3600, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200, 2350, 'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        
        this.physics.add.collider(player, platforms);
    
        //bounce platforms
        bounce = this.physics.add.staticGroup();
        bounce2 = this.physics.add.staticGroup();
        bounce.create(250, 4450,'bounce');
        bounce.create(400, 4350, 'bounce');
        bounce2.create(250, 3850,'bounce');
        bounce.create(400, 3950, 'bounce');
        bounce.create(300, 3660,'bounce');
    
        bounce2.create(350, 3550,'bounce');
        bounce.create(250, 3450,'bounce');
        bounce.create(150, 3350,'bounce');
        bounce.create(150, 3250,'bounce');
        bounce.create(150, 3150,'bounce');
        bounce.create(300, 3050,'bounce');
        bounce.create(400, 2950,'bounce');
        bounce.create(550, 2850,'bounce');
        bounce.create(550, 2750,'bounce');
        bounce.create(550, 2650,'bounce');
        bounce.create(550, 2550,'bounce');
        bounce.create(450, 2450,'bounce');
    
        bounce.create(200, 2250,'bounce');
        bounce.create(100, 2150,'bounce');
        bounce.create(200, 2050,'bounce');
        
        bounce.create(600, 1900,'bounce');
        bounce.create(500, 1800,'bounce');
    
        bounce.create(200, 1700,'bounce');
        bounce.create(300, 1600,'bounce');
        bounce.create(400, 1500,'bounce');
        bounce.create(500, 1400,'bounce');
    
        this.physics.add.overlap(player, bounce, this.bounce, null, this);
        this.physics.add.overlap(player, bounce2, this.bounce2, null, this);
    
        checkpoint = this.physics.add.staticGroup();
        checkpoint.create(600, 1280, 'dust_bunny').setOrigin(0,0).setScale(.125).refreshBody();
    
    
        //add bullet group and collider for horizontal bullets
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet2',
            maxSize: 200
        });
        this.physics.add.collider(player, this.bullets, this.reset, null, this);
    
        //moving vertical platform
        mover1 = this.physics.add.image(50, 4050, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);     
        mover1.body.setAllowGravity(false);
    
        mover2 = this.physics.add.image(500, 4350, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);  
        mover2.body.setAllowGravity(false);
    
        var moverLR1 = this.physics.add.image(450, 2000, 'wplatform').setOrigin(0,0).setScale(0.5).setImmovable(true).setVelocity(0, 100);
        moverLR1.body.setAllowGravity(false);
    
        var moverLR2 = this.physics.add.image(250, 1800, 'wplatform').setOrigin(0,0).setScale(0.5).setImmovable(true).setVelocity(0, -100);
        moverLR2.body.setAllowGravity(false);
    
        mover = [mover1, mover2, moverLR1, moverLR2];
    
        this.tweens.timeline({
        targets: [mover1.body.velocity, mover2.body.velocity],
        loop: -1,
        tweens: [
          { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
          { x:    0, y:   200, duration: 2000, ease: 'Stepped' },
        ]
      });
    
        this.tweens.timeline({
        targets: [moverLR1.body.velocity, moverLR2.body.velocity],
        loop: -1,
        tweens: [
          { x:    -100, y: 0, duration: 2000, ease: 'Stepped' },
          { x:    100, y:   0, duration: 2000, ease: 'Stepped' },
        ]
      });
    
        //collider with moving platform
        this.physics.add.collider(player, mover1);
        this.physics.add.collider(player, mover2);
        this.physics.add.collider(player, moverLR1);
        this.physics.add.collider(player, moverLR2);
    
        //gmode enabler
        var gmode = this.physics.add.staticGroup();
        this.gMode = gmode.create(520, 3570, 'gmode').refreshBody();
    
        //create star checkpoints
        var stars = this.physics.add.staticGroup();
        this.star1 = stars.create(520, 3570, 'star').refreshBody();
        this.star2 = stars.create(250, 2320, 'star').refreshBody();
        this.starArr = [this.star1, this.star2];
    
        //star pickup overlap 
        this.physics.add.overlap(player, stars, this.checkPoint, null, this);
    
        //gmode pickup overlap 
        this.physics.add.overlap(player, this.gMode, this.enablegMode, null, this);
    
        //if player overlaps with bunny, level is complete
        this.physics.add.overlap(player, checkpoint, function(){
            this.music.stop();
            this.scene.stop('bonus2');
            this.scene.stop('overlay');
            this.scene.start("performance");
        }, null, this);
}
    
update(){
    
    if(this.start) {
        this.cameras.main.zoomTo(1.4, 1000);
        this.start = false;
    }
    
    //Updating timer
//    this.elapsed = this.timer.getElapsedSeconds();
//    console.log(this.timer.getElapsedSeconds());
//    //add Math.floor or something here to round elapsed
//    this.timeText.setText(this.elapsed);
    
    checkKeyboard();    
    //this.fireLazers();
    //this.bounce();
    //this.checkTurrets();

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

//        //inactivate bullets after leaving screen
        this.bullets.children.each(function(b) {
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
        this.score++;
        godMode = false;
    }
    
    reset(){
        this.sound.play('death_sound');
        deathCount++;
        deathCountTotal++;
        //var timer = scene.time.delayedCall(1000, null, null, this);
       this.bullets.clear(true);
//        this.bullets2.clear(true);
        player.x = checkpointX;
        player.y = checkpointY;
    }
    
     shootRight(y)
    {
       var bullet = this.bullets.get(0, y);
        
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.setAllowGravity(false);
            bullet.body.velocity.x = 500;
            bullet.body.velocity.y = 0;
            }
    }
    
      shootLeft(y)
    {
       var bullet = this.bullets.get(800, y);
        
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.setAllowGravity(false);
            bullet.body.velocity.x = -500;
            bullet.body.velocity.y = 0;
            }
    }
    
    bounce() {
        if(this.hasTouched == false && cursors.up.isUp) {
            this.hasTouched = true;
        }else{
            if(cursors.up.isDown) 
            {
                player.setVelocityY(-400);
                this.hasTouched = 
                player.setVelocityY(-400);
                this.hasTouched = false;
                this.sound.play('jump_sound');
                if((Phaser.Math.Between(0, 800)) < 400){
                    this.shootRight(player.y-50);
                }else{
                    this.shootLeft(player.y+50);
                }
            }
            }
            
        }
    
    bounce2() {
        if(this.hasTouched == false && cursors.up.isUp) {
            this.hasTouched = true;
        }else{
            if(cursors.up.isDown) 
            {
                player.setVelocityY(-400);
                this.hasTouched = false;
                this.sound.play('jump_sound');
            }
            }
            
        }
    
    enablegMode() {
        godMode = false;
        this.gMode.disableBody(true, true);
    }
    
    fireLazers() {
        var x = player.x;
        var y = player.y;
        
        if(y < 3300 && y > 3100) {
            if((Phaser.Math.Between(0, 800)) < 400) {
                    this.shootLeft(y);
            }
        }
        if(y < 3150 && y > 2950) {
            if((Phaser.Math.Between(0, 800)) < 400) {
                    this.shootRight(y);
            }
        }
    }
    
}