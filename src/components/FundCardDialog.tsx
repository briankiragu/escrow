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

  // Get a reference to the phone number and amount inputs on the dialog.
  let inputPhoneEl: HTMLInputElement;
  let inputAmountEl: HTMLInputElement;

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

  const handleFundDeposit = (): void => {
    // Get the value of the input.
    const phone = parseFloat(inputPhoneEl.value);
    const amount = parseFloat(inputAmountEl.value);

    console.dir({ phone, amount });

    // Clear the input.
    inputPhoneEl.value = '';
    inputAmountEl.value = '';
  };

  return (
    <div class="relative">
      {/* Close button */}
      <button
        class="transition-colors absolute top-4 right-4 w-10 h-10 rounded-full bg-teal-300 text-teal-700 text-xl font-bold hover:bg-teal-400"
        onClick={() => props.handleCloseDialog('close')}
      >
        X
      </button>

      {/* Basic information */}
      <div class="p-6 bg-teal-200 flex flex-col">
        <h4 class="text-teal-700 text-3xl font-semibold">{props.fund.name}</h4>
        <span class="text-teal-500 text-xl font-semibold capitalize">
          {props.fund.type}
        </span>
        <span class="text-slate-800 text-sm">Outgoing</span>
      </div>

      {/* Fiscal information */}
      <div class="overflow-y-scroll max-h-[50vh] p-6 flex flex-col text-slate-600">
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

        <h6 class="mt-6 mb-1 text-teal-500 text-xl font-medium">
          Transactions
        </h6>

        {/* Transaction ledger */}
        <div class="flex flex-col">
          {/* List of transactions */}
          <For each={props.fund.transactions}>
            {(transaction) => <FundCardTransaction transaction={transaction} />}
          </For>
        </div>
      </div>

      {/* Dialog actions */}
      <form method="dialog" class="bg-teal-100">
        {/* Amount to deposit. */}
        <article class="px-6 py-4 grid grid-cols-1 gap-4">
          {/* Phone number */}
          <div class="col-span-1">
            <label for="amount" class="text-sm text-teal-500 tracking-tighter">
              Phone number to receieve payment request
            </label>
            <input
              ref={inputPhoneEl!}
              type="number"
              id="amount"
              name="amount"
              placeholder="254 712 345 678"
              class="mt-1 w-full shadow rounded px-6 py-3 bg-teal-50 focus:outline-teal-300"
              autocomplete="mobile"
            />
          </div>

          {/* Amount to deposit */}
          <div class="col-span-1">
            <label for="amount" class="text-sm text-teal-500 tracking-tighter">
              Amount to deposit into the escrow fund
            </label>
            <input
              ref={inputAmountEl!}
              type="number"
              id="amount"
              name="amount"
              min="50"
              placeholder="Amount to deposit"
              class="mt-1 w-full shadow rounded px-6 py-3 bg-teal-50 focus:outline-teal-300"
            />
          </div>
        </article>

        {/* Submission buttons */}
        <footer class="shadow px-6 py-4">
          <menu class="flex justify-between">
            <button
              autofocus
              type="reset"
              class="px-5 py-2.5 text-slate-500 font-medium"
              onClick={() => props.handleCloseDialog('cancel')}
            >
              Cancel
            </button>
            <button
              type="submit"
              value="confirm"
              class="transition-shadow shadow rounded px-10 py-2.5 bg-teal-500 text-blue-50 font-semibold hover:shadow-lg"
              onClick={handleFundDeposit}
            >
              Deposit
            </button>
          </menu>
        </footer>
      </form>
    </div>
  );
};

export default FundCardDialog;
