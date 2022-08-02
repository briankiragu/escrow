/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Component } from 'solid-js';
import { ITransaction } from '@/interfaces/models';
import useFormatting from '@/composables/useFormatting';

const FundCardTransaction: Component<{ transaction: ITransaction }> = (
  props
) => {
  // We need to format the amounts according to the currency and region.
  const { toRegionalCurrency, toHumanDate } = useFormatting();

  return (
    <div class="mb-3 grid grid-cols-4 gap-4 items-end">
      <span class="col-span-2 text-slate-500 text-sm font-medium">
        {toHumanDate(new Date(props.transaction.created_at))}
      </span>
      <span class="col-span-2 text-right text-slate-500 font-semibold font-mono break-words">
        {toRegionalCurrency(props.transaction.amount)}
      </span>
    </div>
  );
};

export default FundCardTransaction;
