class Enemy {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 2;
        this.direction = 1;
    }

    update() {
        this.x += this.speed * this.direction;

        if (this.x <= 500) this.direction = 1;
        if (this.x >= 700) this.direction = -1;
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
