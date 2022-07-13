export interface ITodo {
  id: number;
  title: string;
  description?: string;
  completed_at: null | Date;
  due_at?: null | Date;
}
