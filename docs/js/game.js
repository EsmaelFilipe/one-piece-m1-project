class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameWinScreen = document.getElementById("game-win");
    this.gameEndScreen = document.getElementById("game-end");
    this.animationSpeed = 6;
    this.eatingSound = null;
    this.losingSound = null;
    this.introSound = null;
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      70,
      90,
      "docs/images/new luffy.png"
    );
    this.height = 800;
    this.width = 700;

    // an empty array for obstacles
    this.obstacles = []; 
    this.score = 0;
    this.lives = 3;
    this.isPushingObstacle = false;
    this.gameIsOver = false;
    this.soundtrack = null;

    // capture the time the last/first obstacle was released
    this.lastObstacleSpawnTime = Date.now();
    
    // this variable sets the interval in which the obstacles  appear in the screen
    this.obstacleSpawnInterval = 3000;
  }
  // sound effect
  introSoundEffect() {
    this.introSound = document.getElementById("intro");
    this.introSound.play();
  }
  losingSoundEffect() {
    this.losingSound = document.getElementById("losing");
    this.losingSound.play();
  }
  eatingSoundEffect() {
    this.eatingSound = document.getElementById("eating");
    this.eatingSound.play();
  }
  // Function to create a certain number of obstacles
  createEnemy(numObstacles) {
    for (let i = 0; i < numObstacles; i++) {
      const obstacle = new Obstacle(this.gameScreen);
      this.obstacles.push(obstacle);
    }
  }
  // Increase background sliding speed
  increaseObstacleSpeed() {
    this.animationSpeed -= 3;
    if (this.animationSpeed < 2) {
      this.animationSpeed = 2;
    }
  }
  // Animation speed
  updateAnimationSpeed() {
    const keyframes = `slide ${this.animationSpeed}s linear infinite`;
    this.gameScreen.style.animation = keyframes;
  }
  start() {
    // Hide the intro screen
    this.startScreen.style.display = "none";
    // Show the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.display = "block";
    // Start game soundEffect
    this.introSoundEffect();
    // Start the game loop
    this.gameLoop();
  }
  gameLoop() {
    if (this.gameIsOver) {
      return;
    }
    this.update();
    window.requestAnimationFrame(() => this.gameLoop());
  }
  update() {
    let score = document.getElementById("score");
    let lives = document.getElementById("lives");
    this.player.move();

    // Check when to give new obstacles
    // currentTime variable will capture the "now" time
    const currentTime = Date.now();
    if (
      // example:
      // 500        -          100      =      400
      //
      currentTime - this.lastObstacleSpawnTime >=
      // is set 300
      this.obstacleSpawnInterval
    ) {
      // we release new enemy (2, in this case)
      this.createEnemy(2);
      // and now we assign  lastObs to current time
      this.lastObstacleSpawnTime = currentTime;
    }

    // for loop to iterate over the obstacles array
    for (let i = 0; i < this.obstacles.length; i++) {
      // create a variable to store the iterated element in the array
      const obstacle = this.obstacles[i];

      obstacle.move();
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        if (
          // accessing the src of the element in the obstacles array
          // using the variable obstacle because its the variable used to iterate over the array
          obstacle.element.src.includes("flamingo") ||
          obstacle.element.src.includes("katakuri") ||
          obstacle.element.src.includes("blackbeard")
        ) {
          // here we we introduce the "losing life sound"
          // and then  reduce the life
          this.losingSoundEffect();
          this.lives--;
          // If no lives left, end the game
          if (this.lives <= 0) {
            // we call the endGame function
            this.endGame();
            return; // Exit the function to stop the game loop
          }
        } else if (
          obstacle.element.src.includes("meat") ||
          obstacle.element.src.includes("soup") ||
          obstacle.element.src.includes("spaghetti")
        ) {
          this.eatingSoundEffect();
          this.score += 5;
        }
      } else if (obstacle.top > this.height) {
        // Check if the obstacle is beyond the screen and remove if so
        obstacle.element.remove();
      }
    }

    // set the winning condition
    if (this.score >= 50) {
      this.winGame();
    }

    // set the losing condition
    if (this.lives <= 0) {
      this.endGame();
    }

    // Condition to
    if (this.score % 10 === 0 && this.score > 0 && !this.isPushingObstacle) {
      this.increaseObstacleSpeed();

      // here i decided to create more enemy after every 5 points
      setTimeout(() => {
        this.obstacles.push(new Obstacle(this.gameScreen));
      }, 80000);
      this.updateAnimationSpeed();
    }

    if (!this.obstacles.length && !this.isPushingObstacle) {
      this.isPushingObstacle = true;
      setTimeout(() => {
        this.obstacles.push(new Obstacle(this.gameScreen));
        this.isPushingObstacle = false;
      }, 100);
    }
    score.innerHTML = this.score;
    lives.innerHTML = this.lives;
  }
  winGame() {
    console.log("Inside winGame", this.score);
    {
      this.gameIsOver = true;
      this.player.element.remove();
      this.obstacles.forEach((obstacle) => {
        obstacle.element.remove();
      });
      // Display the win-game screen
      this.gameScreen.style.display = "none";
      this.gameWinScreen.style.display = "block";
    }
  }
  // this is the end-game class
  endGame() {
    this.gameIsOver = true;
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
    const highestScore = localStorage.getItem("highestScore");
    if (highestScore && this.score > highestScore) {
      localStorage.setItem("highestScore", this.score);
    }
  }
}
