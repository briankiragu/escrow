export interface ITodo {
  id: number;
  title: string;
  description?: string;
  completed_at: null | Date;
  due_at?: null | Date;
}

export interface ITransaction {
  id: string;
  amount: number;
  currency: string;
  created_at: string;
  updated_at: string | null;
}

export interface IFund {
  id: string;
  user_id: string;
  type: 'individual' | 'collaborative';
  name: string;
  description: string | null;
  transactions: ITransaction[];
  created_at: string;
  updated_at: string | null;
}
