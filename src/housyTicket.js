import Tambola from "tambola-generator";

export default function getHousyTicketData() {
  var tambola = Tambola.generateTickets(1);
  var dataarray = tambola[0]._entries;
  var data2 = [];
  console.log(dataarray);

  for (let i = 0; i < 3; i++) {
    var obj = dataarray[i];
    var k = 1;
    var newobj = [];
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
