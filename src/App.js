import React from "react";
import ReactDOM from "react-dom";
import { useTable } from "react-table";
import makeData from "./makeData";
import "./App.css";
import { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import Select from "react-select";
import getHousyTicketData from "./housyTicket";
import numberInBoard from "./numberInBoard";
import validateInput from "./validateInput";
import Tambola from "tambola-generator";

const options = [
  { value: "hi", label: "Hindi" },
  { value: "es", label: "Spanish" },
  { value: "zh", label: "Mandarin" },
  { value: "en", label: "English" }
];

function syncDelay(milliseconds) {
  var start = new Date().getTime();
  var end = 0;
  while (end - start < milliseconds) {
    end = new Date().getTime();
  }
}
let tambolaSequence = [];

function App() {
  const defaultLanguage = 0;
  const [selected, setSelected] = useState(options[defaultLanguage].value);
  const [num, setNextNum] = useState(0);
  const [seqTam, setSeq] = useState([]);
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const buttonClick = () => {
    //alert('Language is ' + selectedOption)
    var textArr = text.split(" ");
    speak({ voice, text: text });

    /*
    for (let i = 0; i < textArr.length; i++) {
      console.log(" Text is " + textArr[i]);
      let number = textArr[i];
      speak({ voice, number: number });
    }
    */
  };
  const [text, setText] = useState("");
  const [calloutText, setcalloutText] = useState("");
  const { speak, speaking, voices } = useSpeechSynthesis({
    onEnd
  });

  //const voice = voices.find(({ lang }) => lang.startsWith("es"));
  const voice = voices.find(({ lang }) => lang.startsWith(selected));
  const [cellValue, setCellValue] = useState("");
  const [numberCalled, setNumberCalled] = useState("");
  const [disable, setDisable] = React.useState(false);

  // Function to get cell value
  const getCellValue = (cell) => {
    console.log("In get cell" + cell.value);
    setCellValue("x");
    //cellvalue === "blue" ? (cellvalue = "red") : (cellvalue = "blue")
    //setColumn(cell)
    if (numberInBoard(data, numberCalled)) {
      if (!validateInput(data, numberCalled, cell.value)) {
        alert("click on the correct number");
      } else {
        // Color background
        //cell.css("background-color", "lightgrey")

        //cell.background = 'solid 3px red'
        //cell.color = 'red'
        alert("number found move on to next");
      }
    } else {
      alert("number not found on board");
    }
  };

  function generateSequence() {
    tambolaSequence = Tambola.getDrawSequence();
    setSeq(tambolaSequence);
    setNextNum(0);
    setText("");
    setcalloutText("");
    console.log(tambolaSequence.length + tambolaSequence);
    setDisable(true);
    speak({ voice, text: "Starting game" });
  }

  function callNextNumber() {
    let index = num;
    let calloutNum = seqTam[num];
    index++;

    let textvar = "Number called is " + calloutNum;

    setcalloutText("Number called is " + calloutNum);
    setText("Number called is " + calloutNum);
    setNumberCalled(calloutNum);

    //speak({voice, textvar});
    //speak({ voice, text });
    speak({ voice, text: textvar });
    //alert('Number is ' + calloutNum + ' index ' + index)

    setNextNum(index);
  }

  //const data = React.useMemo(() => makeData(3), [])
  //const [data, setData] = React.useState(() => makeData(3));
  const [data, setData] = React.useState(() => getHousyTicketData());
  const [originalData] = React.useState(data);

  const refresh = () => {
    //alert('Clicked on Refresh')
    //setData(makeData(3));
    setData(getHousyTicketData());
    setDisable(false);
    setcalloutText("");
    setText("");
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Housy Ticket",
        columns: [
          {
            accessor: "col1", // accessor is the "key" in the data
            hideHeader: false
          },
          {
            accessor: "col2", // accessor is the "key" in the data
            hideHeader: false
          },
          {
            accessor: "col3", // accessor is the "key" in the data
            hideHeader: false
          },
          {
            accessor: "col4", // accessor is the "key" in the data
            hideHeader: false
          },
          {
            accessor: "col5", // accessor is the "key" in the data
            hideHeader: false
          },
          {
            accessor: "col6", // accessor is the "key" in the data
            hideHeader: false
          },
          {
            accessor: "col7", // accessor is the "key" in the data
            hideHeader: false
          },
          {
            accessor: "col8", // accessor is the "key" in the data
            hideHeader: false
          },
          {
            accessor: "col9", // accessor is the "key" in the data
            hideHeader: false
          }
        ]
      }
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    <div>
      <h2> Click Refresh to re-generate the ticket </h2>
      <button onClick={refresh}> Refresh </button>
      <p> </p>
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold"
                  }}
                ></th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      onClick={() => getCellValue(cell)}
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip"
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p> </p>
      <p> </p>
      <p> </p>
      <p> </p>
      <h3> Select language of choice for voice rendering </h3>
      <Select
        defaultValue={options[defaultLanguage]}
        options={options}
        onChange={(event) => setSelected(event.value)}
        classNamePrefix="react-select"
        className="react-select--inline"
      />
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <h3> Type some number or text for testing </h3>
      <input
        placeholder="Text to spell"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      &nbsp;&nbsp;&nbsp;
      <input name="forDisplay" fontWeight="bold" value={calloutText} />
      <p> </p>
      <p> </p>
      <p> </p>
      <h3> Click on click me to launch the voice</h3>
      <h4> PS: Sentence translation only applies to Spanish </h4>
      <button style={{ marginLeft: "8px" }} onClick={buttonClick}>
        CickMe
      </button>
      &nbsp;&nbsp;&nbsp;
      <button disabled={disable} onClick={generateSequence}>
        {" "}
        Start Game{" "}
      </button>
      &nbsp;&nbsp;&nbsp;
      <button onClick={callNextNumber}> Next Number </button>
    </div>
  );
}

export default App;
