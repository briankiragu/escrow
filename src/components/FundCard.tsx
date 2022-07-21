/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Component } from 'solid-js';
import { IFund } from '@/interfaces/models';

const FundCard: Component<{ fund: IFund }> = (props) => (
  <div class="bg-green-500">{props.fund.name}</div>
);

export default FundCard;
