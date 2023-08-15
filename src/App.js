import React, { useState } from "react";
import "./App.css";
import afterFrame from "afterframe";

function App() {
  const [showArr, setShowArr] = useState([]);

  const generateRandomString = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
  };

  const generateArray = () => {
    const randomStringsArray = Array.from({ length: 1000 }, () =>
      generateRandomString(Math.round(Math.random() * 4) + 1)
    );
    setShowArr(randomStringsArray);
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

  const selectionSort = (randomStringsArray) => {
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
    return randomStringsArray;
  };

  const insertionSort = (array) => {
    const interaction = measureInteraction();
    afterFrame(() => {
      interaction.end();
    });
    let pos, x;
    for (let i = 1; i < array.length; i++) {
      pos = i - 1;
      x = array[i];
      while (pos >= 0 && array[pos] > x) {
        array[pos + 1] = array[pos];
        pos--;
      }
      array[pos + 1] = x;
    }
    return array;
  };

  const binaryInsertionSort = (array) => {
    const interaction = measureInteraction();
    afterFrame(() => {
      interaction.end();
    });
    let l, r, m, x;
    for (let i = 1; i < array.length; i++) {
      l = 0;
      r = i - 1;
      x = array[i];

      while (l <= r) {
        m = Math.floor((l + r) / 2);
        if (array[m] > x) r = m - 1;
        else l = m + 1;
      }

      for (let j = i; j > l; j--) array[j] = array[j - 1];
      array[l] = x;
    }
    return array;
  };

  const interChangeSort = (array) => {
    const interaction = measureInteraction();
    afterFrame(() => {
      interaction.end();
    });
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[i]) {
          let t = array[i];
          array[i] = array[j];
          array[j] = t;
        }
      }
    }
    return array;
  };

  const bubbleSort = (array) => {
    const interaction = measureInteraction();
    afterFrame(() => {
      interaction.end();
    });
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = array.length - 1; j > i; j--) {
        if (array[j] < array[j - 1]) {
          let t = array[j];
          array[j] = array[j - 1];
          array[j - 1] = t;
        }
      }
    }
    return array;
  };

  const handleSort = (sortFunction) => {
    const sortedArray = sortFunction(showArr);
    setShowArr([...sortedArray]);
  };

  return (
    <div className="App">
      <div className="showkey">
        <button onClick={() => generateArray()}>Create Array</button>
        <button onClick={() => handleSort(selectionSort)}>
          Selection Sort
        </button>
        <button onClick={() => handleSort(insertionSort)}>
          Insertion Sort
        </button>
        <button onClick={() => handleSort(binaryInsertionSort)}>
          Binary Insertion Sort
        </button>
        <button onClick={() => handleSort(interChangeSort)}>
          Inter Change Sort
        </button>
        <button onClick={() => handleSort(bubbleSort)}>Bubble Sort</button>
      </div>
      {showArr.map((item) => {
        return <div className="item">{item}</div>;
      })}
    </div>
  );
}

export default App;
