let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

let xRaquete = 5;
let yRaquete = 150; 
let raqueteComprimento = 10;
let raqueteAltura = 90;

//váriaveis do oponente
let xRaqueteOp = 585;
let yRaqueteOp = 150;
let velocidadeYOp;

let colidiu = false

//placar do jogo
let meusPontos = 0;
let pontosOp = 0;

//som
let raquetada;
let trilha;
let ponto;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  velocidadeBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOp, yRaqueteOp);
  movimentaRaqueteOp();
  verificaColisaoRaquete(xRaqueteOp, yRaqueteOp);
  IncluiPlacar();
  marcaPonto();

} 

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
  
}

function velocidadeBolinha(){
  xBolinha += velocidadeXBolinha; 
  yBolinha += velocidadeYBolinha;

}

function mostraRaquete(x,y){
  rect(x,y, raqueteComprimento, raqueteAltura)

}

function mostraRaqueteOponente(){
  rect(xRaqueteOp, yRaqueteOp, raqueteComprimento, raqueteAltura)

}

function verificaColisaoBorda(){
   if (xBolinha + raio > width ||
    xBolinha - raio < 0){
   velocidadeXBolinha *= -1;
 }  
  if (yBolinha + raio > height ||
    yBolinha - raio < 0){
   velocidadeYBolinha *= -1;
  }
  
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento &&
yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio
>yRaquete){
    velocidadeXBolinha *=-1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOp(){
  velocidadeYOp = yBolinha - yRaqueteOp - raqueteComprimento / 2 - 30;
  yRaqueteOp += velocidadeYOp
}

function IncluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  text(pontosOp, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
  }
  if (xBolinha < 10){
    pontosOp += 1;
    ponto.play();
  }
}