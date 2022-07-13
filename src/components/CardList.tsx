/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Component, For, lazy, onMount, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { ITodo } from '../interfaces/models';

const Card = lazy(() => import('./Card'));

const CardList: Component = () => {
  // Create a reference to the draggable area for completed tasks.
  let completedEl: HTMLDivElement;

  // Pre-fill the todos with fake data.
  const [todos, setTodos] = createStore<ITodo[]>([
    { id: 1, title: 'Todo 1', completed_at: new Date() },
    { id: 2, title: 'Todo 2', completed_at: null },
    { id: 3, title: 'Todo 3', completed_at: null },
  ]);

  // Attach an event listener to when the draggable area experiences drag events.
  onMount(() => {
    // When a draggable element enters over it, darken the borders to indicate it's droppable.
    completedEl.addEventListener('dragenter', () => {
      completedEl.classList.replace('border-slate-300', 'border-slate-500');
    });

    // When a draggable element leaves over it, lighten the borders to indicate it's not droppable.
    completedEl.addEventListener('dragleave', () => {
      completedEl.classList.replace('border-slate-500', 'border-slate-300');
    });

    // When a draggable element is over it...
    completedEl.addEventListener('dragover', (e: DragEvent) => {
      e.preventDefault();
      return false;
    });

    // When a draggable element is dropped.
    completedEl.addEventListener('drop', (e) => {
      // Stop any weird default behviours by the browser like redirecting.
      e.stopPropagation();

      // Get the ID of the TODO from the dragstart event.
      const id = e.dataTransfer?.getData('text/plain');

      // Ensure an ID was present.
      if (id === undefined) {
        return false;
      }

      // Mark it as completed.
      setTodos(
        (todo) => todo.id === parseInt(id, 10),
        'completed_at',
        () => new Date()
      );

      // Just a best practice when dropping elements.
      return false;
    });
  });

  return (
    <div>
      {/* Incomplete TODOs */}
      <div class="mb-10 px-3">
        <For each={todos}>
          {(todo) => (
            <Show when={todo.completed_at === null}>
              <Card todo={todo} />
            </Show>
          )}
        </For>
      </div>

      {/* Completed TODOs */}
      <div
        ref={completedEl!}
        class="transition-colors min-h-[150px] border-2 border-dashed border-slate-300 hover:border-slate-500 rounded-lg bg-slate-100 p-3 flex flex-col justify-end items-start"
      >
        <For each={todos}>
          {(todo) => (
            <Show when={todo.completed_at !== null}>
              <Card todo={todo} />
            </Show>
          )}
        </For>
        <h5 class="text-gray-400 font-medium">Drag compeleted tasks here.</h5>
      </div>
    </div>
  );
};

export default CardList;
