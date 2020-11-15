class OverlayScene extends Phaser.Scene {
    constructor(){
        super('overlay')
    }

    preload(){
        console.log("Overlay scene");
    }//end preload

    create(){
        //Adding timer
        this.timer = this.time.addEvent({              
            loop: false,
            repeat: 1000000,
            startAt: 0,
            paused: false
            });

        //Adding time text at the top
        this.timetextnormal = this.add.text(10,10, 'Time: ');
        this.timetextnormal.setScrollFactor(0);

        this.timeText = this.add.text(70, 10, elapsed)
        this.timeText.setScrollFactor(0);

        //Adding deathcount to top left
        this.deathcounttextnormal = this.add.text(600,10, 'Death Count: ');
        this.deathcounttextnormal.setScrollFactor(0);

        this.deathcountText = this.add.text(725, 10, deathCount)
        this.deathcountText.setScrollFactor(0);
        // this.timeText.cameraOffset.setTo(100,100);



    }//end create

    update(){
        //Updating timer
        elapsed = this.timer.getElapsedSeconds();
        //console.log(this.timer.getElapsedSeconds());
        
        //Displays time with 2 decimal places
        this.timeText.setText((elapsed).toFixed(2));

        //Displays deathcount
        this.deathcountText.setText(deathCount);

    }//end update
}//end Overlay scene