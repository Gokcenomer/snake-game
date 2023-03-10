window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const WIDTH = 600;
  const HEIGHT = 400;
  const blockSize = 20;
  let isOver = false;

  let direction = "left";
  let fruitX = 480;
  let fruitY = 320;

  let snakeX = 300;
  let snakeY = 200;

  let snakeBody = [];

  window.addEventListener("keyup", (e) => {
    if (e.key == "w") {
      if (direction == "down") return;
      direction = "up";
    }
    if (e.key == "a") {
      if (direction == "right") return;
      direction = "left";
    }
    if (e.key == "s") {
      if (direction == "up") return;
      direction = "down";
    }
    if (e.key == "d") {
      if (direction == "left") return;
      direction = "right";
    }
  });

  setInterval(update, 1000 / 10);

  function generateFruit() {
    const maxCols = Math.floor(WIDTH / blockSize);
    const maxRows = Math.floor(HEIGHT / blockSize);
    fruitX = Math.floor(Math.random() * maxCols) * blockSize;
    fruitY = Math.floor(Math.random() * maxRows) * blockSize;
  }

  function update() {
    if (!isOver) {
      ctx.fillStyle = "black";
      ctx.fillRect(10, 10, WIDTH, HEIGHT);

      ctx.fillStyle = "red";
      ctx.fillRect(fruitX, fruitY, blockSize, blockSize);

      ctx.fillStyle = "green";
      ctx.fillRect(snakeX, snakeY, blockSize, blockSize);

      if (direction == "left") {
        snakeX -= 1 * blockSize;
      }
      if (direction == "up") {
        snakeY -= 1 * blockSize;
      }
      if (direction == "right") {
        snakeX += 1 * blockSize;
      }
      if (direction == "down") {
        snakeY += 1 * blockSize;
      }
      if (snakeX == fruitX && snakeY == fruitY) {
        snakeBody.push([fruitX, fruitY]);
        generateFruit();
      }
      for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i][0] = snakeBody[i - 1][0];
        snakeBody[i][1] = snakeBody[i - 1][1];
      }
      if (snakeBody.length > 0) {
        snakeBody[0][0] = snakeX;
        snakeBody[0][1] = snakeY;
      }

      snakeBody.forEach((part, index) => {
        ctx.fillStyle = "green";
        ctx.fillRect(part[0], part[1], blockSize, blockSize);

        if (index > 0 && part[0] == snakeX && part[1] == snakeY) {
          isOver = true;
        }
      });

      if (snakeX > WIDTH || snakeX + 20 < 0 || snakeY < 0 || snakeY > HEIGHT) {
        isOver = true;
      }
    } else {
      clearInterval();
      ctx.fillStyle = "black";
      ctx.fillRect(10, 10, WIDTH, HEIGHT);
    }
  }
};
