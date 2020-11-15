class TitleScene extends Phaser.Scene {
    constructor(){
        super('titleScene')
    }

    preload(){
        console.log('preload title');
        this.load.audio('song','music/Finance.mp3');
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.image('star','assets/star.png');
        this.load.image('logo', 'assets/VacuumRacerTitle.png');
        this.load.image('playButton', 'assets/playButton.png');
        this.load.image('tutorialButton', 'assets/tutorialButton.png');
        this.load.image('creditsButton', 'assets/creditsButton.png');
        this.load.image('levelsButton', 'assets/levelsButton.png');
    }//end preload

    create(){
        
        let sb = this.add.image(400,300,'bg');
        let logo = this.add.image(400,150,'logo').setScale(.5);
        let playButton = this.add.image(200,300,'playButton');
        let tutorialButton = this.add.image(200,400,'tutorialButton').setScale(.8);
        let creditsButton = this.add.image(600,400,'creditsButton');
        let levelsButton = this.add.image(600,300,'levelsButton');

        //let levelOne = this.add.image(380,580, 'star');
        //let levelTwo = this.add.image(420,580,'star');
        //let tutorial = this.add.image(460, 580, 'star');
        let gMode = this.add.image(20, 20, 'star');
        this.add.text(35, 15, 'God Mode', {fontSize: "15px", color: "#00f4f3", fontFamily: "Edge Of The Galaxy"});
        let bonus = this.add.image(20, 60, 'star');
        this.add.text(35, 55, 'Bonus 2', {fontSize: "15px", color: "#00f4f3", fontFamily: "Edge Of The Galaxy"});
        let bounce = this.add.image(20, 100, 'star');
        this.add.text(35, 95, 'Bonus 3', {fontSize: "15px", color: "#00f4f3", fontFamily: "Edge Of The Galaxy"});
        
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
//        
//        window.setTimeout(() => {
//        this.music.play();
//        }, 500);

        //Button that sends them to the first level
        playButton.setInteractive()
        playButton.on('pointerdown', ()=>{
            //playButton.setScale(.5)
        })
        playButton.on('pointerup', ()=>{
            //playButton.setScale(1)
            this.music.stop();
            this.scene.switch('levelone');
            
        })

        //Button to send them to the instructions page
        tutorialButton.setInteractive()
        tutorialButton.on('pointerdown', ()=>{
            //tutorialButton.setScale(.5)
        })
        tutorialButton.on('pointerup', ()=>{
            //tutorialButton.setScale(1)
            this.scene.switch('tutorial');
            this.music.stop();
        })

        //Button to send them to the credits page
        creditsButton.setInteractive()
        creditsButton.on('pointerdown', ()=>{
            //creditsButton.setScale(.5)
        })
        creditsButton.on('pointerup', ()=>{
            //creditsButton.setScale(1)
            this.scene.switch('credits');
            //this.music.stop();
        })
        
        //Button to send them to select levels on level page
        levelsButton.setInteractive()
        levelsButton.on('pointerdown', ()=>{
            //levelsButton.setScale(.5)
        })
        levelsButton.on('pointerup', ()=>{
            //levelsButton.setScale(1) 
            this.music.stop();
            this.scene.switch('levels');
        })

        
        gMode.setInteractive()
        gMode.on('pointerdown', ()=>{
            //gMode.setScale(.5)
        })
        gMode.on('pointerup', ()=>{
            //gMode.setScale(1)
            godMode = !godMode;
        })
        
        //bonus level access
        bonus.setInteractive()
        bonus.on('pointerdown', ()=>{
            //bonus.setScale(.5)
        })
        bonus.on('pointerup', ()=>{
            //bonus.setScale(1) 
            this.scene.switch('bonus2');
            this.music.stop();
        })
        
        //bouncetest access
        bounce.setInteractive()
        bounce.on('pointerdown', ()=>{
            //bounce.setScale(.5)
        })
        bounce.on('pointerup', ()=>{
            //bounce.setScale(1) 
            this.scene.switch('bounceTest');
            this.music.stop();
        })
        
        
    }//end create

    update(){

    }//end update
}//end title scene