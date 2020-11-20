class CreditsScene extends Phaser.Scene {
    constructor(){
        super('credits')
    }

    preload(){
        console.log("credits scene");
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.image('back', 'assets/backButton.png');
        this.load.image('creditsButton', 'assets/creditsButton.png');
    }//end preload

    create(){
        let sb = this.add.image(400,300,'bg');
        let backButton = this.add.image(50,100,'back');
        let creditsButton = this.add.image(400,100,'creditsButton').setScale(1.5);

        backButton.setInteractive()
        backButton.on('pointerdown', ()=>{
            //backButton.setScale(.5)
        })
        backButton.on('pointerup', ()=>{
            //backButton.setScale(1)
            this.scene.switch('titleScene')
        })

        this.add.text(70, 165, 'Game developed by MAU Developers', {fontSize: "35px"});
        this.add.text(30, 260, 'Developers: ', {fontSize: "25px", strokeThickness: "2"});
        this.add.text(250, 265, 'Matthew Evans', {fontSize: "20px"});
        this.add.text(250, 285, 'Aditya Addepalli', {fontSize: "20px"});
        this.add.text(250, 305, 'Uzair Saleem', {fontSize: "20px"});
        this.add.text(30, 350, 'Music:  ', {fontSize: "25px", strokeThickness: "2"});
        this.add.text(250, 355, 'David Trap', {fontSize: "20px"});
        this.add.text(30, 400, 'Fonts:  ', {fontSize: "25px", strokeThickness: "2"});
        this.add.text(250, 405, 'QD Fonts on fontspace.com', {fontSize: "20px"});
        this.add.text(30, 450, 'Artwork:  ', {fontSize: "25px", strokeThickness: "2"});
        this.add.text(250, 455, 'Matthew Evans', {fontSize: "20px"});
        this.add.text(250, 475, 'Aditya Addepalli', {fontSize: "20px"});
        this.add.text(30, 520, 'Design:  ', {fontSize: "25px", strokeThickness: "2"});
        this.add.text(250, 525, 'Matthew Evans', {fontSize: "20px"});
        this.add.text(250, 545, 'Uzair Saleem', {fontSize: "20px"});
    }//end create

    update(){

    }//end update
}//end title scene