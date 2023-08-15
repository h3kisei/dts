import React, { useState } from "react";
import "./App.css";
import afterFrame from "afterframe";

function App() {
  const [showKey, setShowKey] = useState(false);
  const [showSelectionSort, setShowSelectionSort] = useState(false);

  const generateRandomString = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
  };

  const randomStringsArray = Array.from({ length: 1000 }, () =>
    generateRandomString(Math.round(Math.random() * 4) + 1)
  );

  const toggleKey = () => {
    setShowKey(!showKey);
  };

  function measureInteraction() {
    const startTimestamp = performance.now();

    return {
      end() {
        const endTimestamp = performance.now();
        console.log("It takes about", endTimestamp - startTimestamp, "ms");
      },
    };
  }

  let sSortList = null;
  const selectionSort = (randomStringsArray) => {
    console.log(randomStringsArray);
    const interaction = measureInteraction();
    afterFrame(() => {
      interaction.end();
    });
    for (let i = 0; i < randomStringsArray.length - 1; i++) {
      let idmin = i;
      for (let j = i + 1; j < randomStringsArray.length; j++) {
        if (randomStringsArray[j] < randomStringsArray[idmin]) {
          idmin = j;
        }
      }
      let t = randomStringsArray[i];
      randomStringsArray[i] = randomStringsArray[idmin];
      randomStringsArray[idmin] = t;
    }
    const sSort = randomStringsArray;
    console.log(sSort);
    setShowSelectionSort(!showSelectionSort);
    if (showSelectionSort === true) {
      sSortList = sSort.map((item) => {
        return <div className="item">{item} - </div>;
      });
    }
    console.log(!showSelectionSort);
  };

  return (
    <div className="App">
      <div className="showkey">
        <button onClick={() => toggleKey()}>Create Array</button>
        {showKey === true
          ? randomStringsArray.map((item) => {
              return <div className="item">{item} - </div>;
            })
          : null}
      </div>
      <div>
        <button onClick={() => selectionSort(randomStringsArray)}>
          Selection Sort
        </button>
        {sSortList}
      </div>
    </div>
  );
}

export default App;
