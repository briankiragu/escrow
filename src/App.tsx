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
      created_at: '21-07-2022: 11:31:00',
      updated_at: '21-07-2022: 11:31:00',
      transactions: [
        {
          id: '1',
          amount: 1000,
          currency: 'KES',
          created_at: '21-07-2022: 11:31:00',
          updated_at: null,
        },
      ],
    },
  ]);

  return (
    <div class="p-6">
      {/* Introductory text */}
      <h1 class="mb-6 text-teal-800 text-7xl font-extrabold">At a glance</h1>

      {/* Totals Section */}
      <section class="flex gap-4 flex-col">
        <CardTotalIncoming amount={totalIncoming()} />
        <CardTotalOutgoing amount={totalOutgoing()} />
      </section>

      {/* Projects Section */}
      <section class="p-5">
        <For each={funds}>{(fund) => <FundCard fund={fund} />}</For>
      </section>
    </div>
  );
};

export default App;
