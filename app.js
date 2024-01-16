const lienzo = document.querySelector('#lienzo');
const ctx = lienzo.getContext('2d');

let posX = 2;
let posY = 1;



//fillRect(x, y, ancho, alto)
//ctx.fillRect(0, 0, 20, 20);
const eating = new Audio('./eating-chips-81092.mp3')
const death = new Audio('./male-death-sound-128357.mp3')

function start(){

    posX = 2;
    posY = 1;
    let direccion = 1;

const snake  = [];

snake.push({
    x: 2,
    y: 1,
    xNext: 0,
    yNext: 0,
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('🐌', this.x * 20, this.y * 20);

    }
})
snake.push({
    x: 1,
    y: 1,
    xNext: 2,
    yNext: 1,
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('🟢', this.x * 20, this.y * 20);
    }
})
snake.push({
    x: 0,
    y: 1,
    xNext: 1,
    yNext: 1,
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('🟢', this.x * 20, this.y * 20);
    }
})
return snake;
}

let snake = start();


const comida = {
    x: 0,
    y: 0,
    aparece: function(){
        this.x = Math.floor(Math.random()*25);
        this.y = Math.ceil(Math.random()*15);

    },
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('🍔', this.x * 20, this.y * 20);
    }
    
}

function nextMove(){
    snake.forEach((bolita, index) =>{
        if(index === 0){
            bolita.x = posX;
            bolita.y = posY;

        }else{
            bolita.x = bolita.xNext;
            bolita.y = bolita.yNext;
            bolita.xNext = snake[index - 1].x;
            bolita.yNext = snake[index - 1].y;
                }
    })
}
function checkEat(){
    if(snake[0].x === comida.x && snake[0].y === comida.y){
        snake.push({ ...snake[1] });
        comida.aparece();
        eating.play();
    }
}

function gameOver(){
    for(let i = 1; i < snake.length; i++ ){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            death.play();
            return true;
            
        }
    }
return false;
}

let direccion = 1;

comida.aparece();
setInterval(() => {
    ctx.fillRect(0, 0, 600, 400);
    
    snake.forEach(bolita => bolita.pinta());
    comida.pinta();
    checkEat();
    if(gameOver()) {
        alert('Perdiste, suerte para la proxima');
        snake = start();
    }
    if(direccion === 1) posX++;
    else if (direccion === 2) posY++;
    else if (direccion === 3) posX--;
    else posY--;
    
    if(posX > 29) posX = 0;
    else if(posX < 0) posX = 29;
    if(posY > 20) posY = 1;
    else if(posY < 1 ) posY = 20;

    nextMove();
}, 150);


document.querySelector('body')
.addEventListener('keydown', function(e){
    switch(e.key)
{
    case 'ArrowUp':
        direccion = 4;
        break;
    case 'ArrowRight':
        direccion = 1;
        break;
    case 'ArrowLeft':
        direccion = 3;
        break;
    case 'ArrowDown':
        direccion = 2
        break;    
}
});

document.querySelector('.container')
    .addEventListener('click', (e) => {
        if (e.target.classList.contains('btn')) {
            const bText = e.target.innerText;
            if (bText === 'Up') direccion = 4;
            else if (bText === 'Right') direccion = 1;
            else if (bText === 'Left') direccion = 2;
            else direccion = 3;
        }
    });
