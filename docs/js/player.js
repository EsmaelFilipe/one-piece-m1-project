class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    //gameScreen HTML element
    this.gameScreen = gameScreen;

    //position values
    this.left = left;
    this.top = top;

    //player dimensions
    this.width = width;
    this.height = height;

    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";

    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.directionX = 0;
    this.directionY = 0;

    this.gameScreen.appendChild(this.element);
  }
  move() {
    // updating  the  function
    this.left += this.directionX;
    this.top += this.directionY;

    // this is to handle the right side of the screen: car stops in the right border of the game screen
    if (this.left + this.width > this.gameScreen.offsetWidth) {
      this.left = this.gameScreen.offsetWidth - this.width;

    // this is to handle the left side of the screen: Makes the car stop at the left side 
    } else if (this.left <= 0) {
      this.left = 0;
    }

    // Handle the bottom side of the  screen: car stops in the tolp border of the the game screen 
    if( this.top + this.height > this.gameScreen.offsetHeight){
      this.top = this.gameScreen.offsetHeight - this.height;
    }


    // Handle top side of the screen: car stops in the  top border of the game screen
    else if( this.top <= 0){
      this.top = 0;
    }
    this.updatePosition();
  }

  updatePosition() {
    // updating the css
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
