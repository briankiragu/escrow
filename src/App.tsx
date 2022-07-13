import { Component, lazy } from 'solid-js';

// Lazy load the components.
const CardList = lazy(() => import('./components/CardList'));

const App: Component = () => (
  <div>
    <section class="p-5">
      <CardList />
    </section>
  </div>
);

export default App;
