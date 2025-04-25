import React, { useState } from 'react';
import { ArrowLeft, Plus, CreditCard, Wallet, History, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: Date;
}

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  brand: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 't1',
    type: 'credit',
    amount: 50.00,
    description: 'Added money to wallet',
    date: new Date('2024-02-20')
  },
  {
    id: 't2',
    type: 'debit',
    amount: 25.50,
    description: 'Order #1234',
    date: new Date('2024-02-19')
  },
  {
    id: 't3',
    type: 'credit',
    amount: 100.00,
    description: 'Refund for Order #1230',
    date: new Date('2024-02-18')
  }
];

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'card1',
    type: 'card',
    last4: '4242',
    expiryMonth: '12',
    expiryYear: '25',
    brand: 'Visa'
  },
  {
    id: 'card2',
    type: 'card',
    last4: '1234',
    expiryMonth: '08',
    expiryYear: '26',
    brand: 'Mastercard'
  }
];

const WalletPage: React.FC = () => {
  const navigate = useNavigate();
  const [balance] = useState(124.50);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState('');

  const handleAddMoney = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle adding money logic here
    setShowAddMoney(false);
    setAmount('');
  };

  const quickAmounts = [50, 100, 200, 500];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/account')}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold ml-2">Wallet</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Balance Card */}
        <div className="bg-indigo-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Wallet className="w-6 h-6 mr-2" />
              <span className="text-sm opacity-90">Available Balance</span>
            </div>
            <button
              onClick={() => setShowAddMoney(true)}
              className="flex items-center bg-white/20 px-3 py-1.5 rounded-full text-sm hover:bg-white/30 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Money
            </button>
          </div>
          <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
        </div>

        {/* Add Money Modal */}
        {showAddMoney && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-md p-6 animate-fade-in">
              <h2 className="text-xl font-bold mb-4">Add Money to Wallet</h2>
              
              <form onSubmit={handleAddMoney}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="0.00"
                      min="1"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Add
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmount(amt.toString())}
                        className="px-3 py-2 border rounded-md text-sm hover:bg-gray-50"
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddMoney(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Add Money
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Payment Methods</h2>
              <button className="text-indigo-600 text-sm font-medium">
                Add New
              </button>
            </div>
          </div>
          <div className="divide-y">
            {mockPaymentMethods.map((method) => (
              <div key={method.id} className="p-4 flex items-center">
                <CreditCard className="w-6 h-6 text-gray-400 mr-3" />
                <div className="flex-1">
                  <p className="font-medium">{method.brand} •••• {method.last4}</p>
                  <p className="text-sm text-gray-500">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Transaction History</h2>
              <button className="text-indigo-600 text-sm font-medium">
                See All
              </button>
            </div>
          </div>
          <div className="divide-y">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <History className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="font-medium">{transaction.description}</span>
                  </div>
                  <span className={`font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}
                    ${transaction.amount.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 ml-7">
                  {transaction.date.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;