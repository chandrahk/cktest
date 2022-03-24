import Tambola from "tambola-generator";

export default function getHousyTicketData() {
  var tambola = Tambola.generateTickets(1);
  var dataarray = tambola[0]._entries;
  var data2 = [];
  var data3 = sort(dataarray);
  //console.log(data3);

  for (let i = 0; i < 3; i++) {
    var obj = dataarray[i];
    var k = 1;
    var newobj = [];
    findConsecutiveZeros(obj, 0);
    for (let key in obj) {
      //console.log('kye is ' + key + ' value is ' + obj[key] + ' k ' +k)
      //data2[i]['col'+k] = obj[key]

      if (obj[key] != 0) {
        newobj["col" + k] = obj[key];
      } else {
        newobj["col" + k] = undefined;
      }
      k++;
    }
    data2.push(newobj);
  }

  return data2;
}

function findConsecutiveZeros(obj, number) {
  let maxLength = 0;
  let tempLength = 0;
  if (number > 0) {
  }

  for (let key in obj) {
    if (obj[key] !== 0) {
      tempLength = 0;
    } else {
      tempLength++;
    }
    if (tempLength > maxLength) {
      maxLength = tempLength;
    }
  }

  if (maxLength > 3) {
    console.log("Found consecutive zeros " + maxLength + " obj " + obj);
  }
  swapNumbers(obj);
}

function swapNumbers(obj) {
  let newobj = obj;
}

function sort(ticket) {
  // for each row
  for (var row = 0; row < 3; row++) {
    // for each column
    for (var col = 0; col < 9; col++) {
      if (col > 0 && col + 2 < 9) {
        if (
          ticket[row][col] !== 0 &&
          ticket[row][col - 1] !== 0 &&
          ticket[row][col + 1] !== 0
        ) {
          // Swap
          if (ticket[row][col + 2] != 0) {
            console.log(
              "need to swap locations for non zero row " +
                row +
                " Column " +
                col
            );
            break;
          }
        }
      }
    }
  }

  //For each column in the ticket
  for (var col = 0; col < 9; col++) {
    //If all three rows are populated
    if (ticket[0][col] != 0 && ticket[1][col] != 0 && ticket[2][col] != 0) {
      for (var i = 0; i < 2; i++) {
        for (var j = i + 1; j < 3; j++) {
          // Swap content
          if (ticket[i][col] > ticket[j][col]) {
            var temp = ticket[i][col];
            ticket[i][col] = ticket[j][col];
            ticket[j][col] = temp;
          }
        }
      }
    }
    //If 1st and 2nd rows are populated
    else if (
      ticket[0][col] != 0 &&
      ticket[1][col] != 0 &&
      ticket[2][col] == 0
    ) {
      if (ticket[0][col] > ticket[1][col]) {
        var temp = ticket[0][col];
        ticket[0][col] = ticket[1][col];
        ticket[1][col] = temp;
      }
    }
    //If 1st and 3rd rows are populated
    else if (
      ticket[0][col] != 0 &&
      ticket[1][col] == 0 &&
      ticket[2][col] != 0
    ) {
      if (ticket[0][col] > ticket[2][col]) {
        var temp = ticket[0][col];
        ticket[0][col] = ticket[2][col];
        ticket[2][col] = temp;
      }
    }
    //If 2nd and 3rd rows are populated
    else if (
      ticket[0][col] == 0 &&
      ticket[1][col] != 0 &&
      ticket[2][col] != 0
    ) {
      if (ticket[1][col] > ticket[2][col]) {
        var temp = ticket[1][col];
        ticket[1][col] = ticket[2][col];
        ticket[2][col] = temp;
      }
    }
  }
  return ticket;
}
