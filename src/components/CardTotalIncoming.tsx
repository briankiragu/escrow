/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Component } from 'solid-js';
import useFormatting from '@/composables/useFormatting';

const CardTotalIncoming: Component<{ amount: number }> = (props) => {
  // Get formatting methods.
  const { toRegionalCurrency } = useFormatting();

  return (
    <div class="transition-shadow shadow-md rounded-md bg-blue-500 p-5 hover:shadow-lg">
      <p class="text-blue-100 font-medium">Total Incoming</p>
      <h3 class="text-blue-50 text-4xl font-extrabold">
        {toRegionalCurrency(props.amount)}
      </h3>
    </div>
  );
};

export default CardTotalIncoming;
