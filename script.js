"strcit";

class TicTacToe {
  constructor() {
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
    this.cells = document.querySelectorAll(".cell");
    this.winningMessage = document.querySelector(".winningMessage");
    this.winningMessageText = document.querySelector("[data-winning-message]");
    this.restartButton = document.getElementById("restartButton");
    this.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => this.handleMove(index));
      
    });
    this.restartButton.addEventListener("click", () => this.restartGame());
  }

  handleMove(index) {
    if (this.board[index] === "") {
      this.board[index] = this.currentPlayer;
      this.renderBoard();
      if (this.checkWin(this.currentPlayer)) {
        console.log(`${this.currentPlayer} wins!`);
        this.showWinningMessage(`${this.currentPlayer} wins!`);
      } else if (this.checkDraw()) {
        console.log("It's a draw!");
        this.showWinningMessage("It's a draw!");
      }
      console.log(this.currentPlayer);

      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }
  }

  checkWin(player) {
    // prettier-ignore
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    return winningCombinations.some((combination) =>
      combination.every((index) => this.board[index] === player)
    );
  }

  checkDraw() {
    return this.board.every((cell) => cell !== "");
  }

  renderBoard() {
    this.cells.forEach((cell, index) => {
      cell.classList.remove("x", "circle");
      if (this.board[index] === "X") {
        cell.classList.add("x");
      } else if (this.board[index] === "O") {
        cell.classList.add("circle");
      }
    });
  }

  showWinningMessage(message) {
    this.winningMessageText.textContent = message;
    this.winningMessage.classList.add("show");
  }

  restartGame() {
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
    this.renderBoard();
    this.winningMessage.classList.remove("show");
  }
}

const game = new TicTacToe();
