class PerformanceScene extends Phaser.Scene {
    constructor(){
        super('performance')
    }

    preload(){
        console.log("Performance scene");
        this.load.image('bg', 'assets/spacebg.jpg');
        this.load.image('menuButton', 'assets/menuButton.png');
        this.load.image('nextLevel', 'assets/nextLevel.png');
    }//end preload

    create(){
        let sb = this.add.image(400,300,'bg');
        let menuButton = this.add.image(50,100,'menuButton');
        let nextLevel = this.add.image(400,100,'nextLevel').setScale(1.5);

        menuButton.setInteractive()
        menuButton.on('pointerdown', ()=>{
            menuButton.setScale(.5)
        })
        menuButton.on('pointerup', ()=>{
            menuButton.setScale(1)
            this.scene.switch('titleScene')
        })

        nextLevel.setInteractive()
        nextLevel.on('pointerdown', ()=>{
            nextLevel.setScale(.5)
        })
        nextLevel.on('pointerup', ()=>{
            nextLevel.setScale(1)
            this.scene.switch('titleScene')
        })
    }//end create

    update(){

    }//end update
}//end title scene