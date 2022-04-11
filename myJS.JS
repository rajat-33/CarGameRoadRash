const gameArea = document.getElementById("gameArea");
const startScreen = document.getElementById("startScreen");
const score = document.getElementById("score");

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

let keys={ ArrowUp: false, ArrowDown: false, ArrowLeft: false, 
    ArrowRight: false};

function keyDown(e)
{
    console.log(e.key);
    keys[e.key]=true;
    console.log(keys);
}

function keyUp(e)
{
    console.log(e.key);
    keys[e.key]=false;
    console.log(keys);
}

startScreen.addEventListener('click', start);

let player={speed: 4, roadSpeed: 5};

function moveLines(){
    console.log("called");
    let lines=document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y>=541)
        {
            item.y-=700;
        }
        item.y+=player.roadSpeed;
        item.style.top=item.y+"px";
    })
}

function moveEnemyCars(){
    console.log("called");
    let enemyCar=document.querySelectorAll('.enemyCar');
    enemyCar.forEach(function(item){
        if(item.y>=595)
        {
            item.x=(Math.random()*10000);
            item.x=(Math.floor(item.x)%10)*38+470;
            item.y-=700;
            item.style.left=item.x+"px";
        }
        item.y+=player.roadSpeed;
        item.style.top=item.y+"px";
    })
}

function gamePlay()
{
    moveLines();
    moveEnemyCars();
    let car=document.querySelector('.car');
    if(keys.ArrowUp)
    {
        player.y -=player.speed;
    }
    if(keys.ArrowDown)
    {
        player.y +=player.speed;
    }
    if(keys.ArrowLeft)
    {
        player.x -=player.speed;
    }
    if(keys.ArrowRight)
    {
        player.x +=player.speed;
    }
    player.y=Math.max(50, player.y);
    player.y=Math.min(596, player.y);
    player.x=Math.max(456, player.x);
    player.x=Math.min(855, player.x);
    car.style.top=player.y+"px";
    car.style.left=player.x+"px";
    

    window.requestAnimationFrame(gamePlay);
}

function isCollide(a, b){
    aRect=a.getBoundingClientRect();
    bReact=b.getBoundingClientRect();
    // return !((aRect.top<bReact.b) || )
}

function start()
{
    startScreen.classList.add("hide");
    gameArea.classList.remove("hide");
    player.start=true;
    
    for(i=0;i<3;i++)
    {
        let enemyCar=document.createElement('div');
        enemyCar.setAttribute('class', 'enemyCar');
        enemyCar.x=(Math.random()*10000);
        enemyCar.x=(Math.floor(enemyCar.x)%10)*38+470;
        enemyCar.y=250*i+16;
        enemyCar.style.left=enemyCar.x+"px";
        enemyCar.style.top=enemyCar.y+"px";
        enemyCar.style.backgroundColor="cyan";
        gameArea.appendChild(enemyCar);
    }
    

    let car=document.createElement('div');
    car.setAttribute('class', 'car');
    car.innerText="car";
    gameArea.appendChild(car);
    player.x=car.offsetLeft;
    player.y=car.offsetTop;

    for(x=0;x<5;x++)
    {
        let line=document.createElement('div');
        line.setAttribute('class', 'lines');
        line.y = (x*140);
        line.style.top= line.y+"px";
        gameArea.append(line);
    }
    
    window.requestAnimationFrame(gamePlay);
}