class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx, cameraX, cameraY) {
        ctx.fillStyle = "brown";
        ctx.fillRect(this.x - cameraX, this.y - cameraY, this.width, this.height);
    }
}

