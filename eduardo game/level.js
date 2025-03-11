class Level {
    constructor(number, platforms, enemies, paychecks, mainplatforms, smallplatforms, winnerplatform) {
        this.platforms = platforms;
        this.enemies = enemies;
        this.paychecks = paychecks;
        this.mainplatforms = mainplatforms;
        this.smallplatforms = smallplatforms;
        this.winnerplatform = winnerplatform;
        this.number = number;
        
        // specific level set up
        switch (this.number) {
            case 1: // level 1 (add extra platforms)
        // only spawn bro in the main platforms
            this.pjwplatform = this.mainplatforms[Math.floor(Math.random() * this.mainplatforms.length)];
        // spawn chicken on the small ones
            this.chickenplatform = this.smallplatforms[Math.floor(Math.random() * this.smallplatforms.length)];
        // spawn paycheck on the paycheck platform
          this.paycheckplatform = this.winnerplatform[Math.floor(Math.random() * this.winnerplatform.length)];
          this.enemies[0].x = this.chickenplatform.x; // chicken
          this.enemies[0].y = this.chickenplatform.y - 45;
          this.enemies[0].startx = this.enemies[0].x
          this.enemies[0].starty = this.enemies[0].y

          this.enemies[1].x = this.pjwplatform.x + this.pjwplatform.width / 2; // pj washington
          this.enemies[1].y = this.pjwplatform.y - 140;
          this.enemies[1].startx = this.enemies[1].x;
          this.enemies[1].starty = this.enemies[1].y
         // paycheck
          this.paychecks[0].x = (this.paycheckplatform.x + 15); // put it in the middle of the platform
          this.paychecks[0].y = this.paycheckplatform.y - 80;
                break;
        }

    }
}