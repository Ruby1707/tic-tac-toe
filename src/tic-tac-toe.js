class TicTacToe {
    constructor() {
      this.gamefield = [[null, null, null], [null, null, null], [null, null, null]];
      this.play = 'x';
    }
    getCurrentPlayerSymbol() {
      return this.play;
    }
    nextTurn(rowIndex, columnIndex) {
      if (this.gamefield[rowIndex][columnIndex] == null) {
            this.gamefield[rowIndex][columnIndex] = this.play

            if (this.play == 'x'){
              this.play = 'o'
            }
            else{
              this.play = 'x'
            }
        }
    }
    Gg() {
        let tempArr = [[0,0,0],[0,0,0],[0,0,0]]
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.gamefield[i][j] == 'x') tempArr[i][j] = 1
                if (this.gamefield[i][j] == 'o') tempArr[i][j] = -1
            }
        }
        let sRow = [0,0,0]
        let sCol = [0,0,0]
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                sRow[i] = sRow[i] + tempArr[i][j]
                sCol[i] = sCol[i] + tempArr[j][i]
            }

            if (Math.abs(sRow[i]) == 3 || Math.abs(sCol[i]) == 3) return true
        }

        let sDiag = [0,0]
        for (let i = 0; i < 3; i++) {
            sDiag[0] = sDiag[0] + tempArr[i][i]
            sDiag[1] = sDiag[1] + tempArr[i][2-i]
        }

        if (Math.abs(sDiag[0]) == 3 || Math.abs(sDiag[1]) == 3) return true

        return false
    }

    isFinished() {
        if (this.Gg() || this.isDraw()) return true
        return false
    }


    getWinner() {
      var winner;
        if (this.play == 'x'){
          winner= 'o'
        }
        if (this.play == 'o'){
          winner = 'x';
        }
        if (this.Gg()){
          return winner;
        }
          return null;
    }

    noMoreTurns() {
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
          if (this.gamefield[i][j] == null) return false
      return true;
    }

    isDraw() {
      if (this.noMoreTurns() && !this.Gg()) return true;
        return false;
    }

    getFieldValue(rowIndex, colIndex) {
       return this.gamefield[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
