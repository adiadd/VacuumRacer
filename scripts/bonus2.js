class Bonus2 extends Phaser.Scene {
    constructor(){
        super('bonus2')
    }
    
preload(){
        //audio
        this.load.audio('song2','../music/cities.mp3');
        this.load.audio('jump_sound', 'sounds/jump_sound.wav')
        this.load.audio('death_sound', 'sounds/death_sound.mp3')
        
        //platforms
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.image('splatform', 'assets/platform_hor.png')
        this.load.image('bplatform', 'assets/platform_blue.png')
        this.load.image('gplatform', 'assets/platform_green.png')
        this.load.image('pplatform', 'assets/platform_purple.png')
        this.load.image('mover', 'assets/platform_vert.png')
        this.load.image('vplatform', '../assets/platform_vert.png')
        this.load.image('wplatform', 'assets/platform_white.png')
        this.load.image('vplatform_xl', '../assets/vert_xl.png')
        
        //etc
        this.load.image('dust_bunny','assets/dust_bunny.png')
        this.load.image('star','../assets/star.png')
        this.load.image('portal','assets/portal.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('turret', 'assets/turret.png');
        this.load.image('bullet2', '../assets/tracer2.png');
        this.load.image('bullet', 'assets/tracer.png');
        this.load.image('backdrop', 'backdrops/white.png');
        this.load.image('bounce', '../assets/bounce.png');
        this.load.image('gmode', '../assets/star.png');
}
    
create(){
    
        var mover1;
        var mover2;
        var bounce;
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
        this.physics.world.setBounds(0, 0, 750, 4600, true, true, true, true);
        this.cameras.main.setBounds(0, 0, 750, 4600);

        //set background
        var backdrop = this.add.image(400,3300,'backdrop');
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
        
        this.physics.add.collider(player, platforms);
    
         //bounce
        bounce = this.physics.add.staticGroup();
        bounce.create(250, 4450,'bounce');
        bounce.create(400, 4350, 'bounce');
        bounce.create(250, 3850,'bounce');
        bounce.create(400, 3950, 'bounce');
        bounce.create(300, 3660,'bounce');
    
        this.physics.add.overlap(player, bounce, this.bounce, null, this);
    
    
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
    
        mover = [mover1, mover2];
    
        this.tweens.timeline({
        targets: [mover1.body.velocity, mover2.body.velocity],
        loop: -1,
        tweens: [
          { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
          { x:    0, y:   200, duration: 2000, ease: 'Stepped' },
        ]
      });
    
        //collider with moving platform
        this.physics.add.collider(player, mover1);
        this.physics.add.collider(player, mover2);
    
        //gmode enabler
        var gmode = this.physics.add.staticGroup();
        this.gMode = gmode.create(520, 3570, 'gmode').refreshBody();
    
        //gmode pickup overlap 
        this.physics.add.overlap(player, this.gMode, this.enablegMode, null, this);
}
    
update(){
    
//    if(this.start) {
//        this.cameras.main.zoomTo(1.4, 1000);
//        this.start = false;
//    }
    
    //Updating timer
//    this.elapsed = this.timer.getElapsedSeconds();
//    console.log(this.timer.getElapsedSeconds());
//    //add Math.floor or something here to round elapsed
//    this.timeText.setText(this.elapsed);
    
    checkKeyboard();    
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
    
    reset(){
        this.sound.play('death_sound');
        //var timer = scene.time.delayedCall(1000, null, null, this);
//        this.bullets.clear(true);
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
    
    enablegMode() {
        godMode = true;
    }
    
}