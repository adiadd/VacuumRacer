class InstructionsScene extends Phaser.Scene {
    constructor(){
        super('instructions')
    }

    preload(){
        console.log("instructions scene");
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.image('back', 'assets/backButton.png');
        this.load.image('instructionsButton', 'assets/instructionsButton.png');
    }//end preload

    create(){
        let sb = this.add.image(400,300,'bg');
        let backButton = this.add.image(50,100,'back');
        let instructionsButton = this.add.image(400,100,'instructionsButton').setScale(1.5);

        backButton.setInteractive()
        backButton.on('pointerdown', ()=>{
            backButton.setScale(.5)
        })
        backButton.on('pointerup', ()=>{
            backButton.setScale(1)
            this.scene.switch('titleScene')
        })
    }//end create

    update(){

    }//end update
}//end title scene