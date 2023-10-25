export default function init() {

  const canvas = document.getElementById('thng') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  let userScore = 0;
  let cpuScore = 1;
  let x = 300;
  let y = 550;

  draw();
  drawBall(300,50);
  // window.onload = function(){
  //   var fps = 250;
  //   //setInterval(update, 1000);
  // }

  canvas.addEventListener('click', function() {
    update()
  });

  function colorRect(topLeftX: number,topLeftY: number,boxWidth: number,boxHeight: number,fillColor: string){
      ctx!.fillStyle = fillColor;
      ctx!.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
  }

  function update(){
    draw();
    const min = 0;
    const max = 600;
    x = Math.random() * (max - min) + min;
    y = Math.random() * (max - min) + min;
    findScore(y);
    // updateScore();
    drawBall(x,y);
  }

  function findScore(y: number){
    let score = 0;
    let score2 = 0;
    if (y > 500){
      //home run
      score += 4;
    } else if(y < 500 && y > 400){
      //triple
      score += 3;
    } else if(y < 400 && y > 150){
      //double
      score += 2;
    } else if(y < 150 && y > 100){
      //single
      score += 1;
    }
    else {
      //out
      score -= 5;
      score2 += 5;
    }
    userScore += score;
    cpuScore += score2;

    return {userScore, cpuScore}
  }

  // function updateScore(){
  //     const user = document.getElementById('userScore');
  //     const cpu = document.getElementById('cpuScore');

  //     user!.textContent = userScore.toString();
  //     cpu!.textContent = cpuScore.toString();
  // }

  function drawBall(x: number,y: number){
    ctx!.beginPath();
    ctx!.arc(x,y,10,0,Math.PI*2,true);
    ctx!.fillStyle = "#000";
    ctx!.fill();
  }
  function draw(){
    const leftSideX = 200;
    const middleSideX = 300;
    const rightSideX = 400;
    const topY = 475;
    const middleY = 525;
    const bottomY = 600;
    const rightTop = 250;

    //var leftSquareX = 75;
    //var leftSquareY = 100;
    const leftSquareX = 0;
    const leftSquareY = 100;
    const leftTop = 250;

    const rightSquareX = 500;
    const rightSquareY = 550;

    const square = 100;

    colorRect(0,0,canvas.width,canvas.height,'#8c9');

    ctx!.beginPath();
    ctx!.moveTo(middleSideX, topY);
    ctx!.lineTo(leftSideX, middleY);
    ctx!.lineTo(leftSideX, bottomY);
    ctx!.lineTo(rightSideX, bottomY);
    ctx!.lineTo(rightSideX, middleY);
    ctx!.closePath();
    ctx!.fillStyle = "#c8f";
    ctx!.fill();

    const ctx2 = canvas.getContext('2d');
    ctx2!.moveTo(middleSideX, topY);
    ctx2!.lineTo(rightSideX,middleY);
    ctx2!.lineTo(600,350);
    ctx2!.lineTo(rightSquareX, 300);
    ctx2!.lineTo(middleSideX,topY);
    ctx2!.strokeStyle = "#f0a";
    ctx2!.stroke();

    // var ctx2 = canvas.getContext('2d');
    ctx2!.moveTo(middleSideX, topY);
    ctx2!.lineTo(leftSideX,middleY);
    ctx2!.lineTo(0,350);
    ctx2!.lineTo(leftSquareY, 300);
    ctx2!.lineTo(middleSideX,topY);
    ctx2!.strokeStyle = "#f0a";
    ctx2!.stroke();


    const top = 100;
    const middle = 75;
    const bottom = 0;

    ctx!.beginPath();
    ctx!.moveTo(middleSideX,top);
    ctx!.lineTo(leftSideX,middle);
    ctx!.lineTo(leftSideX,bottom);
    ctx!.lineTo(rightSideX,bottom);
    ctx!.lineTo(rightSideX,middle);
    ctx!.closePath();
    ctx!.fillStyle = "#c8f";
    ctx!.fill();

    //line to square from top
    // var ctx2 = canvas.getContext('2d');
    ctx2!.moveTo(middleSideX, top);
    ctx2!.lineTo(rightSquareX,300);
    ctx2!.lineTo(600,250);
    ctx2!.lineTo(rightSideX, middle);
    ctx2!.lineTo(middleSideX,top);
    ctx2!.strokeStyle = "#f0a";
    ctx2!.stroke();

    // var ctx2 = canvas.getContext('2d');
    ctx2!.moveTo(middleSideX, top);
    ctx2!.lineTo(100,300);
    ctx2!.lineTo(0,250);
    ctx2!.lineTo(leftSideX, middle);
    ctx2!.lineTo(leftSideX,middle);
    ctx2!.strokeStyle = "#f0a";
    ctx2!.stroke();


      //ctx.fillStyle = "rgba(0,0,200,1)";
      ctx!.fillRect(rightSquareX,rightTop,square, square);
      ctx!.fillRect(leftSquareX,leftTop,square, square);
  }

  // function draw2(x,y){
  //   var t = document.getElementById('test');
  //   var ctx  = t.getContext('2d');
  //   ctx.save();
  //   ctx.clearRect(0,0,550,400);
  //   ctx.fillStyle = "rgba(0,200,0,1)";
  //   ctx.fillRect(x,20,50,50);
  //   ctx.restore();
  //   x += 1;
  //   var loopTimer = setTimeout('draw('+x+','+y+')',20);
  // }
  //
  // function draw(x,y){
  //   var t = document.getElementById('thing');
  //   var ctx  = t.getContext('2d');
  //
  //   ctx.beginPath();
  //   ctx.moveTo(100,50);
  //   ctx.lineTo(130,100);
  //   ctx.lineTo(70,100);
  //   ctx.closePath();
  //   ctx.fill();
  //
  //   ctx.beginPath();
  //   ctx.moveTo(72,60);
  //   ctx.lineTo(85,72);
  //   ctx.lineTo(71,94);
  //   ctx.lineTo(50,70);
  //   ctx.lineTo(65,40);
  //   ctx.fill();
  //
  //   ctx.beginPath();
  //   ctx.moveTo(130,94);
  //   ctx.lineTo(150,72);
  //   ctx.lineTo(140,40);
  //   ctx.lineTo(90,70);
  //   // ctx.lineTo(80,40);
  //   ctx.fill()
  // }
}
