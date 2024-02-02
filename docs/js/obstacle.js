class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 70;
    this.height = 80;
    this.left = Math.floor(Math.random() * 300 + 70);
    this.top = 0;

    const enemyImages = [
      "docs/images/flamingo.png",
      "docs/images/katakuri.png",
      "docs/images/blackbeard.png",
    ];
    const foodImages = [
      "docs/images/fruit.png",
      "docs/images/meat.png",
      "docs/images/soup.png",
    ];

    const isEnemy = Math.random() < 0.5;
    //  one liner if statement( widely used in python )
    //  New Variable  =  condition ? ifTrue : ifFalse 
    const imagesArray = isEnemy ? enemyImages : foodImages;

    const randomArrayElementIndex = Math.floor(
      Math.random() * imagesArray.length
    );
    const randomArrayElement = imagesArray[randomArrayElementIndex];

    this.element = document.createElement("img");
    this.element.src = randomArrayElement;
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
    this.move();
  }

  move() {
    this.top += 3;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
console.log("Game started!");
