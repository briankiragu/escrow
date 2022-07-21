import { Component, lazy } from 'solid-js';

// Lazy load the components.
const TodoList = lazy(() => import('./components/TodoList'));

const App: Component = () => (
  <div>
    <section class="p-5">
      <TodoList />
    </section>
  </div>
);

export default App;
