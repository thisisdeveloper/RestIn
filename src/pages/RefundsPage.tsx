import React from 'react';
import { ArrowLeft, RefreshCcw, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Refund {
  id: string;
  orderId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

const mockRefunds: Refund[] = [
  {
    id: 'ref1',
    orderId: 'order123',
    amount: 25.99,
    reason: 'Wrong order received',
    status: 'approved',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-16'),
    items: [
      { name: 'Chicken Burger', quantity: 1, price: 15.99 },
      { name: 'Fries', quantity: 1, price: 10.00 }
    ]
  },
  {
    id: 'ref2',
    orderId: 'order456',
    amount: 35.50,
    reason: 'Quality issues',
    status: 'pending',
    createdAt: new Date('2024-02-18'),
    updatedAt: new Date('2024-02-18'),
    items: [
      { name: 'Pizza Margherita', quantity: 1, price: 35.50 }
    ]
  },
  {
    id: 'ref3',
    orderId: 'order789',
    amount: 12.99,
    reason: 'Item not available',
    status: 'rejected',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-11'),
    items: [
      { name: 'Chocolate Cake', quantity: 1, price: 12.99 }
    ]
  }
];

const RefundsPage: React.FC = () => {
  const navigate = useNavigate();

  const getStatusConfig = (status: Refund['status']) => {
    switch (status) {
      case 'approved':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          text: 'Approved',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700'
        };
      case 'rejected':
        return {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          text: 'Rejected',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700'
        };
      default:
        return {
          icon: <Clock className="w-5 h-5 text-yellow-500" />,
          text: 'Pending',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700'
        };
    }
  };

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
            <h1 className="text-xl font-bold ml-2">Refund Status</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {mockRefunds.length === 0 ? (
          <div className="text-center py-12">
            <RefreshCcw className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No refund requests found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {mockRefunds.map(refund => {
              const statusConfig = getStatusConfig(refund.status);
              
              return (
                <div 
                  key={refund.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        Order #{refund.orderId}
                      </span>
                      <div className={`flex items-center px-2 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                        {statusConfig.icon}
                        <span className="text-sm ml-1">{statusConfig.text}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Refund Amount</span>
                      <span className="font-bold text-lg">${refund.amount.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Reason</h3>
                      <p className="text-gray-600">{refund.reason}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Items</h3>
                      <div className="space-y-2">
                        {refund.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.quantity}x {item.name}
                            </span>
                            <span className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      <div>Requested on {refund.createdAt.toLocaleDateString()}</div>
                      {refund.status !== 'pending' && (
                        <div>Updated on {refund.updatedAt.toLocaleDateString()}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundsPage;