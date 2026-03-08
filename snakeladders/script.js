// Pertama
class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(id) {
    this.nodes.set(id, []);
  }

  addEdge(from, to) {
    this.nodes.get(from).push(to);
  }

  addSpecialEdge(from, to) {
    this.nodes.get(from).push(to);
  }
}

// Kedua
class Board {
  constructor(size) {
    this.size = size;
    this.total = size * size;
    this.boardElement = document.getElementById("board");
    this.graph = new Graph();

    this.ladders = {
      4: 14,
      9: 31,
      20: 38,
      28: 84,
      40: 59,
      63: 81,
    };

    this.snakes = {
      17: 7,
      54: 34,
      62: 19,
      64: 60,
      87: 24,
      93: 73,
      95: 75,
      99: 78,
    };

    this.createBoard();
    this.createGraph();
    this.drawConnections();
  }

  createBoard() {
    let cells = [];
    let number = 1;

    for (let r = 0; r < this.size; r++) {
      let row = [];

      for (let c = 0; c < this.size; c++) {
        row.push(number++);
      }

      if (r % 2 == 1) row.reverse();

      cells.push(row);
    }

    cells.reverse();

    cells.forEach((row) => {
      row.forEach((num) => {
        let div = document.createElement("div");

        div.classList.add("cell");

        if (num % 2 == 0) div.classList.add("white");
        else div.classList.add("black");

        div.id = "cell-" + num;

        div.innerText = num;

        this.boardElement.appendChild(div);
      });
    });

    this.canvas = document.createElement("canvas");
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.boardElement.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
  }

  createGraph() {
    for (let i = 1; i <= this.total; i++) {
      this.graph.addNode(i);

      if (i < 100)
        for (let d = 1; d <= 6; d++) {
          if (i + d <= 100) this.graph.addEdge(i, i + d);
        }
    }

    for (let key in this.ladders)
      this.graph.addSpecialEdge(parseInt(key), this.ladders[key]);

    for (let key in this.snakes)
      this.graph.addSpecialEdge(parseInt(key), this.snakes[key]);
  }

  getCellPosition(num) {
    let cell = document.getElementById("cell-" + num);

    let rect = cell.getBoundingClientRect();
    let boardRect = this.boardElement.getBoundingClientRect();

    return {
      x: rect.left - boardRect.left + rect.width / 2,
      y: rect.top - boardRect.top + rect.height / 2,
    };
  }

  drawConnections() {
    for (let start in this.ladders) {
      let end = this.ladders[start];

      let p1 = this.getCellPosition(start);
      let p2 = this.getCellPosition(end);

      this.ctx.strokeStyle = "green";
      this.ctx.lineWidth = 4;

      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    }

    for (let start in this.snakes) {
      let end = this.snakes[start];

      let p1 = this.getCellPosition(start);
      let p2 = this.getCellPosition(end);

      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 4;

      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    }
  }
}

// Ketiga
class Player {
  constructor(board, username) {
    this.position = 1;
    this.board = board;
    this.username = username;

    this.token = document.createElement("div");
    this.token.classList.add("player");

    board.boardElement.appendChild(this.token);

    this.updatePosition();
  }

  updatePosition() {
    let pos = this.board.getCellPosition(this.position);

    this.token.style.left = pos.x - 9 + "px";
    this.token.style.top = pos.y - 9 + "px";

    document.getElementById("info").innerText =
      `Posisi ${this.username}: ${this.position}`;
  }

  async move(steps) {
    for (let i = 0; i < steps; i++) {
      this.position++;
      this.updatePosition();
      await this.delay(250);
    }

    if (this.board.ladders[this.position]) {
      this.position = this.board.ladders[this.position];
      this.updatePosition();
      alert("Naik Tangga!");
    }

    if (this.board.snakes[this.position]) {
      this.position = this.board.snakes[this.position];
      this.updatePosition();
      alert("Digigit Ular!");
    }

    if (this.position === 100) {
      setTimeout(() => {
        alert("${this.username} Menang!");
      }, 300);
    }
  }

  delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}

// Terakhir
class App {
  constructor() {
    this.isRolling = false;
    this.board = new Board(10);
    this.player = new Player(this.board);
  }

  async rollDice() {
    if (this.isRolling) return;

    this.isRolling = true;

    let diceElement = document.getElementById("dice");

    let dice = 1;

    for (let i = 0; i < 10; i++) {
      dice = Math.floor(Math.random() * 6) + 1;
      diceElement.innerText = "🎲 " + dice;
      await this.delay(80);
    }

    let target = this.player.position + dice;

    if (target > 100) {
      let diff = target - 100;
      target = 100 - diff;
    }

    let steps = Math.abs(target - this.player.position);
    await this.player.move(steps);
    this.isRolling = false;
  }

  delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
