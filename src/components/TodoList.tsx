/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Component, For, JSXElement, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { ITodo } from '../interfaces/models';

const TodoList: Component = () => {
  // Get a ref to the input element.
  let inputEl: HTMLInputElement;

  // Create the todos with initial data.
  const [todos, setTodos] = createStore<ITodo[]>([]);

  /**
   * Handle when a user inputs into the text field.
   *
   * @param {string} title Title provided by user.
   * @returns {void}
   * @author Brian Kariuki <bkariuki@hotmail.com>
   */
  const handleNewTodo = (title: string): void => {
    // Skip if no input (empty string) was provided.
    if (!title) return;

    // Add the TODO via the setter.
    setTodos([
      ...todos,
      ...[
        {
          id: todos.length + 1,
          title,
          completed_at: null,
        },
      ],
    ]);
  };

  /**
   * When a use clicks on a TODO, mark it as completed.
   *
   * @param {number} id ID of TODO item
   * @returns {void}
   * @author Brian Kariuki <bkariuki@hotmail.com>
   */
  const handleCompletedTodo = (id: number): void => {
    setTodos(
      (todo) => todo.id === id,
      'completed_at',
      () => new Date()
    );
  };

  /**
   * Function to format Date object into human-readable strings.
   *
   * @param {Date} date Date object to format
   * @returns {string} Formatted date
   * @author Brian Kariuki <bkariuki@hotmail.com>
   */
  const formatDate = (date: Date): string =>
    new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'full',
      timeStyle: 'long',
    }).format(date);

  /**
   * Fallback JSX for TODOs that are not completed yet.
   *
   * @returns {JSXElement} JSX Element
   * @author Brian Kariuki <bkariuki@hotmail.com>
   */
  const fallbackCompletedAt = (): JSXElement => (
    <span class="text-sm text-gray-400">Incomplete</span>
  );

  // Return JSX template.
  return (
    <div>
      <input
        ref={inputEl!}
        type="text"
        name="title"
        id="title"
        placeholder="New todo"
        class="bg-slate-100 rounded-md mb-3 px-5 py-2"
        autofocus
        onInput={() => handleNewTodo(inputEl.value.trim())}
      />

      <div>
        <For each={todos}>
          {(todo) => (
            <div
              class="cursor-pointer"
              onClick={() => handleCompletedTodo(todo.id)}
            >
              <h3 class="text-2xl text-gray-700 font-bold font-mono">
                {todo.title}
              </h3>
              <Show when={todo.completed_at} fallback={fallbackCompletedAt}>
                <p class="text-sm text-gray-400">
                  {formatDate(todo.completed_at!)}
                </p>
              </Show>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default TodoList;
