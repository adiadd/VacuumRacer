class LevelsScene extends Phaser.Scene {
    constructor(){
        super('levels')
    }

    preload(){
        console.log("levels scene");
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.image('back', 'assets/backButton.png');
        this.load.image('l1', 'assets/levelOneButton.png');
        this.load.image('l2', 'assets/levelTwoButton.png');
        this.load.image('l3', 'assets/levelThreeButton.png');
        this.load.image('l4', 'assets/levelFourButton.png');
        this.load.image('l5', 'assets/levelFiveButton.png');
        this.load.image('l6', 'assets/levelSixButton.png');
        this.load.image('l7', 'assets/levelSevenButton.png');
        this.load.image('lt', 'assets/levelTutorialButton.png');
        this.load.image('levelsButton', 'assets/levelsButton.png');
    }//end preload

    create(){
        let sb = this.add.image(400,300,'bg');
        let backButton = this.add.image(50,100,'back');
        let levelsButton = this.add.image(400,100,'levelsButton').setScale(1.5);
        let levelOne = this.add.image(200,300, 'l1');
        let levelTwo = this.add.image(400,300,'l2');
        let levelThree = this.add.image(600, 300, 'l3');
        let levelTutorial = this.add.image(600,100,'lt').setScale(.5);

        backButton.setInteractive()
        backButton.on('pointerdown', ()=>{
            backButton.setScale(.5)
        })
        backButton.on('pointerup', ()=>{
            backButton.setScale(1)
            this.scene.switch('titleScene')
        })

        levelTutorial.setInteractive()
        levelTutorial.on('pointerdown', ()=>{
            levelTutorial.setScale(.5)
        })
        levelTutorial.on('pointerup', ()=>{
            levelTutorial.setScale(1)
            this.scene.switch('tutorial')
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
        
        levelThree.setInteractive()
        levelThree.on('pointerdown', ()=>{
            levelThree.setScale(.5)
        })
        levelThree.on('pointerup', ()=>{
            levelThree.setScale(1)
            this.scene.switch('levelthree')
        })

    }//end create

    update(){

    }//end update
}//end title scene