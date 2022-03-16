export default function bullsEye(board, bullsEyeNumber, selectedNumbers) {
  let bullsEyeNum = getBullsEyeNumber(board);
  let rtn = false;

  for (let i = 0; i < selectedNumbers.length; i++) {
    if (selectedNumbers[i] === bullsEyeNum) rtn = true;
  }

  return rtn;
}

function getBullsEyeNumber(board) {
  let bullsEyeNumber = -99;
  if (board[1][4] !== undefined) {
    bullsEyeNumber = board[1][4];
  }
  return bullsEyeNumber;
}
