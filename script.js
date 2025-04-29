let currentPlayer = "X";
let gameActive = true;
const moveSound = document.getElementById("moveSound");
const winSound = document.getElementById("winSound");
const canvas = document.getElementById("win-line");
const ctx = canvas.getContext("2d");

function makeMove(cell) {
  if (!gameActive || cell.textContent !== "") return;

  cell.textContent = currentPlayer;
  moveSound.play();
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  const cells = document.querySelectorAll(".cell");
  const board = Array.from(cells).map(cell => cell.textContent);
  const combos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];
  const positions = [
    [[10,50],[100,50],[190,50]],
    [[10,150],[100,150],[190,150]],
    [[10,250],[100,250],[190,250]],
    [[50,10],[50,100],[50,190]],
    [[150,10],[150,100],[150,190]],
    [[250,10],[250,100],[250,190]],
    [[10,10],[100,100],[190,190]],
    [[190,10],[100,100],[10,190]]
  ];

  for (let i = 0; i < combos.length; i++) {
    const [a, b, c] = combos[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      document.getElementById("status").textContent = `${board[a]} wins!`;
      drawWinLine(positions[i][0], positions[i][2]);
      gameActive = false;
      winSound.play();
      return;
    }
  }

  if (board.every(cell => cell !== "")) {
    document.getElementById("status").textContent = "It's a Draw!";
    gameActive = false;
  }
}

function drawWinLine(start, end) {
  const boardRect = document.getElementById("board").getBoundingClientRect();
  canvas.width = boardRect.width;
  canvas.height = boardRect.height;
  canvas.style.top = "0px";
  canvas.style.left = "0px";

  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;

  let x1 = start[0], y1 = start[1];
  let x2 = end[0], y2 = end[1];
  let progress = 0;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + (x2 - x1) * progress, y1 + (y2 - y1) * progress);
    ctx.stroke();

    if (progress < 1) {
      progress += 0.05;
      requestAnimationFrame(animate);
    }
  }

  animate();
}

function resetGame() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("status").textContent = "";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
