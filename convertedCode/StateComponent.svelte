<script>
  let count = 0;

  function incrementCount() {
    count = count + 1;
  }

  </script>
    <div>
      <button on:click={incrementCount}>Count: {count}</button>
    </div>
  