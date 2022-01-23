import "./App.css";
import { sha3_224 } from "js-sha3";
import { useState } from "react";

function App() {
  // data init for js operation
  const [details, setDetails] = useState({ input: "", output: "", final: "" });

  function toHex(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return result;
  }

  const test = () => {
    // sha3_224
    let a = sha3_224(details.input);
    setDetails({ ...details, output: a });
    console.log(details.input);
    console.log(a);
  };

  const generate = () => {
    // sha3_224
    let a = sha3_224(details.input);
    setDetails({ ...details, output: a });

    // result to final ascii sequence
    let final = "";

    for (let i = 0; i < 12; i++) {
      let n = i * 2;

      // get (n) -- (n+2) characters from string
      let temp = a.substring(n, n + 2);

      // str to hex
      let hextemp = toHex(temp);

      // hex to int for calculations
      let inttemp = parseInt(hextemp);

      // hexn %= 93 (? ascii range)
      inttemp = inttemp % 93;

      // get ascii (plus offset 33)
      let asci = String.fromCharCode(inttemp + 33);

      // add to result
      final += asci;
    }
    setDetails({ ...details, final: final });
  };

  return (
    <div className="App">
      <div className="top">
        <input
          type="password"
          name="input"
          id="input"
          onChange={(e) => setDetails({ ...details, input: e.target.value })}
          value={details.input}
        />
      </div>
      <div className="bottom">
        <button onClick={generate}>Encrypt</button>
      </div>
      <div className="result">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={details.final}
        ></textarea>
      </div>
    </div>
  );
}

export default App;
