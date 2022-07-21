import { Component, lazy } from 'solid-js';
import { createStore } from 'solid-js/store';
import { ITodo } from '@/interfaces/models';

// Lazy load the components.
const CardList = lazy(() => import('@/components/CardList'));

const TodoList: Component = () => {
  // Get a ref to the input element.
  let inputEl: HTMLInputElement;

  // Create the todos with initial data.
  const [todos, setTodos] = createStore<ITodo[]>([
    { id: 1, title: 'Todo 1', completed_at: new Date() },
    { id: 2, title: 'Todo 2', completed_at: null },
    { id: 3, title: 'Todo 3', completed_at: null },
  ]);

  /**
   * Handle when a user inputs into the text field.
   *
   * @param {HTMLInputElement} input User input element.
   * @returns {void}
   * @author Brian Kariuki <bkariuki@hotmail.com>
   */
  const handleNewTodo = (input: HTMLInputElement): void => {
    // Skip if no input (empty string) was provided.
    if (!input.value.trim()) return;

    // Add the TODO via the setter.
    setTodos([
      ...todos,
      ...[
        {
          id: todos.length + 1,
          title: input.value.trim(),
          completed_at: null,
        },
      ],
    ]);

    // Clear the input field.
    input.value = '';
  };

  /**
   * When a card is clicked, mark is an either complete or incomplete.
   *
   * @param {number} id ID of the todo to toggle.
   *
   * @returns {void}
   * @author Brian Kariuki <bkariuki@hotmail.com>
   */
  const handleToggleCompletion = (id: number): void => {
    setTodos(
      (todo) => todo.id === id,
      'completed_at',
      (value) => (value ? null : new Date())
    );
  };

  // Return JSX template.
  return (
    <>
      <div class="mb-6 flex justify-between gap-6">
        {/* Input */}
        <input
          ref={inputEl!}
          type="text"
          id="title"
          name="title"
          placeholder="New todo"
          class="w-full h-12 shadow bg-slate-100 rounded px-4 text-slate-500 focus:outline-none"
          autofocus
        />

        {/* Submit button */}
        <button
          class="h-12 shadow rounded bg-blue-200 px-6 text-slate-600 font-semibold"
          onClick={() => handleNewTodo(inputEl!)}
        >
          New
        </button>
      </div>

      <CardList todos={todos} handleToggleCompletion={handleToggleCompletion} />
    </>
  );
};

export default TodoList;
