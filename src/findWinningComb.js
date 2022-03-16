export default function findWinningCombination(
  board,
  selectedNumbers,
  calledNumbers
) {
  return earlyFive(selectedNumbers, calledNumbers);
}

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
