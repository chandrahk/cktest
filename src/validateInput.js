export default function validateInput(data, numberCalled, selectedNumber) {
  if (numberCalled == selectedNumber) {
    return true;
  } else {
    return false;
  }
}
