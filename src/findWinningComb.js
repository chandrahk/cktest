export default function findWinningCombination(
  board,
  selectedNumbers,
  calledNumbers
) {
  let win = -1;

  if (anyLineFive(board, 0, selectedNumbers)) {
    win = 1;
  }
  if (anyLineFive(board, 1, selectedNumbers)) {
    win = 2;
  }
  if (anyLineFive(board, 2, selectedNumbers)) {
    win = 3;
  }
  return earlyFive(selectedNumbers, calledNumbers);
}

function anyLineFive(board, line, selectedNumbers) {
  let rtn_val = false;
  let j = 0;
  for (let i = 0; i < selectedNumbers.length; i++) {
    if (selectedNumbers[j] !== board[line][i]) {
      return rtn_val;
    } else {
      rtn_val = true;
      j++;
    }
  }
  return rtn_val;
}

/*
function getBullsEyeNumber(board) {
  return board[1][4];
}

function bullsEye(bullsEyeNumber, selectedNumbers) {
  let num = selectedNumbers.indexOf(bullsEyeNumber);
  let rtn = false;
  if (num !== -1) {
    rtn = true;
  }
  return rtn;
}
*/

function earlyFive(selectedNumbers, calledNumbers) {
  let rtn = false;
  let j = 0;
  //alert('Selected numbers ' + selectedNumbers)
  //alert('Called numbers ' + calledNumbers)

  // We could just check if length > 4 since we are
  // already checking whether the person clicked on board
  // and number was on board
  if (selectedNumbers.length > 4) return true;

  // The below is round about way and not needed
  for (let i = 0; i < selectedNumbers.length; i++) {
    let num = calledNumbers.indexOf(selectedNumbers[i]);
    if (num === -1) {
      rtn = false;
    } else {
      j++;
      // found it.. Is it at least 5 numbers found?
      if (j > 4) {
        return true;
      }
    }
  }

  return rtn;
}
