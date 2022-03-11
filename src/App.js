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

function App() {
  const defaultLanguage = 0;
  const [selected, setSelected] = useState(options[defaultLanguage].value);

  const buttonClick = () => {
    //alert('Language is ' + selectedOption)
    var textArr = text.split(" ");
    speak({ voice, text: text });
    setNumberCalled(textArr);
    /*
    for (let i=0;i< textArr.length;i++){
      console.log(' Text is ' + textArr[i]);
      let number = textArr[i]
      syncDelay(5000);
    }
    */
  };
  const [text, setText] = useState("");
  const { speak, speaking, voices } = useSpeechSynthesis();

  //const voice = voices.find(({ lang }) => lang.startsWith("es"));
  const voice = voices.find(({ lang }) => lang.startsWith(selected));
  const [cellValue, setCellValue] = useState("");
  const [numberCalled, setNumberCalled] = useState("");

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

  //const data = React.useMemo(() => makeData(3), [])
  //const [data, setData] = React.useState(() => makeData(3));
  const [data, setData] = React.useState(() => getHousyTicketData());
  const [originalData] = React.useState(data);

  const refresh = () => {
    //alert('Clicked on Refresh')
    //setData(makeData(3));
    setData(getHousyTicketData());
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

      <p> </p>
      <p> </p>
      <p> </p>
      <h3> Click on click me to launch the voice</h3>
      <h4> PS: Sentence translation only applies to Spanish </h4>
      <button
        disabled={speaking}
        style={{ marginLeft: "8px" }}
        onClick={buttonClick}
      >
        CickMe
      </button>
    </div>
  );
}

export default App;
