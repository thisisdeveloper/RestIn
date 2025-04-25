import React from 'react';
import { ArrowLeft, Tag, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Discount {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  expiryDate: Date;
  minOrder?: number;
  maxDiscount?: number;
  used: boolean;
}

const mockDiscounts: Discount[] = [
  {
    id: 'd1',
    code: 'WELCOME20',
    description: 'Get 20% off on your first order',
    discountType: 'percentage',
    value: 20,
    expiryDate: new Date('2024-03-31'),
    minOrder: 30,
    maxDiscount: 100,
    used: false
  },
  {
    id: 'd2',
    code: 'FLAT50',
    description: 'Flat $50 off on orders above $200',
    discountType: 'fixed',
    value: 50,
    expiryDate: new Date('2024-03-15'),
    minOrder: 200,
    used: false
  },
  {
    id: 'd3',
    code: 'SPECIAL25',
    description: '25% off on special menu items',
    discountType: 'percentage',
    value: 25,
    expiryDate: new Date('2024-03-20'),
    maxDiscount: 75,
    used: false
  }
];

const DiscountsPage: React.FC = () => {
  const navigate = useNavigate();

  const isExpired = (date: Date) => {
    return new Date() > date;
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
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
            <h1 className="text-xl font-bold ml-2">Discounts</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Active Discounts */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Active Discounts</h2>
          <div className="space-y-4">
            {mockDiscounts
              .filter(discount => !discount.used && !isExpired(discount.expiryDate))
              .map(discount => (
                <div 
                  key={discount.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Tag className="w-5 h-5 text-indigo-600 mr-2" />
                        <span className="font-semibold">{discount.description}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>
                          Expires {discount.expiryDate.toLocaleDateString()}
                        </span>
                      </div>
                      {(discount.minOrder || discount.maxDiscount) && (
                        <div className="text-sm text-gray-600 space-y-1">
                          {discount.minOrder && (
                            <p>Min. order: ${discount.minOrder}</p>
                          )}
                          {discount.maxDiscount && (
                            <p>Max. discount: ${discount.maxDiscount}</p>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => copyToClipboard(discount.code)}
                      className="flex items-center bg-indigo-50 px-3 py-1.5 rounded text-indigo-600 font-medium hover:bg-indigo-100 transition-colors"
                    >
                      {discount.code}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Used Discounts */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Used Discounts</h2>
          <div className="space-y-4">
            {mockDiscounts
              .filter(discount => discount.used)
              .map(discount => (
                <div 
                  key={discount.id}
                  className="bg-gray-50 rounded-xl p-4 opacity-75"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <Tag className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="font-medium text-gray-600">
                          {discount.description}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">Used on {new Date().toLocaleDateString()}</div>
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {discount.code}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Expired Discounts */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Expired Discounts</h2>
          <div className="space-y-4">
            {mockDiscounts
              .filter(discount => !discount.used && isExpired(discount.expiryDate))
              .map(discount => (
                <div 
                  key={discount.id}
                  className="bg-gray-50 rounded-xl p-4 opacity-75"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <Tag className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="font-medium text-gray-600">
                          {discount.description}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Expired on {discount.expiryDate.toLocaleDateString()}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {discount.code}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountsPage;