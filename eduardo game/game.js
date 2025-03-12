window.onload = function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const screens = ["maingame", "paycheckscreen", "titlescreen"]; 
    let currentScreen = screens[2]; // start w/ main game
    const paycheckPhoto = new Image();
    paycheckPhoto.src = "assets/paycheckscreen.webp";
    paycheckPhoto.onload = () => console.log("paycheckPhoto loaded");

    const levels = []; // array of levels
    let currentLevel;
    let levelNum;
    createLevels();
    canvas.width = 1300;
    canvas.height = 600;
    let lastTime = performance.now();
    let deltaTime = 0;

    let keys = {};
    let gameLoaded = false;
    
    window.addEventListener("keydown", (e) => (keys[e.code] = true));
    window.addEventListener("keyup", (e) => (keys[e.code] = false));
    window.addEventListener("death", (e) => showDeathAchievement());
    window.addEventListener("paycheck", (e) => showPaycheckScreen());

    const library = new Library();
    library.loadFiles();
    
    const player = new Player(50, 300, 50, 70, library);

    const backgroundMusic = library.getSound("background");
    backgroundMusic.loop = true;
    const congrats = library.getSound("congrats");

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
        backgroundMusic.pause();
        congrats.play();
        currentScreen = screens[1];
    }
    function createLevels() {
        const platforms = [
            // start platform
            new Platform(0, 550, 1000, 50),
            // main platforms
            new Platform(300, 400, 700, 10),
            new Platform(300, -80, 700, 10),
            // small platforms
            new Platform(100, 475, 100, 5),
            new Platform(300, 250, 100, 5),
            new Platform(300, 100, 100, 5),
            new Platform(500, 325, 100, 5),
            new Platform(500, 50, 100, 5),
            new Platform(500, 175, 100, 5),
            new Platform(700, 250, 100, 5),
            new Platform(700, 60, 100, 5),
            new Platform(900, 175, 100, 5),
            new Platform(800, -200, 100, 5),
            // winner platform
            new Platform(550, -300, 150, 10),
        ];
        const level1 = { // placeholder just to set up the level object
            platforms: platforms,
            enemies: [
                new Enemy(0, 0, 75, 45, "chicken"), // x and y are placeholders, check level.js for extra set up code
                new Enemy(0, 0, 40, 140, "pjwashington"), // same for this one
                new Enemy(0, 0, 40, 140, "pjwashington"),
                //add misalchicha as boss
            ],
            paychecks: [
                new Paycheck(0, 0, 120, 70, "paycheck"), // check level.js for extra set up code
            ],
            mainplatforms: [
                platforms[1],
                platforms[2]
            ],
            smallplatforms: [
                platforms[4],
                platforms[5],
                platforms[6],
                platforms[7],
                platforms[8],
                platforms[9],
                platforms[10],
                platforms[11],
                platforms[12]
            ],
            winnerplatform: [
                platforms[13],
            ]
        };
        const levelone = new Level(1, level1.platforms, level1.enemies, level1.paychecks, level1.mainplatforms, level1.smallplatforms, level1.winnerplatform);
        levels.push(levelone);
        currentLevel = levels[0];
        levelNum = 0;
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const now = performance.now();
        deltaTime = (now - lastTime) / 1000; // Convert to seconds
        lastTime = now;
        //console.log(`Delta Time: ${deltaTime.toFixed(4)} seconds`);
        // render different screens
        switch (currentScreen) {
            case "maingame": // maingame
            player.update(keys, currentLevel.platforms, currentLevel.enemies, currentLevel.paychecks, deltaTime);

            // Update camera position based on player position
            cameraX = player.x - canvas.width / 2 + player.width / 2;
            cameraY = player.y - canvas.height / 2 + player.height / 2;
    
            // Draw player and adjust for camera position
            player.draw(ctx, cameraX, cameraY);
    
            // Draw platforms and adjust for camera position
            currentLevel.platforms.forEach((platform) => {
                platform.draw(ctx, cameraX, cameraY);
            });
    
            // Draw enemies and adjust for camera position
            currentLevel.enemies.forEach((enemy) => {
                enemy.update(deltaTime);
                enemy.draw(ctx, cameraX, cameraY);
            });
    
            // Draw paychecks and adjust for camera position
            currentLevel.paychecks.forEach((paycheck) => {
                paycheck.draw(ctx, cameraX, cameraY);
            });
    
            if (!gameLoaded) {
                showAchievement();
                gameLoaded = true;
            }
   
            break;
            case "paycheckscreen":
            ctx.drawImage(paycheckPhoto, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.font = "25px sans-serif";
            ctx.fillText("Press Space to Continue", canvas.width -285, canvas.height-5, 500);
            if (keys["Space"] || keys["ArrowUp"] || keys["KeyW"]) {
                ctx.fillStyle = "black";
                ctx.font = "10px sans-serif";
                backgroundMusic.play();
                player.respawn();
                levelNum++;
                currentLevel = levels[levelNum];
                currentScreen = screens[0];
            }
            break;
            case "titlescreen":
                if (keys["Space"] || keys["ArrowUp"] || keys["KeyW"]) {
                    currentScreen = screens[0];
                    backgroundMusic.play();
                }
                ctx.fillText("Eduardo's Very Nice Game", canvas.width / 2, canvas.height / 2, 100);
                ctx.fillText("Press Space to Begin", canvas.width / 2, (canvas.height / 2) + 150);
                 // THIS MAKES IT SO THE KEYS REGISTER!!
            break;
        }
        requestAnimationFrame(gameLoop);
        
    }

    gameLoop();

};


