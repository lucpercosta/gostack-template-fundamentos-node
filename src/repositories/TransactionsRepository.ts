import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeValue = this.transactions
      .filter(incomes => incomes.type === 'income')
      .map(amount => amount.value)
      .reduce((prev, curr) => prev + curr, 0);

    const outcomeValue = this.transactions
      .filter(incomes => incomes.type === 'outcome')
      .map(amount => amount.value)
      .reduce((prev, curr) => prev + curr, 0);

    const balance = {
      income: incomeValue,
      outcome: outcomeValue,
      total: incomeValue - outcomeValue,
    };

    return balance;
  }

  public create(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
