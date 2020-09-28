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
    }

    preload(){
        this.load.audio('song','../music/Art.mp3');
        this.load.image('bg', '../assets/spacebg.jpg');
        this.load.image('player', '../assets/player.png');
        this.load.image('splatform', '../assets/platform_hor.png')
        this.load.image('mover', '../assets/platform_vert.png')
        this.load.image('dust_bunny','../assets/dust_bunny.jpg')
        this.load.image('portal','../assets/portal.png');
    }//end preload

    create(){
        cursors = this.input.keyboard.createCursorKeys();

        this.music = this.sound.add('song');
        var musicConfig = {
            mute: false,
            volume: 0,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);

        this.add.image(400,300,'bg');       //set background
        
        //add checkpoint bunny
        checkpoint = this.physics.add.staticGroup();
        checkpoint.create(20, 60, 'dust_bunny').setOrigin(0,0).setScale(.125).refreshBody();
        
        //Creating portal that makes player restart level
        portal = this.physics.add.staticGroup();
        portal.create(400,200, 'portal').setScale(.05).refreshBody();

        player = this.physics.add.sprite(60, 480, 'player').setScale(0.25);

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.body.setGravityY(300);

        var platforms = this.physics.add.staticGroup();
        platforms.create(0,550,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200,500,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(400,450,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(400,250,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200,200,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(0,150,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();     //create and place static platforms

        this.physics.add.collider(player, platforms);
        
        //if player overlaps with bunny, level is complete
        this.physics.add.overlap(player, checkpoint, function(){
            this.scene.start("next_level");
            console.log('you win!');
        }, null, this);
        
        //restart scene if player overlaps portal
        this.physics.add.overlap(player, portal, function(){
            this.registry.destroy(); // destroy registry
            this.events.off(); // disable all active events
            this.scene.restart(); // restart current scene
            console.log('ggs only!');
        }, null, this);
        

        var mover = this.physics.add.image(750, 500, 'mover').setScale(0.5).setImmovable(true).setVelocity(0, 100);     //moving vertical platform
        mover.body.setAllowGravity(false);

        this.tweens.timeline({
        targets: mover.body.velocity,
        loop: -1,
        tweens: [
          { x:    0, y: -200, duration: 2000, ease: 'Stepped' },
          { x:    0, y:   200, duration: 2000, ease: 'Stepped' },
        ]
      });


    }//end create

    update(){
      //all the keyboard controls are shown here
      if (cursors.left.isDown)
      {
          player.setVelocityX(-160);

      }
      else if (cursors.right.isDown)
      {
          player.setVelocityX(160);

      }
      else
      {
          player.setVelocityX(0);

      }
      if(cursors.space.isDown && player.body.touching.right){
          stickmechanic();

      }
      if (cursors.up.isDown && player.body.touching.down)
      {
          player.setVelocityY(-320);
      }

    }//end update
}
