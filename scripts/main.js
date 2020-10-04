class TitleScene extends Phaser.Scene {
    constructor(){
        super('titleScene')
    }

    preload(){
        console.log('preload title');
        this.load.image('bg', '../assets/spacebg.jpg');
        this.load.image('star','../assets/star.png')
    }//end preload

    create(){
        let sb = this.add.image(400,300,'bg')
        let starButton = this.add.image(400,300,'star')
        starButton.setInteractive()
        starButton.on('pointerdown', ()=>{
            starButton.setScale(3)
        })
        starButton.on('pointerup', ()=>{
            starButton.setScale(1)
            this.scene.switch('gameScene')
        })
    }//end create

    update(){

    }//end update
}//end title scene

class GameScene extends Phaser.Scene {
    constructor(){
        super('gameScene')
        var turret1;
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
        this.load.image('dust_bunny','../assets/dust_bunny.jpg')
        this.load.image('portal','../assets/portal.png');
        this.load.image('player', '../assets/player.png');
        this.load.image('turret', '../assets/turret.png');
        this.load.image('bullet', '../assets/tracer.png');
    }//end preload

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
        
        //set background
        this.add.image(400,300,'bg');       

        //add checkpoint bunny
        checkpoint = this.physics.add.staticGroup();
        checkpoint.create(20, 60, 'dust_bunny').setOrigin(0,0).setScale(.125).refreshBody();

        //add portals
        portal = this.physics.add.staticGroup();
        portal.create(400,230, 'portal').setScale(.125).refreshBody();
        
        //add turret
        this.turret1 = this.add.image(380, 590, 'turret').setScale(0.25);

        //set player physics
        player = this.physics.add.sprite(60, 480, 'player').setScale(0.25);
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);
        player.body.setGravityY(300);
        
        //create and place static platforms
        var platforms = this.physics.add.staticGroup();
        platforms.create(0,550,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200,500,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(400,450,'gplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(400,250,'pplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200,200,'bplatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(0,150,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();     

        this.physics.add.collider(player, platforms);

        //add bullet group and collider
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 10
        });
        this.input.on('pointerdown', this.shoot, this);
        this.physics.add.collider(player, this.bullets, this.restart, null, this);
        
        //if player overlaps with bunny, level is complete
        this.physics.add.overlap(player, checkpoint, function(){
            this.scene.start("next_level");
            console.log('you win!');
        }, null, this);

        //restart scene if player overlaps portal - *I think we can delete this.. line 129 does same?
//        this.physics.add.overlap(player, portal, function(){
//            this.sound.play('death_sound');
//            this.registry.destroy(); // destroy registry
//            this.events.off(); // disable all active events
//            this.music.stop()
//            this.scene.restart(); // restart current scene
//            console.log('ggs only!');
//        }, null, this);
        
        this.physics.add.overlap(player, portal, this.restart, null, this);

        //moving vertical platform
        var mover = this.physics.add.image(650, 500, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);     
        mover.body.setAllowGravity(false);

        this.tweens.timeline({
        targets: mover.body.velocity,
        loop: -1,
        tweens: [
          { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
          { x:    0, y:   200, duration: 2000, ease: 'Stepped' },
        ]
      });
        
        //collider with moving platform
        this.physics.add.collider(player, mover);
        this.physics.add.overlap(player, mover, function(){
            if (player.body.touching.right){
                console.log("I am on the moving plat");
            }
        }, null, this);

        canGrab = false;
        rotated = false;
        wallJumped = false;

    }//end create
    
    //shoot function for bullets
    shoot(pointer) 
    {
       var bullet = this.bullets.get(this.turret1.x, this.turret1.y-20);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.setAllowGravity(false);
            bullet.body.velocity.y = -200;
            }
    }

    update(){
    
    this.checkKeyboard();
    this.turretDetector();
      
        
    //stickMechanic
    if(cursors.space.isDown && wallJumped == false){
          stickmechanic();
          //rotates player left
          player.angle = 270;
          rotated = true;
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
        }
        if (cursors.space.isUp){
            player.body.setAllowGravity(true);
            canGrab = false;
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

    }//end update
    
    checkKeyboard() {
        //keyboard controls for movement
      if (cursors.left.isDown && canGrab == false)
      {
          player.setVelocityX(-160);
          player.flipX=true;
      }
      else if (cursors.right.isDown)
      {
          player.setVelocityX(160);
          player.flipX=false;
      }
      else
      {
          player.setVelocityX(0);
      }
}

    restart() {
        this.registry.destroy(); // destroy registry
        this.music.stop();
        this.events.off(); // disable all active events
        this.scene.restart(); // restart current scene
    }

    checkWorldBounds()
    {
        var pos = this.position;
        var bounds = this.customBoundsRectangle;
        var check = this.world.checkCollision;

        var bx = (this.worldBounce) ? -this.worldBounce.x : -this.bounce.x;
        var by = (this.worldBounce) ? -this.worldBounce.y : -this.bounce.y;

        var wasSet = false;

        if (pos.x < bounds.x && check.left)
        {
            pos.x = bounds.x;
            this.velocity.x *= bx;
            this.blocked.left = true;
            wasSet = true;
        }
        else if (this.right > bounds.right && check.right)
        {
            pos.x = bounds.right - this.width;
            this.velocity.x *= bx;
            this.blocked.right = true;
            wasSet = true;
        }

        if (pos.y < bounds.y && check.up)
        {
            pos.y = bounds.y;
            this.velocity.y *= by;
            this.blocked.up = true;
            wasSet = true;
        }
        else if (this.bottom > bounds.bottom && check.down)
        {
            pos.y = bounds.bottom - this.height;
            this.velocity.y *= by;
            this.blocked.down = true;
            wasSet = true;
        }

        if (wasSet)
        {
            this.blocked.none = false;
        }

        return wasSet;
    }
    
    turretDetector()
    {
        if(player.x > 300 && player.x < 3200) {
            console.log('shoot');
            
        }
    }
}
