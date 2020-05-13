import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private income: number;

  private outcome: number;

  private total: number;

  constructor() {
    this.transactions = [];

    this.income = 0;
    this.outcome = 0;
    this.total = 0;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    this.income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0,
      );
    this.outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0,
      );
    this.total = this.income - this.outcome;

    return {
      income: Number(this.income.toFixed(2)),
      outcome: Number(this.outcome.toFixed(2)),
      total: Number(this.total.toFixed(2)),
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
