/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Component, onMount, Show } from 'solid-js';
import useFormatting from '@/composables/useFormatting';
import { ITodo } from '@/interfaces/models';

const Card: Component<{ todo: ITodo; handleToggle: Function }> = (props) => {
  // Formatting methods.
  const { toHumanDate } = useFormatting();

  // Get a reference to the HTML element.
  let cardEl: HTMLDivElement;

  // Whenever a TODO is marked as completed,
  // display the date in a human-readable format.
  const formattedDate = () =>
    props.todo.completed_at ? toHumanDate(props.todo.completed_at) : '';

  // We want to ensure that the cardEL is mounted
  // before we add event listeners to it.
  onMount(() => {
    // When a user starts dragging the card...
    cardEl.addEventListener('dragstart', (e: DragEvent) => {
      // Pass the ID of the TODO to the drag event so that it can be accessed
      // from wherever(CardList component) the drop event is handled.
      e.dataTransfer?.setData('text/plain', props.todo.id.toString());
    });
  });

  return (
    <div
      ref={cardEl!}
      draggable={true}
      class="w-full min-h-[120px] rounded-lg bg-indigo-500 mb-3 px-6 py-4 cursor-move"
      onClick={() => props.handleToggle(props.todo.id)}
    >
      <h3 class="text-4xl text-gray-50 font-bold">{props.todo.title}</h3>
      <Show when={props.todo.completed_at !== null}>
        <span class="text-sm text-gray-300 font-medium">{formattedDate()}</span>
      </Show>
    </div>
  );
};

export default Card;
