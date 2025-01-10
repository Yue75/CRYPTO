import React, { FC } from 'react';

interface Transaction {
  type: string;
  amount: number;
  address?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="transaction-history">
      <h3 className="text-lg font-bold">Historique des transactions</h3>
      <ul className="mt-4 space-y-2">
        {transactions.map((transaction, index) => (
          <li key={index} className="p-2 border rounded">
            {transaction.type === 'deposit'
              ? `Dépôt de ${transaction.amount}`
              : `Retrait de ${transaction.amount} vers ${transaction.address}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
