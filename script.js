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

    // AI
    this.gameplayChoice = document.querySelector(".gameplay-choice");
    this.gameplayIcon = document.getElementById("gameplayIcon");
    this.gameplayText = document.getElementById("gameplayText");
    this.isAI = false;

    this.gameplayIcon.addEventListener("click", () =>
      this.toggleGameplayMode()
    );
  }

  toggleGameplayMode() {
    this.isAI = !this.isAI;
    if (this.isAI) {
      this.gameplayIcon.src = "./img/people.png";
      this.gameplayText.innerText = "2P";
    } else {
      this.gameplayIcon.src = "./img/person.png";
      this.gameplayText.innerText = "1P";
    }
    this.restartGame();

    // if (this.isAI && this.currentPlayer === "O") {
    //   this.makeAIMove(); // If AI mode is enabled and it's O's turn, make AI move immediately
    // }
  }

  handleMove(index) {
    if (this.board[index] === "") {
      this.board[index] = this.currentPlayer;
      this.renderBoard();
      if (this.checkWin(this.currentPlayer)) {
        this.showWinningMessage(`${this.currentPlayer} wins!`);
      } else if (this.checkDraw()) {
        this.showWinningMessage("It's a draw!");
      }
      console.log(this.currentPlayer);

      if (!this.isAI) {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      } else if (this.currentPlayer === "X") {
        this.makeAIMove(); // If AI mode is enabled and it's X's turn, make AI move
      }
      console.log(this.board);
    }
  }

  //   makeAIMove() {
  //     const availableMoves = [];
  //     for (let i = 0; i < this.board.length; i++) {
  //       if (this.board[i] === "") {
  //         availableMoves.push(i);
  //       }
  //     }

  //     console.log(availableMoves);

  //     if (availableMoves.length > 0) {
  //       const randomIndex = Math.floor(Math.random() * availableMoves.length);
  //       const moveIndex = availableMoves[randomIndex];
  //       console.log(moveIndex);
  //       this.board[moveIndex] = "O";
  //       this.renderBoard();
  //       if (this.checkWin("O")) {
  //         this.showWinningMessage("O wins!");
  //       } else if (this.checkDraw()) {
  //         this.showWinningMessage("It's a draw!");
  //       }
  //     }
  //   }

  makeAIMove() {
    const availableMoves = [];
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] === "") {
        availableMoves.push(i);
      }
    }

    if (availableMoves.length > 0) {
      const bestMove = this.minimax(this.board, "O");
      this.board[bestMove.index] = "O";
      this.renderBoard();

      if (this.checkWin("O")) {
        this.showWinningMessage("O wins!");
      } else if (this.checkDraw()) {
        this.showWinningMessage("It's a draw!");
      }
    }
  }

  minimax(board, player) {
    if (this.checkWin("X")) {
      return { score: -10 };
    } else if (this.checkWin("O")) {
      return { score: 10 };
    } else if (this.checkDraw()) {
      return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        const move = {};
        move.index = i;
        board[i] = player;

        if (player === "O") {
          const result = this.minimax(board, "X");
          move.score = result.score;
        } else {
          const result = this.minimax(board, "O");
          move.score = result.score;
        }

        board[i] = "";
        moves.push(move);
      }
    }

    let bestMove;
    if (player === "O") {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i];
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i];
        }
      }
    }

    return bestMove;
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
      cell.classList.remove("x", "circle", "animate");
      if (this.board[index] === "X") {
        cell.classList.add("x");
      } else if (this.board[index] === "O") {
        cell.classList.add("circle");
      }
    });

    setTimeout(() => {
      this.cells.forEach((cell) => {
        if (cell.classList.contains("x") || cell.classList.contains("circle")) {
          cell.classList.add("animate");
        }
      });
    }, 10);
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
