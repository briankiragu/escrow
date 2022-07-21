/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Component, createSignal, For, lazy } from 'solid-js';
import { createStore } from 'solid-js/store';
import { IFund } from '@/interfaces/models';

// Lazy load the components.
const CardTotalIncoming = lazy(() => import('@/components/CardTotalIncoming'));
const CardTotalOutgoing = lazy(() => import('@/components/CardTotalOutgoing'));
const FundCard = lazy(() => import('@/components/FundCard'));

const App: Component = () => {
  // Create fake incoming and outgoing data.
  const [totalIncoming] = createSignal(4000);
  const [totalOutgoing] = createSignal(2000);

  // Create fake transactions.
  const [funds] = createStore<IFund[]>([
    {
      id: '1',
      user_id: '1',
      type: 'individual',
      name: 'House Deposit',
      description: null,
      created_at: '2022-07-20T11:31:00.000Z',
      updated_at: '2022-07-21T11:31:00.000Z',
      expected_total: 4000,
      transactions: [
        {
          id: '1',
          amount: 2000,
          currency: 'KES',
          created_at: '2022-07-20T11:31:00.000Z',
          updated_at: null,
        },
        {
          id: '2',
          amount: 1000,
          currency: 'KES',
          created_at: '2022-07-21T11:31:00.000Z',
          updated_at: null,
        },
      ],
    },
    {
      id: '2',
      user_id: '2',
      type: 'collaborative',
      name: 'Birthday Plan',
      description: null,
      created_at: '2022-07-20T11:31:00.000Z',
      updated_at: '2022-07-21T11:31:00.000Z',
      expected_total: null,
      transactions: [
        {
          id: '3',
          amount: 2000,
          currency: 'KES',
          created_at: '2022-07-20T11:31:00.000Z',
          updated_at: null,
        },
        {
          id: '4',
          amount: 1000,
          currency: 'KES',
          created_at: '2022-07-21T11:31:00.000Z',
          updated_at: null,
        },
      ],
    },
  ]);

  return (
    <div class="min-h-screen p-6 bg-[whitesmoke]">
      {/* Totals Section */}
      <section class="h-[410px] mb-6 flex gap-4 flex-col">
        {/* Introductory text */}
        <h1 class="mb-4 text-teal-800 text-7xl font-extrabold">At a glance</h1>

        <CardTotalIncoming amount={totalIncoming()} />
        <CardTotalOutgoing amount={totalOutgoing()} />
      </section>

      {/* Projects Section */}
      <section>
        {/* Introductory text */}
        <h2 class="mb-3 text-teal-700 text-3xl font-bold">Your funds</h2>

        <div class="flex flex-col gap-4">
          {/* Fund cards */}
          <For each={funds}>{(fund) => <FundCard fund={fund} />}</For>
        </div>
      </section>
    </div>
  );
};

export default App;
