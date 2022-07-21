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
    <div class="flex justify-between items-end">
      <span class="text-slate-500 text-sm font-medium">
        {toHumanDate(new Date(props.transaction.created_at))}
      </span>
      <span class="text-xl text-slate-500 font-bold">
        {toRegionalCurrency(props.transaction.amount)}
      </span>
    </div>
  );
};

export default FundCardTransaction;
