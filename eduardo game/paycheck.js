class Paycheck {
    constructor(x, y, width, height, type) {
        this.x = x;
        this.startx = x;
        this.y = y;
        this.starty = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.imageLoaded = false;

        if (type == "paycheck") {
            this.image = new Image();
        this.image.src = "assets/paycheck.png";
        // Set the imageLoaded flag to true when the image is fully loaded
        this.image.onload = () => {
            this.imageLoaded = true;
        };
        }
    }

    draw(ctx, cameraX, cameraY) {
        // Only draw the image if it is fully loaded
        if (this.imageLoaded) {
            ctx.drawImage(this.image, this.x - cameraX, this.y - cameraY, this.width, this.height);
        }
    }
}
