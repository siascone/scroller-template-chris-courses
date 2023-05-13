import platform from './images/platform.png';
console.log(platform)

const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight

console.log(c);

const gravity = 1.5;

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.width = 30;
        this.height = 30;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    };

    update() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
    }
}

class Platform {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        };
        this.width = 200;
        this.height = 20;
    };

    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const player = new Player();
const platforms = [
    new Platform({
        x: 200,
        y: 100
    }), 
    new Platform({
        x: 500,
        y: 200
    })
];


const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffSet = 0;

function animate () {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update();
    platforms.forEach(platform => platform.draw());
    // move left/right
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffSet += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            });
        } else if (keys.left.pressed) {
            scrollOffSet -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            });
        } 
    }

    // land on platform (collision detection)
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
        }
    });

    // work on not being able to jump through platforms
    // if (player.position.y >= platform.position.y + platform.height) {
    //     player.velocity.y = 20
    // }

    if (scrollOffSet > 2000) {
        console.log('you win!')
    }
    
}

animate()

window.addEventListener('keydown', ({ keyCode }) => {
    // w => 87
    // a => 65
    // s => 83
    // d => 68

    switch(keyCode) {
        case 87:
            // console.log('up')
            player.velocity.y -= 20;
            break; 
        case 38:
            // console.log('up')
            player.velocity.y -= 20;
            break;
        case 65:
            // console.log('left')
            keys.left.pressed = true
            break;
        case 37:
            // console.log('left')
            keys.left.pressed = true
            break;
        case 83:
            // console.log('down')
            break; 
        case 40:
            // console.log('down')
            break; 
        case 68:
            // console.log('right')
            keys.right.pressed = true
            break;
        case 39:
            // console.log('right')
            keys.right.pressed = true
            break;
    }
    console.log(keyCode)
})

window.addEventListener('keyup', ({ keyCode }) => {
    // w => 87
    // a => 65
    // s => 83
    // d => 68

    switch (keyCode) {
        case 87:
            // console.log('up')
            player.velocity.y = -20;
            break;
        case 38:
            // console.log('up')
            player.velocity.y = -20;
            break;
        case 65:
            // console.log('left')
            keys.left.pressed = false
            break;
        case 37:
            // console.log('left')
            keys.left.pressed = false
            break;
        case 83:
            // console.log('down')
            break;
        case 40:
            // console.log('down')
            break;
        case 68:
            // console.log('right')
            keys.right.pressed = false
            break;
        case 39:
            // console.log('right')
            keys.right.pressed = false
            break;
    }

})