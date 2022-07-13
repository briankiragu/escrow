import { Component, createSignal } from "solid-js";

const Counter: Component = () => {
  const [count, setCount] = createSignal(0);

  const add = () => {
    setCount(c => c + 1);
  }

  const remove = () => {
    setCount(c => c - 1);
  }

  return (
    <div class="flex flex-col">
      <button
        onClick={add}
        class="bg-slate-200 rounded-md mb-2 p-3 text-slate-700 font-semibold">
        Add
      </button>

      <button
        onClick={remove}
        class="bg-slate-200 rounded-md mb-2 p-3 text-slate-700 font-semibold">
        Remove
      </button>

      <p class="text-slate-500 font-semibold">Count is: {count()}</p>
    </div>
  )
}

export default Counter;