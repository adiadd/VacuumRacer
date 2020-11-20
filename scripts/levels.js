class LevelsScene extends Phaser.Scene {
    constructor(){
        super('levels')
    }

    preload(){
        console.log("levels scene");
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.audio('song','music/Finance.mp3');
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
        this.load.image('bonusButton', 'assets/bonusButton.png');
    }//end preload

    create(){
        //music config
        this.music = this.sound.add('song');
        var musicConfig = {
            mute: false,
            volume: 0.75,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }


        let sb = this.add.image(400,300,'bg');
        let backButton = this.add.image(50,100,'back');
        let levelsButton = this.add.image(400,100,'levelsButton').setScale(1.5);
        let bonusButton = this.add.image(700,100,'bonusButton').setScale(.5);
        let levelOne = this.add.image(200,300, 'l1');
        let levelTwo = this.add.image(400,300,'l2');
        let levelThree = this.add.image(600, 300, 'l3');
        let levelFour = this.add.image(300, 470, 'l4');
        let levelFive = this.add.image(500, 470, 'l5');
        // let levelSix = this.add.image(650, 470, 'l6');
        let levelTutorial = this.add.image(600,100,'lt').setScale(.5);

        backButton.setInteractive()
        backButton.on('pointerdown', ()=>{
            //backButton.setScale(.5)
        })
        backButton.on('pointerup', ()=>{
            //backButton.setScale(1)
            this.scene.switch('titleScene');
            this.music.stop();
        })

        levelTutorial.setInteractive()
        levelTutorial.on('pointerdown', ()=>{
            //levelTutorial.setScale(.5)
        })
        levelTutorial.on('pointerup', ()=>{
            //levelTutorial.setScale(1)
            this.music.stop();
            this.scene.switch('tutorial');
        })

        levelOne.setInteractive()
        levelOne.on('pointerdown', ()=>{
            //levelOne.setScale(.5)
        })
        levelOne.on('pointerup', ()=>{
            //levelOne.setScale(1)
            this.scene.switch('levelone');
            this.music.stop();
        })
        
        levelTwo.setInteractive()
        levelTwo.on('pointerdown', ()=>{
            //levelTwo.setScale(.5)
        })
        levelTwo.on('pointerup', ()=>{
            //levelTwo.setScale(1)
            this.scene.switch('leveltwo');
            this.music.stop();
        })
        
        levelThree.setInteractive()
        levelThree.on('pointerdown', ()=>{
            //levelThree.setScale(.5)
        })
        levelThree.on('pointerup', ()=>{
            //levelThree.setScale(1)
            this.scene.switch('levelthree');
            this.music.stop();
        })
        
        levelFour.setInteractive()
        levelFour.on('pointerdown', ()=>{
            //levelFour.setScale(.5)
        })
        levelFour.on('pointerup', ()=>{
            //levelFour.setScale(1)
            this.scene.switch('bounceTest');
            this.music.stop();
        })
        
        levelFive.setInteractive()
        levelFive.on('pointerdown', ()=>{
            //levelFive.setScale(.5)
        })
        levelFive.on('pointerup', ()=>{
            //levelFive.setScale(1)
            this.scene.switch('bonus2');
            this.music.stop();
        })

        bonusButton.setInteractive()
        bonusButton.on('pointerdown', ()=>{
            //bonusButton.setScale(.5)
        })
        bonusButton.on('pointerup', ()=>{
            //bonusButton.setScale(1)
            this.scene.switch('levelnew');
            this.music.stop();
        })

        // levelSix.setInteractive()
        // levelSix.on('pointerdown', ()=>{
        //     //levelFive.setScale(.5)
        // })
        // levelSix.on('pointerup', ()=>{
        //     //levelSix.setScale(1)
        //     this.scene.switch('congrats');
        //     this.music.stop();
        // })

    }//end create

    update(){

    }//end update
}//end title scene