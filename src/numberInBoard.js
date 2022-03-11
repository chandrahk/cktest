export default function numberInBoard(data, selectedNumber) {
  /*console.log('in numberinBoard ' + data)
  console.log('in numberinBoard loc 0' + data[0])
  console.log('in numberinBoard loc 0' + data[0]['col1'])
  console.log('in numberinBoard loc 0' + data[0]['col1'])
  

  for(let key in data) {
    if (data.hasOwnProperty(key)){
      console.log('value of  ' + data[key])
    }
  }*/

  //console.log(JSON.stringify(data))
  for (var i = 0; i < data.length; i++) {
    var obj = data[i];
    for (let key in obj) {
      //if (obj.hasOwnProperty(key)){
      //console.log('value of  ' + obj[key] + ' selected ' + selectedNumber)
      if (obj[key] == selectedNumber) {
        //console.log('matched value ' + obj[key])
        return true;
      }
      //}
    }
  }

  /*
  for(let  i=0;i<3;i++){
      for (let  j=0;j<10;j++)
      {
          let col='col'+j
          /*if (data[i][col] != 'undefined')
              console.log('number  ' + data[i]['col'+j])
          */
  /*
          if ( (data[i]['col'+j]) === selectedNumber){
              console.log('number found' + selectedNumber)
              return true;
          }
      }
  }
  */

  return false;
}
