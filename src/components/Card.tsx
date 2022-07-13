/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Component, onMount, Show } from 'solid-js';
import { ITodo } from '../interfaces/models';

const Card: Component<{ todo: ITodo }> = (props) => {
  // Get a reference to the HTML element.
  let cardEl: HTMLDivElement;

  // Whenever a TODO is marked as completed,
  // display the date in a human-readable format.
  const formattedDate = () =>
    props.todo.completed_at
      ? new Intl.DateTimeFormat('en-GB', {
          dateStyle: 'full',
          timeStyle: 'long',
        }).format(props.todo.completed_at)
      : '';

  // Add an event listener for the drag-and-drop events on the card.
  onMount(() => {
    // When a user starts dragging the card...
    cardEl.addEventListener('dragstart', (e: DragEvent) => {
      // e.dataTransfer?.effectAllowed = 'move';
      e.dataTransfer?.setData('text/plain', props.todo.id.toString());
    });
  });

  return (
    <div
      ref={cardEl!}
      draggable={true}
      class="w-full h-28 rounded-lg bg-indigo-500 mb-3 px-6 py-4 cursor-move"
    >
      <h3 class="mb-1 text-3xl text-gray-50 font-bold">{props.todo.title}</h3>
      <Show when={props.todo.completed_at !== null}>
        <span class="text-sm text-gray-300 font-medium leading-tight">
          {formattedDate()}
        </span>
      </Show>
    </div>
  );
};

export default Card;
