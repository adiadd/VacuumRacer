class MovementTest extends Phaser.Scene{
    constructor(){
        super("move_test");
    }

    preload(){
        this.load.audio('song','../music/Art.mp3');
        this.load.image('bg', '../assets/spacebg.jpg');
        this.load.image('player', '../assets/player.png');
        this.load.image('splatform', '../assets/platform_hor.png')
        this.load.image('mover', '../assets/platform_vert.png')
        this.load.image('dust_bunny','../assets/dust_bunny.jpg')
        this.load.image('portal','../assets/portal.png');
    }
    create(){
        //add music
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

        this.add.image(400,300,'bg');       //set background
        
        //this is where the player and all their attributes are made
        player = this.physics.add.sprite(50, 450, 'player').setScale(0.1).refreshBody();
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        //creates the platforms for the player to stand on
        platforms = this.physics.add.staticGroup();

        platforms.create(0,550,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200,500,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(400,450,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(400,250,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(200,200,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();
        platforms.create(0,150,'splatform').setOrigin(0,0).setScale(0.5).refreshBody();     //create and place static platforms

        checkpoint = this.physics.add.staticGroup();

        checkpoint.create(400,100, 'dust_bunny').setScale(.25).refreshBody();

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, platforms);
        this.physics.add.overlap(player, checkpoint, function(){
            this.scene.start("next_level");
            console.log('you win!');
        }, null, this);

        //Creating portal that makes player restart level

        portal = this.physics.add.staticGroup();

        portal.create(400,300, 'portal').setScale(.05).refreshBody();

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, platforms);
        this.physics.add.overlap(player, portal, function(){
            this.registry.destroy(); // destroy registry
            this.events.off(); // disable all active events
            this.scene.restart(); // restart current scene
            console.log('ggs only!');
        }, null, this);
    grabbing = false;
    }

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
        if( cursors.space.isDown ){
            stickmechanic();
            
        }
        if (cursors.space.isUp){
            player.body.setAllowGravity(true);
        } 
        
        if (cursors.up.isDown && player.body.touching.down)
        { 
            player.setVelocityY(-320);
        }
       
        if (player.body.touching.down){
            grabbing = false;
        }
    }
}
