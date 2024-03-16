import { useState } from "react";

function StateComponent() {
  let [count, setCount] = useState(0);

  function incrementCount() {
    setCount(count + 1);
  }

  return (
    <>
      <button onClick={incrementCount}>Count: {count}</button>
    </>
  );
}

export default StateComponent;
