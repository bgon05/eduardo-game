window.onload = function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const screens = ["maingame", "paycheckscreen"]; 
    let currentScreen = screens[0]; // start w/ main game
    const paycheckPhoto = new Image();
    paycheckPhoto.src = "assets/paycheckscreen.webp";
    paycheckPhoto.onload = () => console.log("paycheckPhoto loaded");

    canvas.width = 1300;
    canvas.height = 600;

    let keys = {};
    let gameLoaded = false;

    window.addEventListener("keydown", (e) => (keys[e.code] = true));
    window.addEventListener("keyup", (e) => (keys[e.code] = false));
    window.addEventListener("death", (e) => showDeathAchievement());
    window.addEventListener("paycheck", (e) => showPaycheckScreen());

    const player = new Player(50, 300, 50, 70);

    const platforms = [
        //base platform
        new Platform(0, 550, 1000, 50),
        // main platforms
        new Platform(300, 400, 700, 10),        
        //first platform
        new Platform(100, 475, 100, 5),
        //additional platforms
        new Platform(300, 250, 100, 5),
        new Platform(300, 100, 100, 5),
        new Platform(500, 325, 100, 5),
        new Platform(500, 50, 100, 5),
        new Platform(500, 175, 100, 5),
        new Platform(700, 250, 100, 5),
        new Platform(900, 175, 100, 5),   
        //paycheck platform
        new Platform(650, 0, 150, 10),
    ];
    const mainplatforms = [
        platforms[1],
    ]
    const smallplatforms = [
        platforms[3],
        platforms[4],
        platforms[5],
        platforms[6],
        platforms[7],
        platforms[8],
        platforms[9],
    ]

    const winnerplatform = [
        platforms[10],
    ]

    // only spawn bro in the main platforms
    const pjwplatform = mainplatforms[Math.floor(Math.random() * mainplatforms.length)];
    // spawn chicken on the small ones
    const chickenplatform = smallplatforms[Math.floor(Math.random() * smallplatforms.length)];
    // spawn paycheck on the paycheck platform
    const paycheckplatform = winnerplatform[Math.floor(Math.random() * winnerplatform.length)];

    const enemies = [
        new Enemy(chickenplatform.x, chickenplatform.y - 45, 75, 45, "chicken"),
        new Enemy(pjwplatform.x + pjwplatform.width / 2, pjwplatform.y - 140, 40, 140, "pjwashington"),
        //add misalchicha as boss
    ];

    const paychecks = [
        new Paycheck(paycheckplatform.x - 60 + paycheckplatform.width / 2, paycheckplatform.y - 60, 120, 60, "paycheck"),
    ];

    let cameraX = 0;
    let cameraY = 0;

    function showAchievement() {
        const achievement = document.getElementById('achievement');
        if (achievement) {
            achievement.style.display = 'block';
            console.log("Achievement displayed");
            setTimeout(() => {
                achievement.style.display = 'none';
                console.log("Achievement hidden");
            }, 4500); // hides after x seconds
        } else {
            console.error("Achievement element not found");
        }
    }

    function showDeathAchievement() {
        const deathAchievement = document.getElementById('death-achievement');
        if (deathAchievement) {
            deathAchievement.style.display = 'block';
            console.log("Achievement displayed");
            setTimeout(() => {
                deathAchievement.style.display = 'none';
                console.log("Achievement hidden");
            }, 3300); // hides after x seconds
        } else {
            console.error("Achievement element not found");
        }
    }
    function showPaycheckScreen() {
        currentScreen = screens[1];
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // render different screens
        switch (currentScreen) {
            case "maingame": // maingame
            player.update(keys, platforms, enemies, paychecks);

            // Update camera position based on player position
            cameraX = player.x - canvas.width / 2 + player.width / 2;
            cameraY = player.y - canvas.height / 2 + player.height / 2;
    
            // Draw player and adjust for camera position
            player.draw(ctx, cameraX, cameraY);
    
            // Draw platforms and adjust for camera position
            platforms.forEach((platform) => {
                platform.draw(ctx, cameraX, cameraY);
            });
    
            // Draw enemies and adjust for camera position
            enemies.forEach((enemy) => {
                enemy.update();
                enemy.draw(ctx, cameraX, cameraY);
            });
    
            // Draw paychecks and adjust for camera position
            paychecks.forEach((paycheck) => {
                paycheck.draw(ctx, cameraX, cameraY);
            });
    
            if (!gameLoaded) {
                showAchievement();
                gameLoaded = true;
            }
    
            requestAnimationFrame(gameLoop);
            break;
            case "paycheckscreen":
            ctx.drawImage(paycheckPhoto, 0, 0, canvas.width, canvas.height);
            break;
        }
        
    }

    gameLoop();
};

