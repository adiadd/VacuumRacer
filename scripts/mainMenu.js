class TitleScene extends Phaser.Scene {
    constructor(){
        super('titleScene')
    }

    preload(){
        console.log('preload title');
        //this.load.audio('song','../music/Finance.mp3');
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.image('star','assets/star.png');
        this.load.image('logo', 'assets/VacuumRacerTitle.png');
        this.load.image('playButton', 'assets/playButton.png');
        this.load.image('instructionsButton', 'assets/instructionsButton.png');
        this.load.image('creditsButton', 'assets/creditsButton.png');
        this.load.image('levelsButton', 'assets/levelsButton.png');
    }//end preload

    create(){
        
        let sb = this.add.image(400,300,'bg')
        let logo = this.add.image(400,150,'logo').setScale(.5);
        let playButton = this.add.image(200,300,'playButton');
        let instructionsButton = this.add.image(200,400,'instructionsButton');
        let creditsButton = this.add.image(600,400,'creditsButton');
        let levelsButton = this.add.image(600,300,'levelsButton');
        let levelOne = this.add.image(380,580, 'star');
        let levelTwo = this.add.image(420,580,'star');
        let tutorial = this.add.image(460, 580, 'star');
        
        //music config
//        this.music = this.sound.add('song');
//        var musicConfig = {
//            mute: false,
//            volume: 1,
//            rate: 1,
//            detune: 0,
//            seek: 0,
//            loop: true,
//            delay: 0
//        }
//        
//        this.music.play(musicConfig);
//        
//        window.setTimeout(() => {
//        this.music.play();
//        }, 500);

        //Button that sends them to the first level
        playButton.setInteractive()
        playButton.on('pointerdown', ()=>{
            playButton.setScale(.5)
        })
        playButton.on('pointerup', ()=>{
            playButton.setScale(1)
            this.scene.switch('levelone')
        })

        //Button to send them to the instructions page
        instructionsButton.setInteractive()
        instructionsButton.on('pointerdown', ()=>{
            instructionsButton.setScale(.5)
        })
        instructionsButton.on('pointerup', ()=>{
            instructionsButton.setScale(1)
            this.scene.switch('instructions')
        })

        //Button to send them to the credits page
        creditsButton.setInteractive()
        creditsButton.on('pointerdown', ()=>{
            creditsButton.setScale(.5)
        })
        creditsButton.on('pointerup', ()=>{
            creditsButton.setScale(1)
            this.scene.switch('credits')
        })
        
        //Button to send them to select levels on level page
        levelsButton.setInteractive()
        levelsButton.on('pointerdown', ()=>{
            levelsButton.setScale(.5)
        })
        levelsButton.on('pointerup', ()=>{
            levelsButton.setScale(1) 
            this.scene.switch('levels')
        })

        levelOne.setInteractive()
        levelOne.on('pointerdown', ()=>{
            levelOne.setScale(.5)
        })
        levelOne.on('pointerup', ()=>{
            levelOne.setScale(1)
            this.scene.switch('levelone')
        })
        
        levelTwo.setInteractive()
        levelTwo.on('pointerdown', ()=>{
            levelTwo.setScale(.5)
        })
        levelTwo.on('pointerup', ()=>{
            levelTwo.setScale(1)
            this.scene.switch('leveltwo')
        })
        
        tutorial.setInteractive()
        tutorial.on('pointerdown', ()=>{
            tutorial.setScale(.5)
        })
        tutorial.on('pointerup', ()=>{
            tutorial.setScale(1)
            this.scene.switch('tutorial')
        })
    }//end create

    update(){

    }//end update
}//end title scene