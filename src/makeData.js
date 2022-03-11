const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newRow = () => {
  var randomnumbers = [];
  while (randomnumbers.length < 5) {
    var r = Math.floor(Math.random() * 10) + 1;
    if (randomnumbers.indexOf(r) === -1) randomnumbers.push(r);
  }

  let col1 = "col" + randomnumbers[0];
  let col2 = "col" + randomnumbers[1];
  let col3 = "col" + randomnumbers[2];
  let col4 = "col" + randomnumbers[3];
  let col5 = "col" + randomnumbers[4];

  //console.log(randomnumbers);

  return {
    [col1]: Math.floor(Math.random() * 99),
    [col2]: Math.floor(Math.random() * 99),
    [col3]: Math.floor(Math.random() * 99),
    [col4]: Math.floor(Math.random() * 99),
    [col5]: Math.floor(Math.random() * 99)
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newRow(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}
