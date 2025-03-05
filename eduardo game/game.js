window.onload = function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 400;

    let keys = {};

    window.addEventListener("keydown", (e) => (keys[e.code] = true));
    window.addEventListener("keyup", (e) => (keys[e.code] = false));

    const player = new Player(50, 300, 40, 40);
    const platforms = [new Platform(0, 350, 800, 50)];
    const enemies = [new Enemy(600, 310, 40, 40)];

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        player.update(keys, platforms);
        player.draw(ctx);

        platforms.forEach((platform) => {
            platform.draw(ctx);
        });

        enemies.forEach((enemy) => {
            enemy.update();
            enemy.draw(ctx);
        });

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
};
