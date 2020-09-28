class MovementTest extends Phaser.Scene{
    constructor(){
        super("move_test");
    }

    preload(){
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.image('portal','assets/portal.png');
        this.load.image('dust_bunny', 'assets/dust_bunny.jpg');
        this.load.image('ground_lr', 'assets/platform_lightred.png');
        this.load.image('ground_p','assets/platform_pink.png');
        this.load.image('ground_db', 'assets/platform_darkblue.png');
        this.load.spritesheet('player', 'assets/player.png',
            { frameWidth: 300}
        );
    }
    create(){
        this.add.image(400, 300, 'bg');
        
        //this is where the player and all their attributes are made
        player = this.physics.add.sprite(50, 450, 'player').setScale(0.1).refreshBody();
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        /*
        //animations for the player
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ {key: 'dude', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });
        */
        //creates the platforms for the player to stand on
        platforms = this.physics.add.staticGroup();


        platforms.create(50, 600, 'ground_lr').setScale(0.1).refreshBody();
        platforms.create(200, 500, 'ground_p').setScale(.025).refreshBody();
        platforms.create(300, 400, 'ground_db').setScale(.05).refreshBody();
        platforms.create(400,400,'ground_p').setScale(.05).refreshBody();

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
