export default function findWinningCombination(
  board,
  selectedNumbers,
  calledNumbers
) {
  return earlyFive(selectedNumbers, calledNumbers);
}

function earlyFive(selectedNumbers, calledNumbers) {
  let rtn = false;
  let j = 0;
  for (let i = 0; i < selectedNumbers.length; i++) {
    if (!calledNumbers.find(selectedNumbers[i])) {
      rtn = false;
    } else {
      j++;
      // found it is it 4 as in 5 numbers
      if (j >= 4) {
        return true;
      }
    }
  }

  return rtn;
}
