//Helper function for random speed
function speedRnd(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += dt * this.speed;
    } else {
        this.x = -100;
        this.speed = speedRnd(100, 500);
    }

// Handlilng collisions of the enemy and the player
    if ((this.x + 60) > player.x && this.x < (player.x + 60) && this.y === player.y) {
        debugger;
        player.x = 202;
        player.y = 390;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 390;
}

Player.prototype.update = function() {
    switch (true) {
        case this.x < 0:
            this.x = 0;
            break;
        case this.x > 404:
            this.x = 404;
            break;
        case this.y > 390:
            this.y = 390;
            break;

// Winning case
        case this.y < 38:
            this.y = 390;
            this.x = 202;
            break;
    }
};

// Borrow render method from Emeny's class
Player.prototype.render = function() {
    Enemy.prototype.render.call(this);
};

// Map Player movement to keyboard arrow buttons
Player.prototype.handleInput = function(keyCode) {
    switch(keyCode) {
        case 'left':
            this.x -= 101;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'down':
            this.y += 83;
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(0, 58, speedRnd(100, 500)),
    new Enemy(0, 58+83, speedRnd(100, 500)),
    new Enemy(-101, 58+83*2, speedRnd(100, 500))
];

var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});