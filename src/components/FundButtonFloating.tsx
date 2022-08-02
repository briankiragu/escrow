import { Component } from 'solid-js';

const FundButtonFloating: Component = () => (
  <button class="z-40 transition fixed bottom-4 right-4 w-14 h-14 rounded-full bg-rose-500 flex justify-center items-center text-rose-50 text-4xl font-bold hover:bg-rose-200 hover:text-gray-700">
    <span class="absolute top-1.5">+</span>
  </button>
);

export default FundButtonFloating;
