import { Component, JSXElement, lazy } from 'solid-js';
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

  // When a card is clicked, mark is an either complete or incomplete.
  const handleToggleCompletion = (id: number) => {
    setTodos(
      (todo) => todo.id === id,
      'completed_at',
      (value) => (value ? null : new Date())
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

      <CardList todos={todos} handleToggleCompletion={handleToggleCompletion} />
    </div>
  );
};

export default TodoList;
