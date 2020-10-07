class TitleScene extends Phaser.Scene {
    constructor(){
        super('titleScene')
    }

    preload(){
        console.log('preload title');
        this.load.image('bg', '../assets/spacebg.jpg');
        this.load.image('star','../assets/star.png');
        this.load.image('logo', '../assets/VacuumRacerTitle.png');
        this.load.image('playButton', '../assets/playButton.png');
        this.load.image('instructionsButton', '../assets/instructionsButton.png');
        this.load.image('creditsButton', '../assets/creditsButton.png');
    }//end preload

    create(){
        let sb = this.add.image(400,300,'bg')
        let logo = this.add.image(400,150,'logo').setScale(.5);
        let playButton = this.add.image(400,300,'playButton');
        let instructionsButton = this.add.image(400,400,'instructionsButton');
        let creditsButton = this.add.image(400,500,'creditsButton');
        let levelOne = this.add.image(380, 580, 'star');
        let levelTwo = this.add.image(420,580,'star');

        playButton.setInteractive()
        playButton.on('pointerdown', ()=>{
            playButton.setScale(.5)
        })
        playButton.on('pointerup', ()=>{
            playButton.setScale(1)
            this.scene.switch('levelone')
        })

        instructionsButton.setInteractive()
        instructionsButton.on('pointerdown', ()=>{
            instructionsButton.setScale(.5)
        })
        instructionsButton.on('pointerup', ()=>{
            instructionsButton.setScale(1)
            //this.scene.switch('gameScene')
        })

        creditsButton.setInteractive()
        creditsButton.on('pointerdown', ()=>{
            creditsButton.setScale(.5)
        })
        creditsButton.on('pointerup', ()=>{
            creditsButton.setScale(1)
            //this.scene.switch('gameScene')
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
    }//end create

    update(){

    }//end update
}//end title scene