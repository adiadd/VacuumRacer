class CongratsScene extends Phaser.Scene {
    constructor(){
        super('congrats')
    }

    preload(){
        console.log("Congrats scene");
        
        //images
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.image('menuButton', 'assets/menuButton.png');
    }//end preload

    create(){
        let sb = this.add.image(400,300,'bg');
        let menuButton = this.add.image(400,475,'menuButton').setScale(.35);
        keyNumber++;
        console.log(keyNumber);
        let val = dict[keyNumber];
        console.log(val);

        menuButton.setInteractive()
        menuButton.on('pointerdown', ()=>{
            //menuButton.setScale(.5)
        })
        menuButton.on('pointerup', ()=>{
            //menuButton.setScale(1)
            this.scene.stop('performance');
            this.scene.switch('titleScene');
            deathCount = 0;
        })

        this.add.text(50, 50, 'CONGRATS ON BEATING VACUUM RACER!', {fontSize: "50px", color: "#00dcff", fontFamily: "Edge Of The Galaxy"});
        this.add.text(150, 150, 'Time to complete (sec): ', {fontSize: "35px", color: "#00dcff", fontFamily: "Edge Of The Galaxy"});
        this.add.text(150, 220, 'Number of deaths: ', {fontSize: "35px", color: "#00f4f3", fontFamily: "Edge Of The Galaxy"});
        this.add.text(150, 290, 'Total number of deaths: ', {fontSize: "35px", color: "#808080", fontFamily: "Edge Of The Galaxy"});

        this.add.text(550, 150, elapsed.toFixed(2), {fontSize: "35px", color: "#00f4f3", fontFamily: "Edge Of The Galaxy"});
        this.add.text(550, 220, deathCount, {fontSize: "35px", color: "#00f4f3", fontFamily: "Edge Of The Galaxy"});
        this.add.text(550, 290, deathCountTotal, {fontSize: "35px", color: "#00f4f3", fontFamily: "Edge Of The Galaxy"});

        this.add.text(15,375, 'We hope you enjoyed the game and thanks for playing!', {fontSize: "25px"});

    }//end create

    update(){

    }//end update
}//end title scene