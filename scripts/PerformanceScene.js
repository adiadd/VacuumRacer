class PerformanceScene extends Phaser.Scene {
    constructor(){
        super('performance')
    }

    preload(){
        console.log("Performance scene");
        

        //images
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.image('menuButton', 'assets/menuButton.png');
        this.load.image('nextLevel', 'assets/nextLevel.png');
    }//end preload

    create(){
        let sb = this.add.image(400,300,'bg');
        let menuButton = this.add.image(200,475,'menuButton').setScale(.35);
        let nextLevel = this.add.image(550,470,'nextLevel').setScale(.35);

        menuButton.setInteractive()
        menuButton.on('pointerdown', ()=>{
            //menuButton.setScale(.5)
        })
        menuButton.on('pointerup', ()=>{
            //menuButton.setScale(1)
            this.scene.switch('titleScene')
        })

        nextLevel.setInteractive()
        nextLevel.on('pointerdown', ()=>{
            //nextLevel.setScale(.5)
        })
        nextLevel.on('pointerup', ()=>{
            //nextLevel.setScale(1)
            this.scene.switch('levelone')
        })

        this.add.text(250, 100, 'Some quick stats:', {fontSize: "50px", color: "gray", fontFamily: "Edge Of The Galaxy"});
        this.add.text(150, 250, 'Time to complete: ', {fontSize: "35px", color: "#00dcff", fontFamily: "Edge Of The Galaxy"});
        this.add.text(150, 320, 'Number of deaths: ', {fontSize: "35px", color: "#00f4f3", fontFamily: "Edge Of The Galaxy"});

        this.add.text(500, 320, deathCount, {fontSize: "35px", color: "#00f4f3", fontFamily: "Edge Of The Galaxy"});
        this.add.text(500, 250, elapsed, {fontSize: "35px", color: "#00f4f3", fontFamily: "Edge Of The Galaxy"});

    }//end create

    update(){

    }//end update
}//end title scene