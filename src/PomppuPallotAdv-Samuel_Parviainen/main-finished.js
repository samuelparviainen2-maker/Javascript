// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const paragraph = document.getElementById("para");
let ballcount = 0;
// function to generate random number

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}



class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY);
        this.color = color;
        this.size = size;
        this.exists = true;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();

    }

    update() {
        if (this.x + this.size >= width) {
            this.velX = -Math.abs(this.velX);
        }

        if (this.x - this.size <= 0) {
            this.velX = Math.abs(this.velX);
        }

        if (this.y + this.size >= height) {
            this.velY = -Math.abs(this.velY);
        }

        if (this.y - this.size <= 0) {
            this.velY = Math.abs(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (this !== ball && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20);
        this.color = "white";
        this.size = 10;
    }

    draw() {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    checkBounds() {
        if (this.x - this.size < 0) {
            this.x = this.size;
        } else if (this.x + this.size > width) {
            this.x = width - this.size;
        }

        if (this.y - this.size < 0) {
            this.y = this.size;
        } else if (this.y + this.size > height) {
            this.y = height - this.size;
        }
    }

    collisionDetect() {
        for (const ball of balls) {
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.exists = false;
                    ballcount--;
                }
            }
        }
    }
}

const balls = [];

while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        random(size, width - size),
        random(size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size
    );
    ballcount++;
    balls.push(ball);
}

const evilCircle = new EvilCircle(random(0, width), random(0, height));

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        if (ball.exists) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    }

    for (let i = balls.length - 1; i >= 0; i--) {
        if (!balls[i].exists) {
            balls.splice(i, 1);
        }
    }

    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();

    requestAnimationFrame(loop);

    paragraph.textContent = ballcount;
}

window.addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
        case "a":
            evilCircle.x -= evilCircle.velX;
            break;
        case "d":
            evilCircle.x += evilCircle.velX;
            break;
        case "w":
            evilCircle.y -= evilCircle.velY;
            break;
        case "s":
            evilCircle.y += evilCircle.velY;
            break;
    }
});

loop();
