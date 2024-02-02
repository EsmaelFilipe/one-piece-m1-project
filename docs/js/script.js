// this is the  file where the user has a conection with the game logic

window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const restartButton2 = document.getElementById("restart-button2");
  
  let game;
  startButton.addEventListener("click", function () {
    startGame();
  });

  
  restartButton.addEventListener("click",function(){
    // JS, in the current tab, is going to refresh(reload) the page
    location.reload();
  })
  restartButton2.addEventListener("click",function(){
    // JS, in the current tab, is going to refresh(reload) the page
    location.reload();
  })

  function startGame() {
    //console.log("start game");
    game = new Game();
    game.start();
  }

  function handleKeydown() {
    const key = event.key;
    const possiblekeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
    if (possiblekeys.includes(key)) {
      event.preventDefault();

      if (game) {
        switch (key) {
          case "ArrowLeft":
            game.player.directionX = -5; // 5px per frame 
            break;
          case "ArrowUp":
            game.player.directionY = -5; // 5px per frame 
            break;
          case "ArrowRight":
            game.player.directionX = 5; // 5px pre frame 
            break;
          case "ArrowDown":
            game.player.directionY = 5; //
            break;
        }
      }
    }
  }

  function handleKeyUp() {
    const key = event.key;
    const possiblekeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
    if (possiblekeys.includes(key)) {
      event.preventDefault();

      if (game) {
        switch (key) {
          case "ArrowLeft":
            game.player.directionX = 0;
            break;
          case "ArrowUp":
            game.player.directionY = 0;
            break;
          case "ArrowRight":
            game.player.directionX = 0;
            break;
          case "ArrowDown":
            game.player.directionY = 0;
            break;
        }
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyUp);
};
