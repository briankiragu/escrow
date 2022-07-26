/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Component, createMemo, For, lazy, onMount } from 'solid-js';
import { ITodo } from '@/interfaces/models';

// Import the Card component dynamically.
const Card = lazy(() => import('@/components/Card'));

const CardList: Component<{
  todos: readonly ITodo[];
  handleToggleCompletion: Function;
}> = (props) => {
  // Create a reference to the draggable area for completed tasks.
  let completedEl: HTMLDivElement;

  // Filter only the completed TODOs as a memo since it could be expensive.
  const completed = createMemo(() =>
    props.todos.filter((todo) => todo.completed_at !== null)
  );

  // Filter only the incompleted TODOs as a memo since it could be expensive.
  const incompleted = createMemo(() =>
    props.todos.filter((todo) => todo.completed_at === null)
  );

  // We want to make sure that the completedEl is mounted on the DOM
  // before we add event listeners to it.
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
      props.handleToggleCompletion(parseInt(id, 10));

      // Just a best practice when dropping elements.
      return false;
    });
  });

  return (
    <>
      {/* Incomplete TODOs */}
      <div class="mb-6">
        <For each={incompleted()}>
          {(todo) => (
            <Card todo={todo} handleToggle={props.handleToggleCompletion} />
          )}
        </For>
      </div>

      {/* Completed TODOs */}
      <div
        ref={completedEl!}
        class="transition-colors min-h-[150px] border-2 border-dashed border-slate-300 hover:border-slate-500 rounded-lg bg-slate-100 p-2 flex flex-col justify-end items-start"
      >
        <For each={completed()}>
          {(todo) => (
            <Card todo={todo} handleToggle={props.handleToggleCompletion} />
          )}
        </For>
        <h5 class="text-gray-400 font-medium">Drag compeleted tasks here.</h5>
      </div>
    </>
  );
};

export default CardList;
