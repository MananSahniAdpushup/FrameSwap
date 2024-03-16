import { useState } from "react";

function StateComponent() {
  let [count, setCount] = useState(0);
  let [obj, setObj] = useState({ a: 3, b: 4 });

  function incrementCount() {
    setCount(count + 1);
  }

  function updateObj() {
    setObj((obj) => {
      return { ...obj, a: 5 };
    });
  }

  return (
    <>
      <button on:click={incrementCount}>Count: {count}</button>
      <button on:click={updateObj}>UpdatedObject: {obj.a} {obj.b}</button>
    </>
  );
}

export default StateComponent;
