const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;

let heartPath = [];
let fillProgress = 0;
let arrowX = -40;
let showTeAmo = true;
let victoriaColor = "#ff3366";

// Cargar imagen de flecha
const flechaImg = new Image();
flechaImg.src = 'flecha.png';

// Generar puntos de contorno
function generateHeartPath(scale = 10, step = 0.01) {
  for (let t = 0; t <= Math.PI * 2; t += step) {
    const x = scale * 16 * Math.pow(Math.sin(t), 3);
    const y = -scale * (
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );
    heartPath.push({ x: centerX + x, y: centerY + y });
  }
}

// Dibujar corazón hasta cierto punto (animación de línea)
function drawHeartStroke(limit) {
  ctx.strokeStyle = "#ff3366";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < limit && i < heartPath.length; i++) {
    const p = heartPath[i];
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();
}

// Dibuja el texto
function drawText() {
  ctx.textAlign = "center";
  if (showTeAmo) {
    ctx.fillStyle = "#ff3366";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("Te amo", centerX, centerY - 10);
  }

  ctx.fillStyle = victoriaColor;
  ctx.font = "bold 24px sans-serif";
  ctx.fillText("Victoria", centerX, centerY + 25);
}

// Flecha animada
function drawArrow() {
  // Dibuja la imagen de la flecha en vez de la forma
  const flechaWidth = 40;
  const flechaHeight = 20;
  ctx.save();
  ctx.translate(arrowX, centerY - flechaHeight / 2);
  ctx.drawImage(flechaImg, 0, 0, flechaWidth, flechaHeight);
  ctx.restore();
}

// Pintar el corazón tipo "brochazo radial"
function fillHeartBrush() {
  const radius = fillProgress;
  const grd = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  grd.addColorStop(0, "#ffb6c1");
  grd.addColorStop(1, "#ff3366");

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = grd;

  ctx.beginPath();
  const p = heartPath[0];
  ctx.moveTo(p.x, p.y);
  for (let i = 1; i < heartPath.length; i++) {
    ctx.lineTo(heartPath[i].x, heartPath[i].y);
  }
  ctx.closePath();
  ctx.fill();
}

// Animar el dibujo del corazón
function animateStroke(index = 0) {
  ctx.clearRect(0, 0, width, height);
  drawHeartStroke(index);
  drawText();
  if (index < heartPath.length) {
    requestAnimationFrame(() => animateStroke(index + 3));
  } else {
    setTimeout(() => animateArrow(), 700);
  }
}

// Animar la flecha atravesando
function animateArrow() {
  ctx.clearRect(0, 0, width, height);
  drawHeartStroke(heartPath.length);
  drawText();
  drawArrow();

  arrowX += 4;

  if (arrowX > centerX - 30 && arrowX < centerX + 30) {
    showTeAmo = false;
  }

  if (arrowX < width + 40) {
    requestAnimationFrame(animateArrow);
  } else {
    setTimeout(() => fillHeart(), 600);
  }
}

// Animar el relleno del corazón tipo brochazo
function fillHeart() {
  if (fillProgress < 150) {
    ctx.clearRect(0, 0, width, height);
    drawHeartStroke(heartPath.length);
    fillHeartBrush();
    drawText();
    fillProgress += 3;
    requestAnimationFrame(fillHeart);
  } else {
    victoriaColor = "white";
    ctx.clearRect(0, 0, width, height);
    drawHeartStroke(heartPath.length);
    fillHeartBrush();
    drawText();
  }
}

// --- SISTEMA DE PÁGINAS ---
const pages = [
  {
    type: 'animacion',
    render: () => {
      // Animación de corazón y flecha
      resetAnim();
      generateHeartPath();
      animateStroke();
    }
  },
  {
    type: 'texto',
    render: () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#ff3366';
      ctx.font = 'bold 26px serif';
      ctx.textAlign = 'center';
      ctx.fillText('Eres mi inspiración', centerX, centerY - 20);
      ctx.font = '20px serif';
      ctx.fillStyle = '#333';
      ctx.fillText('Cada página de este libro', centerX, centerY + 10);
      ctx.fillText('escrita con amor para ti.', centerX, centerY + 40);
    }
  },
  {
    type: 'poema',
    render: () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#8b0000';
      ctx.font = 'bold 22px serif';
      ctx.textAlign = 'center';
      ctx.fillText('Poema para Victoria', centerX, centerY - 60);
      ctx.font = '18px serif';
      ctx.fillStyle = '#444';
      ctx.fillText('En cada página un verso,', centerX, centerY - 20);
      ctx.fillText('en cada verso un te quiero,', centerX, centerY + 10);
      ctx.fillText('y en cada te quiero,', centerX, centerY + 40);
      ctx.fillText('mi corazón sincero.', centerX, centerY + 70);
    }
  }
];
let currentPage = 0;

function showPage(index) {
  // Oculta flecha izq si es la primera página
  document.getElementById('prevPage').style.display = index === 0 ? 'none' : 'block';
  // Oculta flecha der si es la última página
  document.getElementById('nextPage').style.display = index === pages.length - 1 ? 'none' : 'block';
  // Llama al render de la página
  pages[index].render();
}

document.getElementById('prevPage').onclick = () => {
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
};
document.getElementById('nextPage').onclick = () => {
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  }
};

// Reinicia variables de animación para la página 1
function resetAnim() {
  heartPath = [];
  fillProgress = 0;
  arrowX = -40;
  showTeAmo = true;
  victoriaColor = "#ff3366";
}

// --- MODIFICAR INICIO ---
// Antes: generateHeartPath(); animateStroke();
showPage(currentPage);
// --- MODIFICAR FIN ---
