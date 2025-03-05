class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpPower = 10;
        this.gravity = 0.5;
        this.onGround = false;
    }

    update(keys, platforms) {
        this.velocityY += this.gravity;

        if (keys["ArrowLeft"]) this.velocityX = -this.speed;
        else if (keys["ArrowRight"]) this.velocityX = this.speed;
        else this.velocityX = 0;

        if (keys["Space"] && this.onGround) {
            this.velocityY = -this.jumpPower;
            this.onGround = false;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        this.onGround = false;
        platforms.forEach((platform) => {
            if (
                this.y + this.height > platform.y &&
                this.y + this.height - this.velocityY <= platform.y &&
                this.x + this.width > platform.x &&
                this.x < platform.x + platform.width
            ) {
                this.y = platform.y - this.height;
                this.velocityY = 0;
                this.onGround = true;
            }
        });
    }

    draw(ctx) {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
