class Enemy {
    constructor(x, y, width, height, type) {
        this.x = x;
        this.startx = null;
        this.y = y;
        this.starty = null;
        this.width = width;
        this.height = height;
        this.speed = 3 * 35;
        this.direction = 1;
        this.type = type;
        this.imageLoaded = false;

        if (type == "chicken") {
            this.image = new Image();
        this.image.src = "assets/chicken.png";
        // Set the imageLoaded flag to true when the image is fully loaded
        this.image.onload = () => {
            this.imageLoaded = true;
        };
        }
        else if (type == "pjwashington") {
            this.image = new Image();
            this.speed = 6 * 35; // pj washington is faster than eduardo
            this.image.src = "assets/pjwashington.png";
            // Set the imageLoaded flag to true when the image is fully loaded
            this.image.onload = () => {
                this.imageLoaded = true;
            };
        }

        
    }

    update(deltaTime) {
        this.x += (this.speed * deltaTime) * this.direction;

        if (this.type == "chicken") {
            if (this.x <= this.startx) this.direction = 1;
            if (this.x >= this.startx+100) this.direction = -1;
        }
        else if (this.type == "pjwashington") {
            if (this.x <= this.startx-350) this.direction = 1;
            if (this.x >= this.startx+300) this.direction = -1;
        }
        
    }

    draw(ctx, cameraX, cameraY) {
        // Only draw the image if it is fully loaded
        if (this.imageLoaded) {
            ctx.drawImage(this.image, this.x - cameraX, this.y - cameraY, this.width, this.height);
        }
    }
}
