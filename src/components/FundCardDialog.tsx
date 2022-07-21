/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Component, createMemo, For, lazy, Show } from 'solid-js';
import useFormatting from '@/composables/useFormatting';
import { IFund } from '@/interfaces/models';

// Lazy load the dialog component.
const FundCardTransaction = lazy(
  () => import('@/components/FundCardTransaction')
);

const FundCardDialog: Component<{
  fund: IFund;
  handleCloseDialog: Function;
}> = (props) => {
  // We need to format the amounts according to the currency and region.
  const { toRegionalCurrency } = useFormatting();

  /**
   * Add all the transactions to a total. Memoize it to avoid re-computing.
   *
   * @returns {number} Tota value of all transactions.
   * @author Brian Kariuki <bkariuki@hotmail.com>
   */
  const currentTotal = createMemo(() =>
    props.fund.transactions.reduce((acc, trans) => acc + trans.amount, 0)
  );

  /**
   * If there exists an expected total, calculate the balance
   * after subtracting the current total.
   *
   * @returns {number} The balance of the expected total against the current total.
   * @author Brian Kariuki <bkariuki@hotmail.com>
   */
  const balance = (): number | null =>
    props.fund.expected_total !== null
      ? props.fund.expected_total - currentTotal()
      : null;

  return (
    <div class="relative">
      {/* Close button */}
      <button
        class="transition-colors absolute top-3 right-3 w-10 h-10 rounded-full bg-teal-300 text-teal-700 text-xl font-bold hover:bg-teal-400"
        onClick={() => props.handleCloseDialog('close')}
      >
        X
      </button>

      {/* Basic information */}
      <div class="mb-4 p-6 bg-teal-200 flex flex-col">
        <h4 class="text-teal-700 text-3xl font-semibold">{props.fund.name}</h4>
        <span class="text-teal-500 text-xl font-semibold capitalize">
          {props.fund.type}
        </span>
        <span class="text-slate-800 text-sm">Outgoing</span>
      </div>

      {/* Fiscal information */}
      <div class="mb-4 px-6 flex flex-col text-slate-600">
        {/* Expected total (if was provided during project creation) */}
        <Show when={props.fund.expected_total !== null}>
          <div class="mb-1 flex justify-between items-end tracking-tight">
            <h5 class="font-medium">Expected Total:</h5>
            <span class="text-xl font-bold">
              {toRegionalCurrency(props.fund.expected_total!)}
            </span>
          </div>
        </Show>

        {/* Current total */}
        <div class="flex justify-between items-end tracking-tight">
          <h5 class="font-medium">Current Total:</h5>
          <span class="text-xl font-bold">
            {toRegionalCurrency(currentTotal())}
          </span>
        </div>

        {/* Balance */}
        <Show when={props.fund.expected_total !== null}>
          <div class="flex justify-between items-end tracking-tight">
            <h5 class="font-medium">Balance:</h5>
            <span class="text-xl font-bold">
              {toRegionalCurrency(balance()!)}
            </span>
          </div>
        </Show>
      </div>

      {/* Transaction ledger */}
      <div class="p-6 flex flex-col">
        <h6 class="mb-2 text-teal-500 text-xl font-medium">Transactions</h6>

        {/* List of transactions */}
        <For each={props.fund.transactions}>
          {(transaction) => <FundCardTransaction transaction={transaction} />}
        </For>
      </div>
    </div>
  );
};

export default FundCardDialog;
