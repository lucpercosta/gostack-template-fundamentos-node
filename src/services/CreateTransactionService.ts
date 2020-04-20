import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    if (type === 'income' || type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (value > balance.total && type === 'outcome') {
        throw Error(
          'Error The withdrawal amount is greater than the account balance',
        );
      } else {
        const transaction = this.transactionsRepository.create(
          title,
          value,
          type,
        );

        return transaction;
      }
    }
    throw Error('Error type need income or outcome');
  }
}

export default CreateTransactionService;
